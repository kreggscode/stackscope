# 🔍 StackScope - Ultimate Technology Detector

> **Detect 2,390+ web technologies instantly!** The most comprehensive browser extension for identifying frameworks, libraries, databases, analytics, and more.

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-blue?style=for-the-badge&logo=google-chrome)](https://chrome.google.com/webstore)
[![Technologies](https://img.shields.io/badge/Technologies-2,390+-purple?style=for-the-badge)](https://github.com/kreggscode/stackscope)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

![StackScope Banner](https://via.placeholder.com/1200x400/667eea/ffffff?text=StackScope+-+2,390%2B+Technology+Detector)**

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-blue)](https://chrome.google.com/webstore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)](https://developer.chrome.com/docs/extensions/mv3/intro/)
</div>

## 📋 Overview

StackScope is a privacy-focused Chrome extension that detects web technologies, frameworks, libraries, CMS platforms, analytics tools, and more on any website. Built with **Manifest V3** and designed with **minimal permissions** to ensure user privacy and compliance with Chrome Web Store policies.

### ✨ Features

- 🚀 **Comprehensive Detection** - Identifies 80+ technologies including:
  - JavaScript frameworks (React, Vue, Angular, etc.)
  - CMS platforms (WordPress, Drupal, Joomla)
  - E-commerce platforms (Shopify, WooCommerce, Magento)
  - Analytics tools (Google Analytics, Mixpanel, Hotjar)
  - CDNs, hosting providers, and more

- 🔒 **Privacy-First** - All detection happens locally in your browser
  - No data sent to external servers
  - No tracking or analytics
  - Minimal permissions (activeTab, scripting, storage only)

- 🎨 **Modern UI** - Clean, intuitive interface with:
  - Confidence scores for each detection
  - Evidence display showing how technologies were detected
  - Export to JSON/CSV
  - Sort and filter options

- ⚡ **High Performance** - Optimized detection algorithms:
  - Incremental scanning
  - Debounced mutation observer for SPAs
  - Limited regex scanning to avoid performance issues

## 🚀 Installation

### From Chrome Web Store (Recommended)
*Coming soon - awaiting publication*

### Manual Installation (Development)

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/stackscope.git
   cd stackscope
   ```

2. **Open Chrome Extensions page**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)

3. **Load the extension**
   - Click "Load unpacked"
   - Select the extension directory
   - The StackScope icon should appear in your toolbar

   - Click the puzzle piece icon in Chrome toolbar
   - Click the pin icon next to StackScope

## 🎮 Usage

1. **Click the StackScope icon** in your browser toolbar
2. **Click "Scan"** to analyze the current page
3. **View results** - See all detected technologies with confidence scores
4. **Export data** - Download as JSON or CSV for further analysis
5. **Filter & Sort** - Organize results by confidence, name, or category

### ⚙️ Settings

Access comprehensive settings by clicking the **"Settings"** link in the extension popup:

- **🎨 Dark Mode** - Switch between light and dark themes
- **🔄 Auto-Detection** - Control automatic scanning when opening the extension
- **📊 Default Sort** - Choose how technologies are sorted by default
- **👁️ Evidence Display** - Show/hide detection evidence by default
- **🎯 Confidence Threshold** - Filter technologies by minimum confidence level
- **🐛 Debug Mode** - Enable detailed console logging
- **💾 Cache Results** - Remember results for recently visited pages

Settings are automatically saved and synced across your devices. 

5. **Export results** (optional):
   - Click "JSON" to export as JSON
   - Click "CSV" to export as CSV
   - Click "Copy" to copy technology list to clipboard

## 🔧 How It Works

### Detection Techniques

StackScope uses multiple detection methods to identify technologies:

1. **JavaScript Globals** - Checks for specific global variables on `window` object
   ```javascript
   // Example: React detection
   window.React, window.ReactDOM, window.__REACT_DEVTOOLS_GLOBAL_HOOK__
   ```

2. **Script Source Analysis** - Examines `<script src>` attributes
   ```html
   <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
   ```

3. **Meta Tags** - Inspects meta tag content
   ```html
   <meta name="generator" content="WordPress 6.3" />
   ```

4. **Link Hrefs** - Analyzes stylesheet and resource links
   ```html
   <link href="/wp-content/themes/..." rel="stylesheet" />
   ```

5. **Cookies** - Checks for technology-specific cookies
   ```
   _ga, _gid (Google Analytics)
   ```

6. **HTML Pattern Matching** - Safe, limited regex scanning of page content
   ```html
   <div data-reactroot>...</div>
   ```

### Confidence Scoring

Each detection receives a confidence score (0-100%) based on:
- **Type of evidence** - JS globals are more reliable than HTML patterns
- **Number of evidence items** - Multiple detections increase confidence
- **Technology-specific weights** - Defined in `fingerprints.json`

### Architecture

```
┌─────────────┐
│   popup.js  │ ◄─── User Interface
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  background.js  │ ◄─── Service Worker (Manifest V3)
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│   detector.js   │ ◄─── Injected into page context
└──────┬──────────┘
       │
       ▼
┌──────────────────┐
│ fingerprints.json│ ◄─── Technology database
└──────────────────┘
```

## 📁 Project Structure

```
stackscope/
├── manifest.json                    # Extension manifest (V3)
├── background.js                    # Service worker
├── detector.js                      # Detection logic
├── fingerprints.json                # Technology database (80+ techs)
├── popup.html                       # Popup UI
├── popup.css                        # Popup styles
├── popup.js                         # Popup logic
├── icons/                           # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── README.md                        # This file
├── privacy.md                       # Privacy policy template
├── packaging.md                     # Publishing guide
├── manifest_permissions_rationale.md # Permissions explanation
├── privacy_policy.html              # User-facing privacy policy
└── LICENSE                          # MIT License
```

## 🔐 Privacy & Permissions

### Permissions Used

- **`activeTab`** - Access current tab when you click the extension icon
- **`scripting`** - Inject detector script into the page
- **`storage`** - Cache detection results locally

### What We DON'T Do

- ❌ No data sent to external servers
- ❌ No tracking or analytics
- ❌ No access to browsing history
- ❌ No access to all websites (only when you click the icon)
- ❌ No background data collection

See [privacy.md](privacy.md) for full privacy policy.

## 🛠️ Development

### Adding New Technologies

1. Open `fingerprints.json`
2. Add a new technology object:

```json
{
  "name": "YourTech",
  "categories": ["Category"],
  "confidence": 90,
  "matchers": {
    "js_globals": ["YourGlobal"],
    "script_src": ["yourtech.js"],
    "meta": {
      "generator": ["YourTech"]
    }
  }
}
```

3. Test on a page using that technology
4. Submit a pull request!

### Testing

1. Load the extension in Chrome (see Installation)
2. Navigate to test pages with known technologies
3. Click "Detect" and verify results
4. Check browser console for any errors

### Building for Production

1. **Update version** in `manifest.json`
2. **Replace placeholder icons** in `icons/` directory
3. **Update URLs** in `manifest.json` and documentation
4. **Create ZIP file**:
   ```bash
   zip -r stackscope-v1.0.0.zip . -x "*.git*" "*.DS_Store" "node_modules/*"
   ```
5. **Upload to Chrome Web Store** (see [packaging.md](packaging.md))

## 📦 Publishing to Chrome Web Store

See [packaging.md](packaging.md) for detailed instructions on:
- Creating a developer account
- Preparing store assets
- Writing store listing
- Avoiding suspension/removal
- Compliance checklist

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution

- 🆕 Add more technology fingerprints
- 🐛 Fix detection bugs
- 🎨 Improve UI/UX
- 📚 Improve documentation
- 🌍 Add internationalization

## 🐛 Known Issues

- Some technologies may not be detected if they're loaded asynchronously after page load
- Chrome internal pages (chrome://, chrome-extension://) cannot be analyzed
- Some sites with strict CSP may block detection

## 📝 Changelog

### v1.0.0 (2025-10-09)
- 🎉 Initial release
- ✅ 80+ technology fingerprints
- ✅ Manifest V3 support
- ✅ Minimal permissions
- ✅ Export to JSON/CSV
- ✅ Modern UI with confidence scores

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Wappalyzer](https://www.wappalyzer.com/)
- Built with Chrome Extension Manifest V3
- Icons from [placeholder - replace with your icon source]

## 📧 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/kreggscode/stackscope/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/kreggscode/stackscope/discussions)
- 📧 **Email**: kreggscode@github.com

## ⚠️ Disclaimer

StackScope is provided "as is" without warranty of any kind. Detection results may not be 100% accurate. Use at your own discretion.

---

<div align="center">

**Made with ❤️ by kreggscode**

[Website](https://kreggscode.github.io/stackscope/) • [GitHub](https://github.com/kreggscode/stackscope) • [Privacy Policy](https://kreggscode.github.io/stackscope/privacy.html)

</div>
