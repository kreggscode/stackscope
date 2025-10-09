# Installation Guide - StackScope

This guide covers how to install and test StackScope locally before publishing to the Chrome Web Store.

## 📋 Prerequisites

- Google Chrome (or Chromium-based browser like Edge, Brave, Opera)
- Basic understanding of Chrome extensions

## 🚀 Quick Start (5 minutes)

### Step 1: Download the Extension

**Option A: Clone from GitHub**
```bash
git clone https://github.com/yourusername/stackscope.git
cd stackscope
```

**Option B: Download ZIP**
1. Download the repository as ZIP
2. Extract to a folder (e.g., `C:\Users\YourName\stackscope`)

### Step 2: Prepare Icons (Important!)

⚠️ **The extension includes placeholder icons.** For testing, they'll work, but you must replace them before publishing.

**For now (testing only):**
- The extension will work with the SVG placeholder
- Chrome may show a generic icon

**Before publishing:**
- Create PNG icons (16x16, 48x48, 128x128)
- See `/icons/README.md` for details

### Step 3: Load Extension in Chrome

1. **Open Chrome Extensions page**
   - Navigate to `chrome://extensions/`
   - Or: Menu (⋮) → Extensions → Manage Extensions

2. **Enable Developer Mode**
   - Toggle "Developer mode" switch in the top-right corner
   - This reveals additional options

3. **Load Unpacked Extension**
   - Click "Load unpacked" button
   - Browse to the extension directory (where `manifest.json` is located)
   - Click "Select Folder"

4. **Verify Installation**
   - StackScope should appear in your extensions list
   - You should see the extension icon in your toolbar
   - If not visible, click the puzzle piece icon and pin StackScope

### Step 4: Test the Extension

1. **Navigate to a test website**
   - Try: `https://react.dev` (should detect React)
   - Try: `https://wordpress.org` (should detect WordPress)
   - Try: `https://github.com` (should detect various technologies)

2. **Click the StackScope icon** in your toolbar

3. **Click "Detect"** button

4. **View results**
   - You should see detected technologies
   - Confidence scores
   - Evidence for each detection

5. **Test export features**
   - Click "JSON" to export as JSON
   - Click "CSV" to export as CSV
   - Click "Copy" to copy to clipboard

## 🔧 Troubleshooting

### Extension doesn't appear after loading

**Problem:** Extension not visible in toolbar

**Solutions:**
1. Click the puzzle piece icon (🧩) in Chrome toolbar
2. Find StackScope in the list
3. Click the pin icon to pin it to toolbar

### "Manifest file is missing or unreadable" error

**Problem:** Chrome can't find or read manifest.json

**Solutions:**
1. Ensure you selected the correct folder (containing manifest.json)
2. Check that manifest.json is valid JSON (no syntax errors)
3. Verify file permissions (file should be readable)

### "Could not load icon" error

**Problem:** Icon files are missing

**Solutions:**
1. Ensure `/icons/` directory exists
2. Create placeholder PNG files (see below)
3. Or update manifest.json to remove icon references temporarily

**Quick fix - Create placeholder PNGs:**
```bash
# On Windows with ImageMagick installed:
magick -size 16x16 xc:#4F46E5 icons/icon16.png
magick -size 48x48 xc:#4F46E5 icons/icon48.png
magick -size 128x128 xc:#4F46E5 icons/icon128.png
```

### Detection doesn't work

**Problem:** Clicking "Detect" shows error or no results

**Solutions:**
1. Check browser console for errors:
   - Right-click extension icon → "Inspect popup"
   - Check Console tab for errors
2. Ensure you're not on a `chrome://` page (extensions can't access these)
3. Try a different website
4. Reload the extension:
   - Go to `chrome://extensions/`
   - Click refresh icon (🔄) on StackScope card

### "Service worker registration failed" error

**Problem:** Background script won't load

**Solutions:**
1. Check `background.js` for syntax errors
2. Ensure `background.js` exists in the extension directory
3. Check browser console in extension page for details
4. Try removing and re-adding the extension

### Popup doesn't open

**Problem:** Clicking icon does nothing

**Solutions:**
1. Check that `popup.html` exists
2. Right-click icon → "Inspect popup" to see errors
3. Check browser console for CSP violations
4. Verify `popup.js` has no syntax errors

## 🔍 Debugging

### View Extension Logs

**Background Service Worker:**
1. Go to `chrome://extensions/`
2. Find StackScope
3. Click "service worker" link (or "Inspect views: service worker")
4. Check Console tab

**Popup:**
1. Click StackScope icon to open popup
2. Right-click inside popup → "Inspect"
3. Check Console tab

**Injected Script (detector.js):**
1. Open website you're analyzing
2. Open DevTools (F12)
3. Check Console tab for `[StackScope]` messages

### Common Console Messages

**Normal (expected):**
```
[StackScope] Background service worker initialized
[StackScope] Detector loaded and ready
[StackScope] Starting detection with 80 fingerprints
[StackScope] Detection complete. Found X technologies
```

**Errors to investigate:**
```
[StackScope] Failed to inject detector script
[StackScope] Detection error: ...
[StackScope] Failed to load fingerprints: ...
```

## 📝 Development Workflow

### Making Changes

1. **Edit files** in your code editor

2. **Reload extension** in Chrome:
   - Go to `chrome://extensions/`
   - Click refresh icon (🔄) on StackScope
   - Or use keyboard shortcut (varies by OS)

3. **Test changes**:
   - Close and reopen popup (if you changed popup files)
   - Reload website (if you changed detector)
   - Check console for errors

### Testing on Different Sites

Create a test list of websites with known technologies:

```
React:
- https://react.dev
- https://facebook.com
- https://netflix.com

Vue.js:
- https://vuejs.org
- https://gitlab.com

WordPress:
- https://wordpress.org
- https://techcrunch.com

Shopify:
- https://www.shopify.com
- https://www.allbirds.com

Multiple technologies:
- https://github.com (many techs)
- https://stackoverflow.com (many techs)
```

### Adding New Fingerprints

1. Open `fingerprints.json`
2. Add new technology object:
```json
{
  "name": "NewTech",
  "categories": ["Category"],
  "confidence": 90,
  "matchers": {
    "js_globals": ["NewTechGlobal"],
    "script_src": ["newtech.js"]
  }
}
```
3. Save file
4. Reload extension
5. Test on a page using that technology

## 🎨 Customizing

### Change Extension Name

1. Edit `manifest.json`:
```json
{
  "name": "YourCustomName",
  "description": "Your custom description"
}
```
2. Reload extension

### Change Colors/Styling

1. Edit `popup.css`
2. Modify CSS variables at the top:
```css
:root {
  --primary-color: #4f46e5;  /* Change this */
  --primary-hover: #4338ca;
  /* ... */
}
```
3. Reload extension and reopen popup

### Modify Detection Logic

1. Edit `detector.js`
2. Modify detection methods
3. Reload extension
4. Test thoroughly

## 📦 Preparing for Production

Before publishing to Chrome Web Store:

- [ ] Replace placeholder icons with unique PNG icons
- [ ] Update `manifest.json` with your info:
  - [ ] `author`
  - [ ] `homepage_url`
- [ ] Test on multiple websites
- [ ] Check for console errors
- [ ] Review privacy policy
- [ ] Create screenshots for store listing
- [ ] Follow checklist in `packaging.md`

## 🆘 Getting Help

If you encounter issues:

1. **Check documentation:**
   - README.md
   - packaging.md
   - manifest_permissions_rationale.md

2. **Search for error messages:**
   - Google the exact error message
   - Check Stack Overflow

3. **Ask for help:**
   - GitHub Issues: [your-repo-url]
   - Reddit: r/chrome, r/webdev
   - Stack Overflow: Tag `google-chrome-extension`

4. **Official resources:**
   - [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
   - [Manifest V3 Migration](https://developer.chrome.com/docs/extensions/mv3/intro/)

## ✅ Installation Checklist

- [ ] Chrome installed and updated
- [ ] Extension files downloaded/cloned
- [ ] Developer mode enabled in Chrome
- [ ] Extension loaded via "Load unpacked"
- [ ] Extension icon visible in toolbar (or pinned)
- [ ] Tested on at least 3 different websites
- [ ] Detection works correctly
- [ ] Export features work (JSON, CSV, Copy)
- [ ] No console errors
- [ ] Ready to customize or publish

---

**Congratulations!** 🎉 You've successfully installed StackScope. Now you can use it to analyze websites or customize it for your needs.

For publishing to Chrome Web Store, see `packaging.md`.
