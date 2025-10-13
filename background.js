/**
 * StackScope Background Service Worker (Manifest V3)
 * 
 * This service worker handles:
 * - Extension lifecycle events
 * - Message passing between popup and content scripts
 * - Storage management for detection results
 * 
 * IMPORTANT: Service workers are ephemeral and may be terminated by Chrome
 * at any time. Do not rely on global state persisting between events.
 */

// Service worker installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // First-time installation
    chrome.storage.local.set({
      detectionHistory: [],
      settings: {
        autoDetect: true,
        showConfidence: true,
        enableMutationObserver: true
      }
    });
  }
});

// Service worker startup
chrome.runtime.onStartup.addListener(() => {
  // Service worker activated
});

/**
 * Message handler for communication between popup and content scripts
 * Messages supported:
 * - detectTechnologies: Inject detector and run analysis
 * - getResults: Retrieve cached results for current tab
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'detectTechnologies') {
    handleDetection(message.tabId)
      .then(results => sendResponse({ success: true, data: results }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep channel open for async response
  }
  
  if (message.action === 'getStoredResults') {
    chrome.storage.local.get(['lastDetection'], (data) => {
      sendResponse({ success: true, data: data.lastDetection || null });
    });
    return true;
  }
  
  if (message.action === 'saveResults') {
    saveDetectionResults(message.data)
      .then(() => sendResponse({ success: true }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }
});

/**
 * Main detection handler
 * Injects detector script into active tab and collects results
 */
async function handleDetection(tabId) {
  try {
    // First, inject the fingerprints database
    const fingerprints = await loadFingerprints();
    
    // Inject detector script into the page
    const injectionResults = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['detector.js']
    });
    
    if (!injectionResults || injectionResults.length === 0) {
      throw new Error('Failed to inject detector script');
    }
    
    // Execute detection with fingerprints
    const detectionResults = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: runDetection,
      args: [fingerprints]
    });
    
    if (!detectionResults || detectionResults.length === 0) {
      throw new Error('Detection returned no results');
    }
    
    const results = detectionResults[0].result;
    
    // Store results with timestamp and URL
    const tab = await chrome.tabs.get(tabId);
    const enrichedResults = {
      url: tab.url,
      title: tab.title,
      timestamp: Date.now(),
      technologies: results
    };
    
    await saveDetectionResults(enrichedResults);
    
    return enrichedResults;
    
  } catch (error) {
    console.error('[StackScope] Detection error:', error);
    throw error;
  }
}

/**
 * Load fingerprints from local JSON file
 */
async function loadFingerprints() {
  try {
    const response = await fetch(chrome.runtime.getURL('fingerprints.json'));
    const data = await response.json();
    return data.technologies || [];
  } catch (error) {
    console.error('[StackScope] Failed to load fingerprints:', error);
    return [];
  }
}

/**
 * Function injected into page context to run detection
 * This runs in the page's context and has access to window object
 */
function runDetection(fingerprints) {
  // This function will be called after detector.js is loaded
  if (typeof window.StackScopeDetector !== 'undefined') {
    return window.StackScopeDetector.detect(fingerprints);
  } else {
    throw new Error('Detector not loaded');
  }
}

/**
 * Save detection results to storage
 */
async function saveDetectionResults(results) {
  try {
    // Store last detection
    await chrome.storage.local.set({ lastDetection: results });
    
    // Add to history (keep last 50)
    const { detectionHistory = [] } = await chrome.storage.local.get(['detectionHistory']);
    detectionHistory.unshift({
      url: results.url,
      timestamp: results.timestamp,
      techCount: results.technologies.length
    });
    
    // Limit history size
    if (detectionHistory.length > 50) {
      detectionHistory.splice(50);
    }
    
    await chrome.storage.local.set({ detectionHistory });
  } catch (error) {
    console.error('[StackScope] Failed to save results:', error);
    throw error;
  }
}

/**
 * Handle service worker keep-alive if needed
 * Note: Chrome may terminate service workers after 30 seconds of inactivity
 * This is normal behavior and should be handled gracefully
 */
let keepAliveInterval;

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'keepAlive') {
    if (keepAliveInterval) {
      clearInterval(keepAliveInterval);
    }

    keepAliveInterval = setInterval(() => {
      // Keep-alive ping
    }, 20000); // Ping every 20 seconds

    port.onDisconnect.addListener(() => {
      if (keepAliveInterval) {
        clearInterval(keepAliveInterval);
        keepAliveInterval = null;
      }
    });
  }
});
