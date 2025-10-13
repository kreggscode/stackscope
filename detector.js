/**
 * StackScope Technology Detector
 * 
 * This script runs in the page context and detects technologies using multiple techniques:
 * - JavaScript global variables (window object inspection)
 * - Script src attributes
 * - Meta tags
 * - Link href attributes
 * - Cookie names
 * - Safe HTML pattern matching
 * - DOM mutation observation for SPAs
 * 
 * Performance considerations:
 * - Incremental scanning to avoid blocking
 * - Debounced mutation observer
 * - Limited regex scanning on large pages
 */

(function() {
  'use strict';

  // Prevent multiple injections
  if (window.StackScopeDetector) {
    return;
  }

  /**
   * Main detector class
   */
  class TechnologyDetector {
    constructor() {
      this.detectedTechnologies = new Map();
      this.evidence = new Map();
      this.mutationObserver = null;
    }

    /**
     * Main detection entry point
     * @param {Array} fingerprints - Array of technology fingerprints
     * @returns {Array} Detected technologies with evidence
     */
    detect(fingerprints) {
      this.detectedTechnologies.clear();
      this.evidence.clear();

      // Run all detection methods
      this.detectFromJavaScript(fingerprints);
      this.detectFromScripts(fingerprints);
      this.detectFromMeta(fingerprints);
      this.detectFromLinks(fingerprints);
      this.detectFromCookies(fingerprints);
      this.detectFromHTML(fingerprints);
      
      // Convert results to array with confidence scores
      const results = this.calculateResults();

      return results;
    }

    /**
     * Detect technologies from JavaScript globals
     */
    detectFromJavaScript(fingerprints) {
      fingerprints.forEach(tech => {
        if (!tech.matchers || !tech.matchers.js_globals) return;

        tech.matchers.js_globals.forEach(pattern => {
          try {
            const exists = this.checkGlobalExists(pattern);
            if (exists) {
              this.addEvidence(tech.name, 'js_global', pattern, tech.confidence || 80);
            }
          } catch (e) {
            // Silently fail for inaccessible properties
          }
        });
      });
    }

    /**
     * Check if a global variable exists on window
     */
    checkGlobalExists(pattern) {
      const parts = pattern.split('.');
      let obj = window;
      
      for (const part of parts) {
        if (obj && typeof obj === 'object' && part in obj) {
          obj = obj[part];
        } else {
          return false;
        }
      }
      
      return true;
    }

    /**
     * Detect technologies from script src attributes
     */
    detectFromScripts(fingerprints) {
      const scripts = document.querySelectorAll('script[src]');
      const scriptSrcs = Array.from(scripts).map(s => s.src);

      fingerprints.forEach(tech => {
        if (!tech.matchers || !tech.matchers.script_src) return;

        tech.matchers.script_src.forEach(pattern => {
          const regex = this.patternToRegex(pattern);
          scriptSrcs.forEach(src => {
            if (regex.test(src)) {
              this.addEvidence(tech.name, 'script_src', src, tech.confidence || 90);
            }
          });
        });
      });
    }

    /**
     * Detect technologies from meta tags
     */
    detectFromMeta(fingerprints) {
      const metaTags = document.querySelectorAll('meta');

      fingerprints.forEach(tech => {
        if (!tech.matchers || !tech.matchers.meta) return;

        Object.entries(tech.matchers.meta).forEach(([metaName, patterns]) => {
          metaTags.forEach(meta => {
            const name = meta.getAttribute('name') || meta.getAttribute('property');
            const content = meta.getAttribute('content');
            
            if (name === metaName && content) {
              patterns.forEach(pattern => {
                const regex = this.patternToRegex(pattern);
                if (regex.test(content)) {
                  this.addEvidence(tech.name, 'meta', `${metaName}=${content}`, tech.confidence || 85);
                }
              });
            }
          });
        });
      });
    }

    /**
     * Detect technologies from link href attributes
     */
    detectFromLinks(fingerprints) {
      const links = document.querySelectorAll('link[href]');
      const linkHrefs = Array.from(links).map(l => ({ href: l.href, rel: l.rel }));

      fingerprints.forEach(tech => {
        if (!tech.matchers || !tech.matchers.link_href) return;

        tech.matchers.link_href.forEach(pattern => {
          const regex = this.patternToRegex(pattern);
          linkHrefs.forEach(link => {
            if (regex.test(link.href)) {
              this.addEvidence(tech.name, 'link_href', link.href, tech.confidence || 75);
            }
          });
        });
      });
    }

    /**
     * Detect technologies from cookies
     */
    detectFromCookies(fingerprints) {
      const cookies = document.cookie.split(';').map(c => c.trim().split('=')[0]);

      fingerprints.forEach(tech => {
        if (!tech.matchers || !tech.matchers.cookies) return;

        tech.matchers.cookies.forEach(cookieName => {
          if (cookies.includes(cookieName)) {
            this.addEvidence(tech.name, 'cookie', cookieName, tech.confidence || 70);
          }
        });
      });
    }

    /**
     * Detect technologies from HTML content (limited safe scanning)
     */
    detectFromHTML(fingerprints) {
      // Only scan head and first 5000 chars of body to avoid performance issues
      const head = document.head ? document.head.innerHTML : '';
      const bodySnippet = document.body ? document.body.innerHTML.substring(0, 5000) : '';
      const htmlContent = head + bodySnippet;

      fingerprints.forEach(tech => {
        if (!tech.matchers || !tech.matchers.html_regex) return;

        tech.matchers.html_regex.forEach(pattern => {
          try {
            const regex = this.patternToRegex(pattern);
            if (regex.test(htmlContent)) {
              this.addEvidence(tech.name, 'html_pattern', pattern, tech.confidence || 60);
            }
          } catch (e) {
            console.warn('[StackScope] Invalid regex pattern:', pattern, e);
          }
        });
      });
    }

    /**
     * Add evidence for a detected technology
     */
    addEvidence(techName, type, value, confidence) {
      if (!this.evidence.has(techName)) {
        this.evidence.set(techName, []);
      }
      
      this.evidence.get(techName).push({
        type,
        value,
        confidence
      });
      
      this.detectedTechnologies.set(techName, true);
    }

    /**
     * Calculate final results with confidence scores
     */
    calculateResults() {
      const results = [];

      this.detectedTechnologies.forEach((_, techName) => {
        const evidenceList = this.evidence.get(techName) || [];
        
        // Calculate aggregate confidence (average of all evidence, capped at 100)
        const totalConfidence = evidenceList.reduce((sum, e) => sum + e.confidence, 0);
        const avgConfidence = Math.min(100, Math.round(totalConfidence / evidenceList.length));
        
        // Find technology details from evidence
        const tech = {
          name: techName,
          confidence: avgConfidence,
          evidenceCount: evidenceList.length,
          evidence: evidenceList.map(e => ({
            type: e.type,
            value: this.truncateValue(e.value)
          }))
        };
        
        results.push(tech);
      });

      // Sort by confidence (highest first)
      results.sort((a, b) => b.confidence - a.confidence);

      return results;
    }

    /**
     * Truncate long evidence values for display
     */
    truncateValue(value, maxLength = 100) {
      if (typeof value !== 'string') return value;
      return value.length > maxLength ? value.substring(0, maxLength) + '...' : value;
    }

    /**
     * Convert pattern string to RegExp
     * Supports simple patterns and regex patterns
     */
    patternToRegex(pattern) {
      // If pattern is already a regex (starts and ends with /)
      if (pattern.startsWith('/') && pattern.lastIndexOf('/') > 0) {
        const lastSlash = pattern.lastIndexOf('/');
        const regexBody = pattern.substring(1, lastSlash);
        const flags = pattern.substring(lastSlash + 1);
        return new RegExp(regexBody, flags);
      }
      
      // Otherwise, escape special chars and treat as literal with wildcards
      const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(escaped, 'i');
    }

    /**
     * Setup mutation observer for SPA detection
     * This watches for DOM changes and re-runs detection
     */
    setupMutationObserver(fingerprints, callback) {
      if (this.mutationObserver) {
        this.mutationObserver.disconnect();
      }

      let debounceTimer;
      
      this.mutationObserver = new MutationObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          const results = this.detect(fingerprints);
          if (callback) callback(results);
        }, 2000); // Debounce 2 seconds
      });

      this.mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
      });
    }

    /**
     * Stop mutation observer
     */
    stopMutationObserver() {
      if (this.mutationObserver) {
        this.mutationObserver.disconnect();
        this.mutationObserver = null;
      }
    }
  }

  // Expose detector to window for background script access
  window.StackScopeDetector = new TechnologyDetector();

})();
