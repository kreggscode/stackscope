# StackScope - Quick Start Guide

Get up and running in **5 minutes**! 🚀

## 📥 Step 1: Load Extension (2 minutes)

1. **Open Chrome Extensions**
   - Type `chrome://extensions/` in address bar
   - Or: Menu (⋮) → Extensions → Manage Extensions

2. **Enable Developer Mode**
   - Toggle switch in top-right corner

3. **Load Extension**
   - Click "Load unpacked"
   - Select the `TechFinder` folder (where `manifest.json` is)
   - Click "Select Folder"

4. **Pin Extension**
   - Click puzzle icon (🧩) in Chrome toolbar
   - Find "StackScope"
   - Click pin icon to keep it visible

✅ **Done!** StackScope icon should now be in your toolbar.

---

## 🧪 Step 2: Test It (2 minutes)

1. **Visit a test website**
   - Try: https://react.dev (should detect React)
   - Or: https://wordpress.org (should detect WordPress)

2. **Click StackScope icon** in toolbar

3. **Click "Detect" button**

4. **View results!**
   - See detected technologies
   - Confidence scores
   - Evidence for each detection

5. **Try export features**
   - Click "JSON" to download JSON
   - Click "CSV" to download CSV
   - Click "Copy" to copy to clipboard

✅ **Works?** Great! You're ready to use it.

---

## 🎨 Step 3: Customize (Optional, 1 minute)

### Change Extension Name

Edit `manifest.json`:
```json
{
  "name": "Your Custom Name"
}
```

### Change Colors

Edit `popup.css` line 13:
```css
--primary-color: #4f46e5;  /* Change to your color */
```

### Add More Technologies

Edit `fingerprints.json` - add new technology objects.

After changes: Reload extension in `chrome://extensions/`

---

## 📦 Ready to Publish? (Before Chrome Web Store)

### Critical: Replace Icons ⚠️

**You MUST create real icons before publishing!**

1. Create PNG files:
   - `icons/icon16.png` (16×16)
   - `icons/icon48.png` (48×48)
   - `icons/icon128.png` (128×128)

2. Use unique, original artwork (not copied)

3. See `icons/README.md` for design guidelines

### Update Your Info

Edit `manifest.json`:
```json
{
  "author": "Your Name",
  "homepage_url": "https://github.com/yourusername/stackscope"
}
```

### Build Distribution ZIP

**Windows PowerShell:**
```powershell
.\build.ps1
```

**Manual:**
```bash
# Zip these files:
manifest.json
background.js
detector.js
fingerprints.json
popup.html, popup.css, popup.js
privacy_policy.html
icons/
LICENSE
README.md
```

### Follow Publishing Guide

📖 **Read `packaging.md`** for complete Chrome Web Store publishing instructions.

**Key requirements:**
- ✅ Unique icons (PNG)
- ✅ Privacy policy URL
- ✅ Screenshots (1280×800)
- ✅ Store listing text
- ✅ Chrome Web Store developer account ($5 one-time fee)

---

## 🐛 Troubleshooting

### Extension doesn't load
- Check that you selected the correct folder (containing `manifest.json`)
- Look for errors in `chrome://extensions/`

### Icon not visible in toolbar
- Click puzzle icon (🧩)
- Pin StackScope

### Detection doesn't work
- Right-click icon → "Inspect popup"
- Check Console for errors
- Try a different website (not `chrome://` pages)

### Need help?
- Read `INSTALLATION.md` for detailed troubleshooting
- Check `README.md` for full documentation
- Open GitHub issue

---

## 📚 Full Documentation

- **README.md** - Complete project documentation
- **INSTALLATION.md** - Detailed installation guide
- **packaging.md** - Chrome Web Store publishing guide
- **PROJECT_SUMMARY.md** - Project overview
- **CONTRIBUTING.md** - How to contribute

---

## ✅ Quick Checklist

**For local use:**
- [ ] Extension loaded in Chrome
- [ ] Icon visible in toolbar
- [ ] Tested on 2-3 websites
- [ ] Detection works correctly

**Before publishing:**
- [ ] Icons replaced (PNG files)
- [ ] `manifest.json` updated (author, homepage_url)
- [ ] Privacy policy hosted
- [ ] Screenshots created
- [ ] Read `packaging.md`
- [ ] Distribution ZIP built

---

## 🎉 That's It!

You now have a working technology detector extension!

**What's next?**
- Use it to analyze websites
- Customize it for your needs
- Add more technology fingerprints
- Publish to Chrome Web Store
- Share with others

**Questions?** Check the documentation or open a GitHub issue.

**Happy detecting!** 🔍
