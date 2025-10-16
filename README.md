# 🔍 StackScope - Professional Technology Detector

<div align="center">

**Discover the complete tech stack behind any website instantly**

[![Chrome Web Store](https://img.shields.io/badge/Get%20on-Chrome%20Web%20Store-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](https://chrome.google.com/webstore)
[![Website](https://img.shields.io/badge/Website-stackscope.app-4f46e5?style=for-the-badge&logo=web&logoColor=white)](https://kreggscode.github.io/stackscope)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/kreggscode/stackscope)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 🚀 Now with 2,390+ Technologies!

[![🌐 Visit Our Website](https://img.shields.io/badge/🌐_Visit_Website-kreggscode.github.io/stackscope-4f46e5?style=for-the-badge&logo=web&logoColor=white)](https://kreggscode.github.io/stackscope)

![StackScope Logo](https://raw.githubusercontent.com/kreggscode/stackscope/main/Screenshots/1.png)

*Detect 2,390+ web technologies across 100+ categories*

![Main Interface](https://raw.githubusercontent.com/kreggscode/stackscope/main/Screenshots/2.png)

</div>

## ✨ Features

<div align="center">

| 🚀 **Lightning Fast** | 🎯 **Comprehensive** | 🔒 **Privacy First** |
|:---:|:---:|:---:|
| Instant detection | 2,390+ technologies | Zero data collection |
| Real-time analysis | 100+ categories | Local processing only |
| No waiting | Frameworks, CMS, Analytics | No external servers |

</div>

### 🔍 **Technology Detection**
StackScope identifies technologies across all major categories:

**Frontend & JavaScript**
- Frameworks: React, Vue.js, Angular, Svelte, Next.js, Nuxt.js
- Libraries: jQuery, Lodash, D3.js, Three.js, Axios
- UI: Bootstrap, Tailwind CSS, Material-UI, Font Awesome

**Backend & Databases**
- Languages: Node.js, Python, PHP, Ruby, Java
- Frameworks: Express, Django, Laravel, Spring Boot
- Databases: PostgreSQL, MySQL, MongoDB, Redis

**Content & E-commerce**
- CMS: WordPress, Drupal, Joomla, Ghost
- E-commerce: Shopify, WooCommerce, Magento, BigCommerce
- Builders: Wix, Squarespace, Webflow

**Analytics & Tools**
- Analytics: Google Analytics, Mixpanel, Hotjar, Segment
- Tag Managers: Google Tag Manager
- Security: reCAPTCHA, Cloudflare, hCaptcha

![Technology Categories](https://raw.githubusercontent.com/kreggscode/stackscope/main/Screenshots/3.png)

### 🎨 **Modern Interface**
- **Clean Design** - Professional UI with smooth animations
- **Confidence Scores** - Accuracy percentage for each detection
- **Evidence Display** - See exactly how technologies were detected
- **Dark Mode** - Automatic theme switching
- **Export Options** - JSON, CSV, and clipboard export
- **Smart Filtering** - Sort by confidence, name, or category

![Results View](https://raw.githubusercontent.com/kreggscode/stackscope/main/Screenshots/4.png)

### 🔐 **Privacy & Security**
- **Zero Data Collection** - Nothing sent to external servers
- **Local Processing** - All analysis happens in your browser
- **Minimal Permissions** - Only activeTab, scripting, and storage
- **Open Source** - Fully auditable code
- **No Tracking** - No analytics or data collection
- **Chrome Web Store Verified** - Meets all privacy requirements

![Privacy Features](https://raw.githubusercontent.com/kreggscode/stackscope/main/Screenshots/5.png)

## 🚀 Installation

### From Chrome Web Store *(Coming Soon)*
[![Get StackScope](https://img.shields.io/badge/Get%20StackScope-Chrome%20Web%20Store-blue?style=for-the-badge&logo=google-chrome)](https://chrome.google.com/webstore)

**Recommended for regular users** - One-click installation with automatic updates.

### Manual Installation (Development)

<div align="center">

**Step 1: Download**
   ```bash
git clone https://github.com/kreggscode/stackscope.git
   cd stackscope
   ```

**Step 2: Load in Chrome**
```
1. Open chrome://extensions/
2. Enable "Developer mode" (top-right toggle)
3. Click "Load unpacked"
4. Select the stackscope folder
5. StackScope icon appears in toolbar
```

![Installation Steps](https://raw.githubusercontent.com/kreggscode/stackscope/main/Screenshots/6.png)

</div>

## 🎯 How to Use

<div align="center">

### **3 Simple Steps:**

| 1️⃣ **Click Icon** | 2️⃣ **Scan Page** | 3️⃣ **View Results** |
|:---:|:---:|:---:|
| Click StackScope icon in toolbar | Click "Scan" button | See all detected technologies |
| Opens popup interface | Instant analysis | With confidence scores |

</div>

### 📊 **Understanding Results**
- **Confidence Scores**: 0-100% accuracy rating
- **Evidence Display**: See how each technology was detected
- **Categories**: Grouped by type (Frontend, Backend, Analytics, etc.)
- **Export Options**: JSON, CSV, or clipboard copy

![Usage Demo](https://raw.githubusercontent.com/kreggscode/stackscope/main/Screenshots/1.png)

### ⚙️ **Settings & Customization**
Access settings via the footer link in the popup:

- **🎨 Theme**: Light/Dark mode toggle
- **🔄 Auto-Detect**: Automatic scanning on popup open
- **📊 Sorting**: Default sort order (confidence/name/category)
- **👁️ Evidence**: Show/hide detection evidence
- **🎯 Threshold**: Minimum confidence filter
- **💾 Cache**: Remember recent results

## 🔧 How It Works

### **Detection Engine**
StackScope uses advanced detection techniques to identify technologies with high accuracy:

<div align="center">

| Method | Description | Example |
|:---:|:---:|:---:|
| **JavaScript Globals** | Checks `window` object for framework variables | `window.React`, `window.Vue` |
| **Script Analysis** | Examines `<script src>` attributes | CDN URLs, framework files |
| **Meta Tags** | Inspects meta tag content | `<meta name="generator">` |
| **Cookie Detection** | Checks technology-specific cookies | `_ga` (Google Analytics) |
| **HTML Patterns** | Safe regex matching on page content | `data-reactroot`, `ng-app` |
| **DOM Monitoring** | Observes dynamic content changes | SPA framework detection |

</div>

### **Confidence Scoring System**
- **90-100%**: High confidence - Multiple detection methods confirm
- **70-89%**: Medium confidence - Strong indicators present
- **50-69%**: Low confidence - Some indicators but inconclusive
- **<50%**: Very low - Minimal evidence, likely false positive

## 📊 Technology Database

StackScope maintains an extensive fingerprint database with **2,390+ technologies**:

- **Version Detection** - Identifies specific framework/library versions
- **Regular Updates** - Database updated with latest technologies
- **Open Source** - Community contributions welcome
- **Optimized Performance** - Efficient matching algorithms

## 🤝 Contributing

We welcome contributions to improve StackScope!

### **Ways to Contribute:**
- **Technology Fingerprints** - Add new technology detections
- **Bug Reports** - Report issues via GitHub Issues
- **Feature Requests** - Suggest improvements
- **Code Improvements** - Submit pull requests
- **Documentation** - Help improve docs

### **Development Setup:**
```bash
git clone https://github.com/kreggscode/stackscope.git
cd stackscope
# Load unpacked in Chrome developer mode
```

## 📄 License

**MIT License** - See [LICENSE](LICENSE) file

```
Copyright (c) 2025 kreggscode

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

## 🌐 Links & Resources

[![Website](https://img.shields.io/badge/🌐_Website-stackscope.app-4f46e5?style=flat-square)](https://kreggscode.github.io/stackscope)
[![GitHub](https://img.shields.io/badge/📦_Repository-GitHub-black?style=flat-square)](https://github.com/kreggscode/stackscope)
[![Issues](https://img.shields.io/badge/🐛_Issues-GitHub-red?style=flat-square)](https://github.com/kreggscode/stackscope/issues)
[![License](https://img.shields.io/badge/📄_License-MIT-green?style=flat-square)](LICENSE)

**Built with ❤️ for developers worldwide**

*Privacy-first • Open source • Chrome Web Store approved*

</div>
