# Contributing to StackScope

Thank you for your interest in contributing to StackScope! This document provides guidelines and instructions for contributing.

## 🎯 Ways to Contribute

### 1. Add Technology Fingerprints

The most valuable contribution is adding detection fingerprints for new technologies.

**What we need:**
- Popular frameworks, libraries, CMS platforms
- Analytics tools, CDNs, hosting providers
- Developer tools, build systems
- Any web technology that can be detected

**How to add:**
1. Open `fingerprints.json`
2. Add a new technology object (see format below)
3. Test on a real website using that technology
4. Submit a pull request

**Fingerprint format:**
```json
{
  "name": "Technology Name",
  "categories": ["Category1", "Category2"],
  "confidence": 90,
  "matchers": {
    "js_globals": ["GlobalVariable", "AnotherGlobal"],
    "script_src": ["technology.js", "cdn.example.com/tech"],
    "meta": {
      "generator": ["Technology Name"],
      "application-name": ["Technology"]
    },
    "link_href": ["technology.css"],
    "cookies": ["tech_session", "tech_id"],
    "html_regex": ["data-tech-", "tech-component"]
  }
}
```

**Matcher types:**
- `js_globals`: JavaScript global variables (e.g., `window.React`)
- `script_src`: Script source URLs or patterns
- `meta`: Meta tag name/content pairs
- `link_href`: Stylesheet or resource link URLs
- `cookies`: Cookie names
- `html_regex`: HTML patterns (use sparingly for performance)

**Categories:**
- JavaScript Frameworks
- JavaScript Libraries
- UI Frameworks
- CMS
- E-commerce
- Analytics
- Tag Managers
- CDN
- Security
- Hosting
- Web Servers
- Web Frameworks
- Build Tools
- Static Site Generators
- Payment Processors
- Live Chat
- Email Marketing
- Social Sharing
- Comment Systems
- Font Scripts
- Error Tracking
- Performance Monitoring
- A/B Testing
- SEO
- Page Builders
- Website Builders
- Backend Services

### 2. Improve Detection Logic

Enhance the detection algorithms in `detector.js`:
- Better pattern matching
- Performance optimizations
- Support for dynamic/SPA detection
- Reduce false positives

### 3. UI/UX Improvements

Enhance the popup interface:
- Better visualization of results
- Additional export formats
- Improved filtering/sorting
- Dark mode support
- Accessibility improvements

### 4. Documentation

Improve documentation:
- Fix typos or unclear instructions
- Add examples
- Translate to other languages
- Create video tutorials
- Write blog posts

### 5. Bug Fixes

Found a bug? Please:
1. Check if it's already reported in Issues
2. Create a new issue with reproduction steps
3. Submit a pull request with a fix

### 6. Feature Requests

Have an idea? Please:
1. Check existing issues for similar requests
2. Create a new issue describing the feature
3. Explain the use case and benefits
4. Be open to discussion

## 🚀 Getting Started

### Prerequisites

- Git installed
- Google Chrome
- Code editor (VS Code, Sublime, etc.)
- Basic knowledge of JavaScript and Chrome extensions

### Setup Development Environment

1. **Fork the repository**
   - Click "Fork" button on GitHub
   - Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/stackscope.git
   cd stackscope
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

3. **Load extension in Chrome**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `stackscope` directory

4. **Make your changes**
   - Edit files in your code editor
   - Reload extension in Chrome after changes
   - Test thoroughly

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: Description of your changes"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Describe your changes
   - Submit!

## 📝 Coding Guidelines

### JavaScript Style

- Use ES6+ features (const/let, arrow functions, etc.)
- Use semicolons
- Use single quotes for strings
- 2-space indentation
- Descriptive variable names
- Add comments for complex logic

**Example:**
```javascript
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
```

### CSS Style

- Use CSS variables for colors/spacing
- Mobile-first approach
- Consistent naming (kebab-case)
- Group related properties
- Add comments for sections

### HTML Style

- Semantic HTML5 elements
- Accessible markup (ARIA labels where needed)
- Consistent indentation
- Self-closing tags for void elements

### Commit Messages

Use conventional commit format:

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat: Add detection for Tailwind CSS

fix: Resolve issue with React detection on SPAs

docs: Update installation instructions

refactor: Improve confidence calculation algorithm
```

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] Extension loads without errors
- [ ] Detection works on multiple websites
- [ ] No console errors or warnings
- [ ] UI displays correctly
- [ ] Export features work (JSON, CSV, Copy)
- [ ] Changes don't break existing functionality
- [ ] Performance is acceptable (no lag)

### Test Websites

Test your changes on these sites:

**React:**
- https://react.dev
- https://facebook.com

**Vue.js:**
- https://vuejs.org
- https://gitlab.com

**WordPress:**
- https://wordpress.org
- https://techcrunch.com

**Multiple technologies:**
- https://github.com
- https://stackoverflow.com

### Adding New Fingerprints

When adding fingerprints:

1. **Find a live website** using the technology
2. **Verify detection** works correctly
3. **Check for false positives** on other sites
4. **Document the test site** in your PR

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tested manually on multiple sites
- [ ] No console errors
- [ ] Commit messages are clear
- [ ] Branch is up to date with main

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
Describe how you tested this:
- Test 1
- Test 2

## Screenshots (if applicable)
Add screenshots showing the changes

## Related Issues
Closes #123
```

### Review Process

1. Maintainer will review your PR
2. May request changes or ask questions
3. Once approved, PR will be merged
4. Your contribution will be credited!

## 🐛 Reporting Bugs

### Before Reporting

1. **Search existing issues** - bug may already be reported
2. **Test on latest version** - bug may be fixed
3. **Reproduce consistently** - ensure it's not a one-time issue

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: Chrome 120.0.6099.109
- OS: Windows 11
- Extension Version: 1.0.0

## Screenshots
Add screenshots if applicable

## Console Errors
Paste any console errors

## Additional Context
Any other relevant information
```

## 💡 Feature Requests

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Use Case
Why is this feature needed? What problem does it solve?

## Proposed Solution
How should this feature work?

## Alternatives Considered
Other ways to solve this problem

## Additional Context
Mockups, examples, etc.
```

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Mentioned in README (for significant contributions)

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Our Standards

**Positive behavior:**
- Being respectful and inclusive
- Accepting constructive criticism
- Focusing on what's best for the project
- Showing empathy towards others

**Unacceptable behavior:**
- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report violations to: your.email@example.com

## 📞 Questions?

- **General questions**: Open a GitHub Discussion
- **Bug reports**: Open a GitHub Issue
- **Security issues**: Email your.email@example.com (do not open public issue)
- **Feature ideas**: Open a GitHub Issue with "Feature Request" label

## 📚 Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [JavaScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

## 🙏 Thank You!

Every contribution, no matter how small, helps make StackScope better. Thank you for taking the time to contribute!

---

**Happy coding!** 🚀
