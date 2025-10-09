# Chrome Web Store Publishing Guide

This guide covers everything you need to publish StackScope to the Chrome Web Store and **avoid suspension or removal**.

## 📋 Pre-Publishing Checklist

### 1. Code & Functionality

- [ ] Extension works correctly in Chrome
- [ ] No console errors or warnings
- [ ] All features tested on multiple websites
- [ ] Manifest V3 compliance verified
- [ ] No deprecated APIs used
- [ ] Service worker handles termination gracefully
- [ ] Error handling for all edge cases
- [ ] Performance optimized (no lag or freezing)

### 2. Permissions & Privacy

- [ ] **Minimal permissions only** (activeTab, scripting, storage)
- [ ] No `<all_urls>` host permissions
- [ ] No broad host permissions unless absolutely necessary
- [ ] Privacy policy created and hosted
- [ ] No data sent to external servers by default
- [ ] No tracking or analytics (or clearly disclosed if present)
- [ ] Permissions rationale documented
- [ ] User consent for any data collection

### 3. Assets & Branding

- [ ] **Icons created** (16x16, 48x48, 128x128 PNG)
- [ ] Icons are unique (not copied from other extensions)
- [ ] **Screenshots prepared** (1280x800 or 640x400 PNG/JPEG)
  - At least 1 screenshot required
  - Recommended: 3-5 screenshots showing key features
- [ ] **Promotional images** (optional but recommended):
  - Small tile: 440x280
  - Marquee: 1400x560
- [ ] Extension name is unique and not trademarked
- [ ] Description is clear and accurate

### 4. Documentation

- [ ] README.md complete
- [ ] Privacy policy (privacy.md) complete
- [ ] Privacy policy hosted at public URL
- [ ] LICENSE file included (MIT recommended)
- [ ] Contact email provided
- [ ] Support page/URL provided

### 5. Store Listing Content

- [ ] **Extension name** (max 45 characters)
- [ ] **Short description** (max 132 characters)
- [ ] **Detailed description** (max 16,000 characters)
- [ ] **Category** selected (e.g., "Developer Tools")
- [ ] **Language** set (default: English)
- [ ] **Privacy policy URL** provided
- [ ] **Support URL** provided (GitHub, website, etc.)
- [ ] **Version number** matches manifest.json

## 🚀 Publishing Steps

### Step 1: Create Developer Account

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Sign in with Google account
3. Pay **$5 one-time registration fee**
4. Accept Developer Agreement

### Step 2: Prepare Extension Package

1. **Update manifest.json**:
   ```json
   {
     "version": "1.0.0",
     "name": "StackScope",
     "description": "Detect web technologies...",
     "homepage_url": "https://github.com/yourusername/stackscope",
     "author": "Your Name"
   }
   ```

2. **Replace placeholder icons** in `icons/` directory
   - Use your own unique icons
   - PNG format, transparent background
   - Sizes: 16x16, 48x48, 128x128

3. **Create ZIP file**:
   ```bash
   # Include only necessary files
   zip -r stackscope-v1.0.0.zip \
     manifest.json \
     background.js \
     detector.js \
     fingerprints.json \
     popup.html \
     popup.css \
     popup.js \
     privacy_policy.html \
     icons/ \
     LICENSE \
     README.md
   ```

   **Do NOT include**:
   - `.git/` directory
   - `node_modules/`
   - `.DS_Store`
   - Development files
   - Source maps (unless needed)

### Step 3: Upload to Chrome Web Store

1. Go to [Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Click **"New Item"**
3. Upload ZIP file
4. Wait for upload and initial validation

### Step 4: Fill Out Store Listing

#### Product Details

**Extension Name**:
```
StackScope
```

**Summary** (132 chars max):
```
Detect web technologies, frameworks, CMS, analytics, and more on any website. Privacy-focused, local detection only.
```

**Description** (16,000 chars max):
```markdown
🔍 StackScope - Web Technology Detector

Instantly identify the technologies powering any website with StackScope, a privacy-focused Chrome extension that detects frameworks, libraries, CMS platforms, analytics tools, and more.

✨ KEY FEATURES

• Comprehensive Detection - Identifies 80+ technologies including:
  - JavaScript frameworks (React, Vue, Angular, Svelte, etc.)
  - CMS platforms (WordPress, Drupal, Joomla, Shopify)
  - E-commerce (WooCommerce, Magento, BigCommerce)
  - Analytics (Google Analytics, Mixpanel, Hotjar)
  - CDNs, hosting, and much more

• Privacy-First Design
  - All detection happens locally in your browser
  - No data sent to external servers
  - No tracking or analytics
  - Minimal permissions (activeTab, scripting, storage only)

• Modern Interface
  - Clean, intuitive UI
  - Confidence scores for each detection
  - Evidence display showing how technologies were detected
  - Export results to JSON or CSV
  - Sort and filter options

• High Performance
  - Optimized detection algorithms
  - No impact on browsing speed
  - Works on all websites

🔐 PRIVACY & SECURITY

StackScope is built with privacy as the top priority:
- No personal data collection
- No browsing history access
- No background tracking
- Open source code (auditable)
- Compliant with GDPR and CCPA

📖 HOW TO USE

1. Click the StackScope icon in your toolbar
2. Click "Detect" to analyze the current page
3. View detected technologies with confidence scores
4. Export results if needed

Perfect for developers, designers, marketers, and anyone curious about the technologies behind their favorite websites.

🆓 FREE & OPEN SOURCE

StackScope is completely free with no ads, no premium features, and no hidden costs. The source code is available on GitHub for transparency and community contributions.

📧 SUPPORT

Have questions or found a bug? Visit our GitHub repository or contact us at your.email@example.com
```

**Category**:
- Select: **Developer Tools** (or "Productivity" if it fits better)

**Language**:
- Select: **English** (or your primary language)

#### Privacy Practices

**Privacy Policy URL**:
```
https://github.com/yourusername/stackscope/blob/main/privacy.md
```
*(Or host privacy_policy.html on your own domain)*

**Single Purpose Description**:
```
Detect and display web technologies used on websites by analyzing page content locally in the browser.
```

**Permission Justifications**:

For each permission, explain why it's needed:

- **activeTab**:
  ```
  Required to access the current tab's content when the user clicks the extension icon to detect technologies.
  ```

- **scripting**:
  ```
  Required to inject the detection script into the page to analyze JavaScript globals, scripts, and page structure.
  ```

- **storage**:
  ```
  Required to cache detection results locally for faster display and to store user preferences.
  ```

**Data Usage Disclosure**:
- [ ] Check: "This extension does NOT collect user data"
- Or if you add analytics later:
  - [ ] Disclose what data is collected
  - [ ] Explain how it's used
  - [ ] Confirm it's not sold to third parties

#### Store Assets

**Screenshots** (1280x800 or 640x400):
1. Main popup showing detection results
2. Technology details with evidence
3. Export options (JSON/CSV)
4. Example detection on popular site (e.g., GitHub)
5. Settings or about page (if applicable)

**Promotional Images** (optional):
- Small tile: 440x280 PNG
- Marquee: 1400x560 PNG

**Icon** (128x128):
- Upload your extension icon

#### Distribution

**Visibility**:
- [ ] **Public** (recommended for most extensions)
- [ ] Unlisted (only accessible via direct link)
- [ ] Private (only for specific users/groups)

**Regions**:
- [ ] All regions (recommended)
- Or select specific countries

**Pricing**:
- [ ] **Free** (recommended)

### Step 5: Submit for Review

1. Review all information
2. Click **"Submit for Review"**
3. Wait for Google's review (typically 1-3 business days, can be longer)

## ⚠️ Avoiding Suspension/Removal

### Common Reasons for Rejection

1. **Excessive Permissions**
   - ❌ Requesting `<all_urls>` without justification
   - ✅ Use `activeTab` instead

2. **Missing Privacy Policy**
   - ❌ No privacy policy URL
   - ✅ Host privacy policy and provide URL

3. **Deceptive Behavior**
   - ❌ Extension does something not described
   - ✅ Clear, accurate description

4. **Data Collection Without Disclosure**
   - ❌ Sending data to servers without telling users
   - ✅ Disclose all data collection, make it opt-in

5. **Trademark Infringement**
   - ❌ Using brand names in extension name/icon
   - ✅ Use unique, original branding

6. **Malicious Code**
   - ❌ Obfuscated code, hidden functionality
   - ✅ Clean, readable code

7. **Spam/Low Quality**
   - ❌ Duplicate functionality, poor UX
   - ✅ Unique value, polished experience

### Best Practices for Compliance

#### 1. Minimal Permissions

```json
{
  "permissions": [
    "activeTab",    // ✅ Only active tab
    "scripting",    // ✅ Necessary for injection
    "storage"       // ✅ Local storage only
  ],
  "host_permissions": []  // ✅ No broad host access
}
```

**Avoid**:
- `<all_urls>`
- `tabs` (use `activeTab` instead)
- `webRequest` (unless absolutely necessary)
- `cookies` (unless absolutely necessary)

#### 2. Clear Privacy Policy

Host your privacy policy at a public URL:
- GitHub: `https://github.com/yourusername/stackscope/blob/main/privacy.md`
- Your website: `https://yourwebsite.com/stackscope/privacy`
- GitHub Pages: `https://yourusername.github.io/stackscope/privacy.html`

Include:
- What data is accessed
- How data is used
- Whether data is shared
- User rights (access, deletion)
- Contact information

#### 3. Transparent Data Handling

**If you collect ANY data**:
1. Disclose it clearly in store listing
2. Make it opt-in (not opt-out)
3. Show users exactly what will be collected
4. Provide easy way to disable
5. Allow data deletion

**For StackScope (current version)**:
- No data collection → State this clearly
- All processing local → Emphasize this

#### 4. Accurate Description

**Do**:
- Describe all features accurately
- Explain permissions clearly
- Set correct expectations
- Use clear, professional language

**Don't**:
- Exaggerate capabilities
- Hide functionality
- Use misleading screenshots
- Make false claims

#### 5. Quality & Polish

- Test thoroughly before submitting
- Fix all bugs and console errors
- Ensure good performance
- Provide good user experience
- Include helpful documentation

#### 6. Responsive Support

- Provide valid contact email
- Respond to user reviews
- Fix reported bugs promptly
- Update extension regularly

## 🔄 Updates & Maintenance

### Updating Your Extension

1. Increment version in `manifest.json`:
   ```json
   {
     "version": "1.0.1"  // Semantic versioning
   }
   ```

2. Create new ZIP file

3. Go to Developer Dashboard → Your Extension → "Package"

4. Upload new ZIP

5. Click "Submit for Review"

**Update Review**:
- Usually faster than initial review
- May be auto-approved for minor changes
- Major changes may require full review

### Version Numbering

Use [Semantic Versioning](https://semver.org/):
- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features
- **Patch** (1.0.0 → 1.0.1): Bug fixes

## 📊 Post-Launch

### Monitor Performance

- Check Developer Dashboard for:
  - Install count
  - User reviews
  - Crash reports
  - Uninstall rate

### Respond to Reviews

- Thank users for positive reviews
- Address concerns in negative reviews
- Fix reported bugs
- Consider feature requests

### Promote Your Extension

- Share on social media
- Post on Reddit (r/chrome, r/webdev)
- Write blog post
- Add to your portfolio
- Submit to extension directories

## 🆘 If Your Extension is Rejected

1. **Read the rejection email carefully**
   - Google will explain the reason

2. **Fix the issue**
   - Address all points mentioned
   - Don't try to circumvent policies

3. **Update documentation**
   - Clarify in description if needed
   - Update privacy policy

4. **Resubmit**
   - Explain changes in submission notes

5. **Appeal if necessary**
   - If you believe rejection was in error
   - Provide clear explanation

## 📞 Support & Resources

### Official Resources

- [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- [Developer Program Policies](https://developer.chrome.com/docs/webstore/program-policies/)
- [Manifest V3 Documentation](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Extension Publishing Guide](https://developer.chrome.com/docs/webstore/publish/)

### Community

- [Chromium Extensions Google Group](https://groups.google.com/a/chromium.org/g/chromium-extensions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-chrome-extension)
- [Reddit r/chrome](https://www.reddit.com/r/chrome/)

## ✅ Final Checklist

Before clicking "Submit for Review":

- [ ] Extension fully tested and working
- [ ] Minimal permissions only
- [ ] Privacy policy hosted and URL provided
- [ ] All store listing fields filled out
- [ ] Screenshots uploaded (3-5 recommended)
- [ ] Icons are unique and professional
- [ ] Description is clear and accurate
- [ ] Contact email provided
- [ ] Support URL provided
- [ ] Version number correct
- [ ] ZIP file contains only necessary files
- [ ] No console errors or warnings
- [ ] Code is clean and readable
- [ ] README and documentation complete

---

**Good luck with your submission! 🚀**

If you follow this guide and maintain transparency with users, your extension should have a smooth approval process and long, successful life on the Chrome Web Store.
