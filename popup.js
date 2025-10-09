/**
 * StackScope Popup Script
 * 
 * Handles UI interactions, detection triggering, and results display
 */

(function() {
  'use strict';

  // DOM Elements
  const detectBtn = document.getElementById('detectBtn');
  const retryBtn = document.getElementById('retryBtn');
  const exportJsonBtn = document.getElementById('exportJsonBtn');
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const copyBtn = document.getElementById('copyBtn');
  const sortSelect = document.getElementById('sortSelect');
  const showEvidenceToggle = document.getElementById('showEvidenceToggle');
  const themeToggle = document.getElementById('themeToggle');
  
  const loadingState = document.getElementById('loadingState');
  const errorState = document.getElementById('errorState');
  const emptyState = document.getElementById('emptyState');
  const resultsContainer = document.getElementById('resultsContainer');
  const errorMessage = document.getElementById('errorMessage');
  
  const technologiesList = document.getElementById('technologiesList');
  const techCount = document.getElementById('techCount');
  const pageTitle = document.getElementById('pageTitle');

  // State
  let currentResults = null;
  let currentTabId = null;
  let settings = {
    darkMode: false,
    autoDetect: true,
    defaultSort: 'confidence',
    showEvidence: true,
    confidenceThreshold: 0,
    debugMode: false,
    cacheResults: true
  };

  /**
   * Initialize popup
   */
  async function init() {
    console.log('[StackScope Popup] Initializing...');

    // Load settings first
    await loadSettings();

    // Apply settings to UI elements
    sortSelect.value = settings.defaultSort;
    showEvidenceToggle.checked = settings.showEvidence;

    applyTheme();

    // Get current tab
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs.length > 0) {
      currentTabId = tabs[0].id;
      // Check if we're on a Chrome internal page
      const tab = tabs[0];
      if (tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://') && settings.autoDetect) {
        // Only auto-detect on regular websites if enabled
        handleDetect();
      } else {
        // Show empty state for internal pages or invalid URLs, or if auto-detect is disabled
        showState('empty');
      }
    } else {
      // No tab found, show empty state
      showState('empty');
    }

    // Setup event listeners
    setupEventListeners();
  }

  /**
   * Setup event listeners
   */
  function setupEventListeners() {
    detectBtn.addEventListener('click', handleDetect);
    retryBtn.addEventListener('click', handleDetect);
    exportJsonBtn.addEventListener('click', handleExportJson);
    exportCsvBtn.addEventListener('click', handleExportCsv);
    copyBtn.addEventListener('click', handleCopy);
    sortSelect.addEventListener('change', handleSort);
    showEvidenceToggle.addEventListener('change', handleToggleEvidence);
    themeToggle.addEventListener('click', handleThemeToggle);
    
    // Footer links
    document.getElementById('settingsLink').addEventListener('click', (e) => {
      e.preventDefault();
      chrome.runtime.openOptionsPage();
    });
    
    document.getElementById('aboutLink').addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: 'https://kreggscode.github.io/stackscope/' });
    });
    
    document.getElementById('privacyLink').addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: 'https://kreggscode.github.io/stackscope/privacy.html' });
    });
  }

  /**
   * Load settings from storage
   */
  async function loadSettings() {
    try {
      const defaults = {
        darkMode: false,
        autoDetect: true,
        defaultSort: 'confidence',
        showEvidence: true,
        confidenceThreshold: 0,
        debugMode: false,
        cacheResults: true
      };
      const result = await chrome.storage.sync.get(defaults);
      // Merge defaults with loaded settings
      settings = { ...defaults, ...result };
      if (settings.debugMode) {
        console.log('[StackScope Popup] Settings loaded:', settings);
      }
    } catch (error) {
      console.error('[StackScope Popup] Failed to load settings:', error);
      // Fallback to defaults
      settings = {
        darkMode: false,
        autoDetect: true,
        defaultSort: 'confidence',
        showEvidence: true,
        confidenceThreshold: 0,
        debugMode: false,
        cacheResults: true
      };
    }
  }

  /**
   * Apply theme based on settings
   */
  function applyTheme() {
    const isDark = settings.darkMode;
    const newIcon = isDark ? '☀️' : '🌙';

    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Update icon with smooth transition
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
      if (themeIcon.textContent !== newIcon) {
        themeIcon.style.opacity = '0';
        setTimeout(() => {
          themeIcon.textContent = newIcon;
          themeIcon.style.opacity = '1';
        }, 150);
      } else if (!themeIcon.textContent) {
        // Initial load - set icon immediately without transition
        themeIcon.textContent = newIcon;
        themeIcon.style.opacity = '1';
      }
    }
  }

  /**
   * Load cached results from storage
   */
  async function loadCachedResults() {
    try {
      const response = await chrome.runtime.sendMessage({ 
        action: 'getStoredResults' 
      });
      
      if (response.success && response.data) {
        const data = response.data;
        
        // Check if results are for current tab
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tabs.length > 0 && data.url === tabs[0].url) {
          console.log('[StackScope Popup] Loaded cached results');
          displayResults(data);
        }
      }
    } catch (error) {
      console.error('[StackScope Popup] Failed to load cached results:', error);
    }
  }

  /**
   * Handle detect button click
   */
  async function handleDetect() {
    console.log('[StackScope Popup] Starting detection...');
    
    showState('loading');
    
    try {
      // Check if we can access the current tab
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs.length === 0) {
        throw new Error('No active tab found');
      }
      
      const tab = tabs[0];
      currentTabId = tab.id;
      
      // Check if URL is accessible
      if (!tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
        throw new Error('Chrome internal pages cannot be analyzed. Please navigate to a regular website.');
      }
      
      // Send detection request to background script
      const response = await chrome.runtime.sendMessage({
        action: 'detectTechnologies',
        tabId: currentTabId
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Detection failed');
      }
      
      console.log('[StackScope Popup] Detection complete:', response.data);
      displayResults(response.data);
      
    } catch (error) {
      console.error('[StackScope Popup] Detection error:', error);
      showError(error.message);
    }
  }

  /**
   * Display detection results
   */
  function displayResults(data) {
    currentResults = data;

    // Filter technologies by confidence threshold
    let filteredTechnologies = data.technologies;
    if (settings.confidenceThreshold > 0) {
      filteredTechnologies = data.technologies.filter(tech => tech.confidence >= settings.confidenceThreshold);
    }

    // Update summary
    techCount.textContent = filteredTechnologies.length;
    pageTitle.textContent = data.title || new URL(data.url).hostname;
    pageTitle.title = data.title;

    // Render technologies
    renderTechnologies(filteredTechnologies);

    // Show results
    showState('results');
  }

  /**
   * Render technologies list
   */
  function renderTechnologies(technologies) {
    technologiesList.innerHTML = '';
    
    if (technologies.length === 0) {
      technologiesList.innerHTML = `
        <div class="state-container">
          <div class="empty-icon">🤷</div>
          <p class="state-message">No technologies detected</p>
          <p class="state-hint">This page might be using custom or unrecognized technologies</p>
        </div>
      `;
      return;
    }
    
    technologies.forEach(tech => {
      const card = createTechCard(tech);
      technologiesList.appendChild(card);
    });
  }

  /**
   * Create technology card element
   */
  function createTechCard(tech) {
    const card = document.createElement('div');
    card.className = 'tech-card';
    
    // Determine confidence level
    let confidenceClass = 'confidence-low';
    if (tech.confidence >= 80) confidenceClass = 'confidence-high';
    else if (tech.confidence >= 60) confidenceClass = 'confidence-medium';
    
    // Get categories (from fingerprints or default)
    const categories = tech.categories || ['Unknown'];
    
    // Build HTML
    card.innerHTML = `
      <div class="tech-header">
        <div class="tech-name">
          <span class="tech-icon">${getTechIcon(tech.name)}</span>
          ${tech.name}
        </div>
        <div class="confidence-badge ${confidenceClass}">
          ${tech.confidence}%
        </div>
      </div>
      
      <div class="tech-categories">
        ${categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
      </div>
      
      ${showEvidenceToggle.checked && tech.evidence && tech.evidence.length > 0 ? `
        <div class="tech-evidence">
          <div class="evidence-title">
            Evidence
            <span class="evidence-count">${tech.evidenceCount || tech.evidence.length}</span>
          </div>
          <div class="evidence-list">
            ${tech.evidence.slice(0, 3).map(ev => `
              <div class="evidence-item">
                <span class="evidence-type">${ev.type}:</span>
                ${ev.value}
              </div>
            `).join('')}
            ${tech.evidence.length > 3 ? `
              <div class="evidence-item" style="text-align: center; font-style: italic;">
                +${tech.evidence.length - 3} more
              </div>
            ` : ''}
          </div>
        </div>
      ` : ''}
    `;
    
    return card;
  }

  /**
   * Get icon for technology
   */
  function getTechIcon(name) {
    const iconMap = {
      'React': '⚛️',
      'Vue.js': '💚',
      'Angular': '🅰️',
      'jQuery': '💙',
      'WordPress': '📝',
      'Shopify': '🛍️',
      'Google Analytics': '📊',
      'Firebase': '🔥',
      'Cloudflare': '☁️',
      'Bootstrap': '🅱️',
      'Tailwind CSS': '🎨',
      'Node.js': '🟢',
      'Next.js': '▲',
      'Nuxt.js': '💚',
      'Stripe': '💳',
      'PayPal': '💰'
    };
    
    return iconMap[name] || '🔧';
  }

  /**
   * Handle sort change
   */
  function handleSort() {
    if (!currentResults) return;

    const sortBy = sortSelect.value;
    let technologies = [...currentResults.technologies];

    // Filter by confidence threshold first
    if (settings.confidenceThreshold > 0) {
      technologies = technologies.filter(tech => tech.confidence >= settings.confidenceThreshold);
    }

    switch (sortBy) {
      case 'confidence':
        technologies.sort((a, b) => b.confidence - a.confidence);
        break;
      case 'name':
        technologies.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'category':
        technologies.sort((a, b) => {
          const catA = (a.categories || ['Unknown'])[0];
          const catB = (b.categories || ['Unknown'])[0];
          return catA.localeCompare(catB);
        });
        break;
    }

    renderTechnologies(technologies);
  }

  /**
   * Handle toggle evidence
   */
  function handleToggleEvidence() {
    if (!currentResults) return;

    let technologies = [...currentResults.technologies];

    // Filter by confidence threshold first
    if (settings.confidenceThreshold > 0) {
      technologies = technologies.filter(tech => tech.confidence >= settings.confidenceThreshold);
    }

    renderTechnologies(technologies);
  }

  /**
   * Handle theme toggle
   */
  async function handleThemeToggle() {
    settings.darkMode = !settings.darkMode;
    applyTheme();

    // Save the setting
    try {
      await chrome.storage.sync.set({ darkMode: settings.darkMode });
      if (settings.debugMode) {
        console.log('[StackScope Popup] Theme toggled:', settings.darkMode);
      }
    } catch (error) {
      console.error('[StackScope Popup] Failed to save theme setting:', error);
    }
  }

  /**
   * Handle export to JSON
   */
  function handleExportJson() {
    if (!currentResults) return;
    
    const json = JSON.stringify(currentResults, null, 2);
    downloadFile(json, 'stackscope-results.json', 'application/json');
    showNotification('Exported as JSON');
  }

  /**
   * Handle export to CSV
   */
  function handleExportCsv() {
    if (!currentResults) return;
    
    const headers = ['Name', 'Confidence', 'Categories', 'Evidence Count'];
    const rows = currentResults.technologies.map(tech => [
      tech.name,
      tech.confidence,
      (tech.categories || ['Unknown']).join('; '),
      tech.evidenceCount || tech.evidence?.length || 0
    ]);
    
    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    downloadFile(csv, 'stackscope-results.csv', 'text/csv');
    showNotification('Exported as CSV');
  }

  /**
   * Handle copy to clipboard
   */
  async function handleCopy() {
    if (!currentResults) return;
    
    const text = currentResults.technologies
      .map(tech => `${tech.name} (${tech.confidence}%)`)
      .join('\n');
    
    try {
      await navigator.clipboard.writeText(text);
      showNotification('Copied to clipboard');
    } catch (error) {
      console.error('[StackScope Popup] Copy failed:', error);
      showNotification('Copy failed', true);
    }
  }

  /**
   * Download file
   */
  function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Show notification
   */
  function showNotification(message, isError = false) {
    // Simple notification - could be enhanced with a toast component
    const originalText = copyBtn.querySelector('.btn-icon').nextSibling.textContent;
    copyBtn.querySelector('.btn-icon').nextSibling.textContent = message;
    
    setTimeout(() => {
      copyBtn.querySelector('.btn-icon').nextSibling.textContent = originalText;
    }, 2000);
  }

  /**
   * Show specific state
   */
  function showState(state) {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    emptyState.classList.add('hidden');
    resultsContainer.classList.add('hidden');
    
    switch (state) {
      case 'loading':
        loadingState.classList.remove('hidden');
        break;
      case 'error':
        errorState.classList.remove('hidden');
        break;
      case 'empty':
        emptyState.classList.remove('hidden');
        break;
      case 'results':
        resultsContainer.classList.remove('hidden');
        break;
    }
  }

  /**
   * Show error message
   */
  function showError(message) {
    errorMessage.textContent = message;
    showState('error');
  }

  // Initialize on load
  document.addEventListener('DOMContentLoaded', init);

  // Listen for storage changes to sync with options page
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
      // Update settings object with all changes
      Object.keys(changes).forEach(key => {
        settings[key] = changes[key].newValue;
      });

      // Re-apply theme
      applyTheme();

      // Update UI elements to reflect new settings
      const sortSelect = document.getElementById('sortSelect');
      const showEvidenceToggle = document.getElementById('showEvidenceToggle');

      if (sortSelect) sortSelect.value = settings.defaultSort;
      if (showEvidenceToggle) showEvidenceToggle.checked = settings.showEvidence;

      // Re-filter results if we have them
      if (currentResults) {
        let filteredTechnologies = currentResults.technologies;
        if (settings.confidenceThreshold > 0) {
          filteredTechnologies = currentResults.technologies.filter(tech => tech.confidence >= settings.confidenceThreshold);
        }
        renderTechnologies(filteredTechnologies);
      }
    }
  });

})();
