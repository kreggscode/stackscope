# Manifest Permissions Rationale

This document explains every permission requested by StackScope and why it's necessary. This transparency helps users understand what the extension can access and helps with Chrome Web Store compliance.

## 📋 Permissions Overview

StackScope requests **only 3 permissions** - the absolute minimum needed for functionality:

```json
{
  "permissions": [
    "activeTab",
    "scripting",
    "storage"
  ],
  "host_permissions": []
}
```

## 🔍 Detailed Permission Explanations

### 1. `activeTab`

**What it allows:**
- Access to the currently active tab when you click the extension icon
- Read page content (HTML, scripts, cookies) of the active tab only
- No access to other tabs
- No access when extension is not actively used

**Why we need it:**
- To analyze the current page's HTML structure
- To detect meta tags, script sources, and link hrefs
- To read cookies for technology detection
- To access the page's JavaScript globals (window object)

**What we DON'T do with it:**
- ❌ Access tabs you're not actively analyzing
- ❌ Track your browsing history
- ❌ Monitor your activity in the background
- ❌ Access tabs automatically without your action

**Privacy implications:**
- **Low risk** - Only works when you explicitly click the extension icon
- No persistent access to any tabs
- No background monitoring

**Alternative considered:**
- `tabs` permission - **Rejected** because it provides unnecessary access to all tabs
- `<all_urls>` - **Rejected** because it's too broad and triggers privacy warnings

**Manifest V3 best practice:**
- ✅ `activeTab` is the recommended permission for extensions that work on-demand
- ✅ Provides user control (extension only works when you want it to)
- ✅ Minimizes privacy concerns

---

### 2. `scripting`

**What it allows:**
- Inject JavaScript code into web pages
- Execute scripts in the context of the page
- Access to `chrome.scripting.executeScript()` API

**Why we need it:**
- To inject `detector.js` into the page for technology detection
- To run detection logic in the page's context (needed to access window object)
- To pass fingerprint database to the detector

**What we DON'T do with it:**
- ❌ Modify page content or behavior
- ❌ Inject ads or tracking scripts
- ❌ Change how the page looks or functions
- ❌ Inject scripts into pages you're not analyzing

**How we use it responsibly:**
- Only inject when you click "Detect"
- Detector script is read-only (doesn't modify page)
- Script is removed after detection completes
- No persistent injection

**Privacy implications:**
- **Low risk** - Only used on-demand when you trigger detection
- Injected script is transparent (open source)
- No data sent to external servers

**Alternative considered:**
- Content scripts (manifest) - **Rejected** because:
  - Would run on all pages automatically
  - Wastes resources on pages you don't analyze
  - Less user control
- `chrome.tabs.executeScript()` (Manifest V2) - **Deprecated** in Manifest V3

**Manifest V3 requirement:**
- ✅ `scripting` permission is required for `chrome.scripting.executeScript()`
- ✅ Replaces deprecated `chrome.tabs.executeScript()`
- ✅ More secure and performant than automatic content scripts

---

### 3. `storage`

**What it allows:**
- Store data locally using `chrome.storage.local` API
- Read data from local storage
- No sync to Chrome account (we use `.local`, not `.sync`)

**Why we need it:**
- Cache detection results for faster display
- Store detection history (last 50 detections)
- Save user preferences (UI settings)

**What we store:**
```javascript
{
  lastDetection: {
    url: "https://example.com",
    title: "Example Site",
    timestamp: 1696867200000,
    technologies: [...]
  },
  detectionHistory: [
    { url: "...", timestamp: ..., techCount: 5 },
    // ... last 50 detections
  ],
  settings: {
    autoDetect: true,
    showConfidence: true,
    enableMutationObserver: true
  }
}
```

**What we DON'T store:**
- ❌ Personal information (name, email, etc.)
- ❌ Full page content or HTML
- ❌ Passwords or sensitive data
- ❌ Browsing history beyond what you explicitly analyze
- ❌ User identifiers or tracking data

**Privacy implications:**
- **Very low risk** - All data stored locally on your device
- Not synced to Chrome account or cloud
- Not shared with any servers
- Can be cleared at any time

**Data retention:**
- Stored until you clear extension data or uninstall
- History limited to last 50 detections (automatic cleanup)
- No indefinite data accumulation

**User control:**
- View stored data: Developer Tools → Application → Storage → Extension
- Clear data: Remove extension or clear browser data
- Export data: Use JSON/CSV export feature

**Alternative considered:**
- No storage - **Rejected** because:
  - Would require re-scanning every time popup opens
  - Poor user experience (slower, more resource-intensive)
  - No way to save user preferences
- `chrome.storage.sync` - **Rejected** because:
  - Unnecessary (no need to sync across devices)
  - More privacy concerns (data leaves device)

**Manifest V3 best practice:**
- ✅ Using `.local` instead of `.sync` for privacy
- ✅ Limiting data retention (50 items max)
- ✅ Storing only necessary data

---

## 🚫 Permissions We DON'T Request

### `<all_urls>` or broad host permissions

**Why we don't need it:**
- `activeTab` provides access to the current tab only
- No need to access all websites automatically
- Reduces privacy concerns and Chrome Web Store scrutiny

**If we requested it:**
- ❌ Would trigger privacy warnings in Chrome
- ❌ Would require extensive justification to Chrome Web Store
- ❌ Would make users (rightfully) suspicious
- ❌ Would violate principle of least privilege

---

### `tabs`

**Why we don't need it:**
- `activeTab` provides sufficient access
- `tabs` would allow reading URLs of all open tabs
- Unnecessary for our use case

**If we requested it:**
- ❌ Could access all tab URLs without user action
- ❌ Could track browsing activity
- ❌ Violates principle of least privilege

---

### `webRequest` or `webRequestBlocking`

**Why we don't need it:**
- We don't need to intercept or modify network requests
- Detection happens after page loads
- No need to analyze HTTP headers

**If we requested it:**
- ❌ Could intercept all network traffic
- ❌ Could modify requests/responses
- ❌ Significant performance impact
- ❌ Major privacy concerns

---

### `cookies`

**Why we don't need it:**
- `activeTab` already provides access to cookies via `document.cookie`
- No need for broader cookie access

**If we requested it:**
- ❌ Could access cookies from all sites
- ❌ Could modify cookies
- ❌ Privacy concerns

---

### `history`

**Why we don't need it:**
- We only analyze pages you explicitly select
- No need to access browsing history

**If we requested it:**
- ❌ Could read entire browsing history
- ❌ Major privacy violation
- ❌ Completely unnecessary for our functionality

---

### `geolocation`, `notifications`, `clipboardWrite`, etc.

**Why we don't need them:**
- Not relevant to technology detection
- Would be red flags for users and Chrome Web Store

---

## 🔒 Security Considerations

### Content Security Policy

```json
{
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'"
  }
}
```

**What this means:**
- Extension pages can only load scripts from the extension itself
- No inline scripts allowed
- No external scripts loaded
- Prevents XSS attacks

### No Remote Code Execution

- All code is bundled with the extension
- No `eval()` or `Function()` constructor
- No loading scripts from CDNs
- No dynamic code generation

### No External Network Requests

- No API calls to external servers
- No analytics or tracking requests
- No data exfiltration
- All processing happens locally

---

## 📊 Permission Comparison

| Permission | StackScope | Typical "Spy" Extension | Why We're Different |
|------------|------------|-------------------------|---------------------|
| `activeTab` | ✅ Yes | ✅ Yes | Only when you click icon |
| `scripting` | ✅ Yes | ✅ Yes | Read-only detection |
| `storage` | ✅ Yes | ✅ Yes | Local only, no sync |
| `<all_urls>` | ❌ No | ✅ Yes | We don't need it |
| `tabs` | ❌ No | ✅ Yes | We use activeTab instead |
| `webRequest` | ❌ No | ✅ Yes | We don't intercept traffic |
| `cookies` | ❌ No | ✅ Yes | activeTab provides access |
| `history` | ❌ No | ✅ Yes | We don't track browsing |

---

## 🎯 Principle of Least Privilege

StackScope follows the **principle of least privilege**:

1. **Request minimum permissions** needed for functionality
2. **Use most restrictive permission** that works (`activeTab` instead of `tabs`)
3. **No "just in case" permissions** - only what we actually use
4. **User control** - extension only works when you want it to
5. **Transparency** - this document explains everything

---

## 📝 For Chrome Web Store Reviewers

### Permission Justifications (Copy-Paste Ready)

**activeTab:**
```
Required to access the current tab's content when the user clicks the extension icon to detect technologies. Used to read page HTML, scripts, meta tags, and JavaScript globals for technology fingerprinting. Only accesses the active tab, only when the user triggers detection.
```

**scripting:**
```
Required to inject the detection script (detector.js) into the page to analyze JavaScript globals, DOM structure, and page resources. Script is read-only and does not modify page content or behavior. Only injected when user clicks "Detect" button.
```

**storage:**
```
Required to cache detection results locally for faster display and to store user preferences (UI settings). All data stored using chrome.storage.local (device-only, not synced). Stores: last detection results, detection history (last 50), and user settings. No personal information collected.
```

### Single Purpose Statement

```
Detect and display web technologies (frameworks, libraries, CMS, analytics, etc.) used on websites by analyzing page content locally in the browser when the user triggers detection.
```

---

## 🔄 Future Permission Considerations

If we add new features, we may need additional permissions:

### Optional: `contextMenus`
- **Purpose**: Add "Detect Technologies" to right-click menu
- **Risk**: Low - only adds menu item
- **Decision**: May add in future version

### Optional: `notifications`
- **Purpose**: Show notification when detection completes
- **Risk**: Low - only shows notifications
- **Decision**: May add if users request it

### Will NEVER request:
- `<all_urls>` - Too broad, unnecessary
- `webRequest` - Privacy invasive, unnecessary
- `history` - Privacy invasive, unnecessary
- `tabs` - activeTab is sufficient
- `cookies` - activeTab provides access
- `geolocation` - Completely irrelevant

---

## 📧 Questions?

If you have questions about any permission:

- **Users**: Open an issue on [GitHub](https://github.com/yourusername/stackscope/issues)
- **Chrome Web Store Reviewers**: Contact via developer dashboard
- **Security Researchers**: Email your.email@example.com

---

## ✅ Summary

**StackScope requests 3 permissions:**
1. ✅ `activeTab` - Access current tab when you click icon
2. ✅ `scripting` - Inject detection script
3. ✅ `storage` - Cache results locally

**StackScope does NOT request:**
- ❌ `<all_urls>` - Too broad
- ❌ `tabs` - activeTab is sufficient
- ❌ `webRequest` - Unnecessary
- ❌ `cookies` - activeTab provides access
- ❌ `history` - Privacy invasive
- ❌ Any other permissions

**Privacy guarantees:**
- 🔒 All processing happens locally
- 🔒 No data sent to external servers
- 🔒 No tracking or analytics
- 🔒 No background monitoring
- 🔒 User control (on-demand only)

This is the **minimum set of permissions** needed for StackScope to function, following Chrome's principle of least privilege and best practices for Manifest V3 extensions.
