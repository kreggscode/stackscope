class StackScopeSettings {
    constructor() {
        this.defaults = {
            darkMode: false,
            autoDetect: true,
            defaultSort: 'confidence',
            showEvidence: true,
            confidenceThreshold: 0,
            debugMode: false,
            cacheResults: true
        };

        // Store reference for cross-page sync
        window.stackScopeSettingsInstance = this;

        this.init();
    }

    async init() {
        await this.loadSettings();
        this.setupEventListeners();
    }

    async loadSettings() {
        try {
            const result = await chrome.storage.sync.get(this.defaults);
            // Merge defaults with loaded settings
            this.settings = { ...this.defaults, ...result };

            // Apply settings to UI
            const darkModeToggle = document.getElementById('darkModeToggle');
            const autoDetectToggle = document.getElementById('autoDetectToggle');
            const defaultSort = document.getElementById('defaultSort');
            const showEvidenceToggle = document.getElementById('showEvidenceToggle');
            const confidenceThreshold = document.getElementById('confidenceThreshold');
            const debugModeToggle = document.getElementById('debugModeToggle');
            const cacheResultsToggle = document.getElementById('cacheResultsToggle');

            if (darkModeToggle) darkModeToggle.checked = this.settings.darkMode;
            if (autoDetectToggle) autoDetectToggle.checked = this.settings.autoDetect;
            if (defaultSort) defaultSort.value = this.settings.defaultSort;
            if (showEvidenceToggle) showEvidenceToggle.checked = this.settings.showEvidence;
            if (confidenceThreshold) confidenceThreshold.value = this.settings.confidenceThreshold;
            if (debugModeToggle) debugModeToggle.checked = this.settings.debugMode;
            if (cacheResultsToggle) cacheResultsToggle.checked = this.settings.cacheResults;
        } catch (error) {
            console.error('[StackScope Settings] Failed to load settings:', error);
            // Fallback to defaults
            this.settings = { ...this.defaults };
        }
    }

    async saveSettings() {
        try {
            await chrome.storage.sync.set(this.settings);
            this.showNotification();
        } catch (error) {
            alert('Failed to save settings. Please try again.');
        }
    }

    async resetSettings() {
        if (confirm('Are you sure you want to reset all settings to defaults?')) {
            this.settings = { ...this.defaults };
            await this.saveSettings();
            await this.loadSettings();
            this.applyTheme();
        }
    }

    setupEventListeners() {

        // Theme toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('change', (e) => {
                this.settings.darkMode = e.target.checked;
                this.applyTheme();
            });
        }

        // Other settings
        const autoDetectToggle = document.getElementById('autoDetectToggle');
        if (autoDetectToggle) {
            autoDetectToggle.addEventListener('change', (e) => {
                this.settings.autoDetect = e.target.checked;
            });
        }

        const defaultSort = document.getElementById('defaultSort');
        if (defaultSort) {
            defaultSort.addEventListener('change', (e) => {
                this.settings.defaultSort = e.target.value;
            });
        }

        const showEvidenceToggle = document.getElementById('showEvidenceToggle');
        if (showEvidenceToggle) {
            showEvidenceToggle.addEventListener('change', (e) => {
                this.settings.showEvidence = e.target.checked;
            });
        }

        const confidenceThreshold = document.getElementById('confidenceThreshold');
        if (confidenceThreshold) {
            confidenceThreshold.addEventListener('change', (e) => {
                this.settings.confidenceThreshold = parseInt(e.target.value);
            });
        }

        const debugModeToggle = document.getElementById('debugModeToggle');
        if (debugModeToggle) {
            debugModeToggle.addEventListener('change', (e) => {
                this.settings.debugMode = e.target.checked;
            });
        }

        const cacheResultsToggle = document.getElementById('cacheResultsToggle');
        if (cacheResultsToggle) {
            cacheResultsToggle.addEventListener('change', (e) => {
                this.settings.cacheResults = e.target.checked;
            });
        }

        // Buttons
        const saveButton = document.getElementById('saveButton');
        if (saveButton) {
            saveButton.addEventListener('click', () => {
                this.saveSettings();
            });
        }

        const resetButton = document.getElementById('resetButton');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.resetSettings();
            });
        }
    }

    applyTheme() {
        if (this.settings.darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        // Update the dark mode toggle checkbox to reflect current state
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.checked = this.settings.darkMode;
        }
    }

    showNotification() {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.classList.add('show');

            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }
}

// Initialize settings when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StackScopeSettings();
});

// Listen for storage changes to sync with popup
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
        const settingsInstance = window.stackScopeSettingsInstance;
        if (settingsInstance) {
            // Update settings object with all changes
            Object.keys(changes).forEach(key => {
                settingsInstance.settings[key] = changes[key].newValue;
            });

            // Re-apply theme and update UI
            settingsInstance.applyTheme();

            // Update UI elements to reflect new settings
            const darkModeToggle = document.getElementById('darkModeToggle');
            const autoDetectToggle = document.getElementById('autoDetectToggle');
            const defaultSort = document.getElementById('defaultSort');
            const showEvidenceToggle = document.getElementById('showEvidenceToggle');
            const confidenceThreshold = document.getElementById('confidenceThreshold');
            const debugModeToggle = document.getElementById('debugModeToggle');
            const cacheResultsToggle = document.getElementById('cacheResultsToggle');

            if (darkModeToggle) darkModeToggle.checked = settingsInstance.settings.darkMode;
            if (autoDetectToggle) autoDetectToggle.checked = settingsInstance.settings.autoDetect;
            if (defaultSort) defaultSort.value = settingsInstance.settings.defaultSort;
            if (showEvidenceToggle) showEvidenceToggle.checked = settingsInstance.settings.showEvidence;
            if (confidenceThreshold) confidenceThreshold.value = settingsInstance.settings.confidenceThreshold;
            if (debugModeToggle) debugModeToggle.checked = settingsInstance.settings.debugMode;
            if (cacheResultsToggle) cacheResultsToggle.checked = settingsInstance.settings.cacheResults;
        }
    }
});
