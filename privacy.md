# Privacy Policy - StackScope

**Last Updated: October 9, 2025**

## Overview

StackScope ("we", "our", or "the extension") is committed to protecting your privacy. This privacy policy explains how StackScope handles information when you use our Chrome extension.

## TL;DR (Summary)

- ✅ **All detection happens locally** in your browser
- ✅ **No data is sent to external servers**
- ✅ **No tracking or analytics**
- ✅ **No personal information collected**
- ✅ **Minimal permissions** (activeTab, scripting, storage)

## Information Collection and Use

### What We Access

StackScope requires minimal permissions to function:

1. **activeTab Permission**
   - **Purpose**: Access the current tab when you click the extension icon
   - **Scope**: Only the active tab, only when you trigger detection
   - **Data Accessed**: Page HTML, JavaScript globals, meta tags, scripts, cookies (read-only)
   - **Usage**: Analyze page content to detect technologies
   - **Storage**: Results cached locally in your browser only

2. **scripting Permission**
   - **Purpose**: Inject detection script into the page
   - **Scope**: Only when you click "Detect"
   - **Data Accessed**: None beyond what activeTab provides
   - **Usage**: Run detection algorithms in page context

3. **storage Permission**
   - **Purpose**: Cache detection results locally
   - **Scope**: Chrome local storage (on your device only)
   - **Data Stored**: 
     - Last detection results (URL, page title, detected technologies)
     - Detection history (last 50 detections: URL, timestamp, tech count)
     - User settings (UI preferences)
   - **Retention**: Until you clear extension data or uninstall

### What We DON'T Collect

- ❌ **No personal information** (name, email, etc.)
- ❌ **No browsing history**
- ❌ **No page content sent to servers**
- ❌ **No tracking pixels or analytics**
- ❌ **No cookies set by the extension**
- ❌ **No user identifiers**
- ❌ **No background data collection**

## Data Processing

### Local Processing Only

All technology detection happens **entirely in your browser**:

1. You click "Detect" on a page
2. Extension injects detector script into that page
3. Script analyzes page content locally
4. Results displayed in popup
5. Results cached in Chrome local storage (on your device)

**No data leaves your device.**

### Data Storage

Detection results are stored locally using Chrome's `chrome.storage.local` API:

- **Location**: Your device only (not synced to Chrome account)
- **Purpose**: Display cached results without re-scanning
- **Retention**: Until you clear extension data or uninstall
- **Access**: Only StackScope extension can access this data

### Data Sharing

**We do not share, sell, rent, or trade your data with anyone.**

There are no third-party services, analytics, or tracking in StackScope.

## Third-Party Services

StackScope does **not** use any third-party services, including:

- No analytics (Google Analytics, etc.)
- No error tracking (Sentry, etc.)
- No CDNs for extension code
- No external APIs
- No advertising networks

The extension is completely self-contained.

## Optional Features

### Future Server-Based Detection (Not Currently Implemented)

If we add optional server-based detection in the future:

- **Opt-in only** - Disabled by default
- **Clear consent** - Explicit permission dialog
- **Minimal data** - Only hostname (not full URL or page content)
- **Transparent** - Show exactly what will be sent
- **Revocable** - Easy to disable

We will update this privacy policy before implementing any server features.

## Data Security

- All data stored locally using Chrome's secure storage APIs
- No transmission of data over networks
- No encryption needed (data never leaves your device)
- Extension code is open source and auditable

## Your Rights

### Data Access
You can view all stored data:
1. Right-click extension icon → "Inspect popup"
2. Console: `chrome.storage.local.get(null, console.log)`

### Data Deletion
You can delete all stored data:
- **Option 1**: Right-click extension icon → "Remove from Chrome"
- **Option 2**: Chrome Settings → Extensions → StackScope → "Remove"
- **Option 3**: Chrome Settings → Privacy → Clear browsing data → "Cookies and other site data" (with StackScope selected)

### Data Portability
Export your detection results:
- Click "JSON" or "CSV" in the extension popup
- Data is yours to keep and use

## Children's Privacy

StackScope does not knowingly collect information from anyone, including children under 13. The extension does not collect personal information from any users.

## Changes to This Policy

We may update this privacy policy from time to time. Changes will be posted:
- In this file (privacy.md)
- In the Chrome Web Store listing
- With an updated "Last Updated" date

Continued use after changes constitutes acceptance of the updated policy.

## Compliance

### GDPR (EU General Data Protection Regulation)

StackScope complies with GDPR principles:
- **Lawfulness**: Processing based on legitimate interest (functionality)
- **Purpose limitation**: Data used only for technology detection
- **Data minimization**: Only necessary data accessed
- **Accuracy**: Data accurate (reflects actual page content)
- **Storage limitation**: Data retained only as needed
- **Integrity**: Data secured in Chrome local storage
- **Accountability**: This policy documents our practices

**Your GDPR Rights:**
- Right to access: View stored data (see "Data Access" above)
- Right to erasure: Delete data (see "Data Deletion" above)
- Right to portability: Export data (see "Data Portability" above)
- Right to object: Uninstall extension

### CCPA (California Consumer Privacy Act)

StackScope complies with CCPA:
- **No sale of data**: We do not sell personal information
- **No sharing of data**: We do not share personal information
- **Transparency**: This policy discloses our practices
- **Consumer rights**: You can delete data at any time

### Chrome Web Store Policies

StackScope complies with [Chrome Web Store Developer Program Policies](https://developer.chrome.com/docs/webstore/program-policies/):
- Minimal permissions requested
- No deceptive behavior
- No data collection beyond stated purpose
- Clear privacy disclosures

## Contact Us

If you have questions about this privacy policy or StackScope's practices:

- **GitHub Issues**: [https://github.com/yourusername/stackscope/issues](https://github.com/yourusername/stackscope/issues)
- **Email**: your.email@example.com
- **Website**: [https://yourwebsite.com](https://yourwebsite.com)

## Open Source

StackScope is open source. You can review the code to verify our privacy claims:

- **Repository**: [https://github.com/yourusername/stackscope](https://github.com/yourusername/stackscope)
- **License**: MIT

## Consent

By installing and using StackScope, you consent to this privacy policy.

---

**Summary**: StackScope is a privacy-focused extension that performs all detection locally in your browser. No data is sent to external servers. No tracking. No analytics. Your privacy is our priority.
