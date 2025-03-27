# Branch Name Builder Chrome Extension

![Image](https://github.com/user-attachments/assets/d338d306-2e82-4b26-a742-234f44fcd6ee)

A Chrome extension that helps developers create consistent and standardized branch names for their Git repositories. This tool streamlines the development workflow by automatically generating branch names based on ticket information.

## Features

- 🎯 Generates standardized branch names
- 📋 Easy copy-to-clipboard functionality
- 🎨 Clean and intuitive user interface
- 🔄 Supports multiple ticket types (feature, bugfix, task, etc.)
- 💾 Automatic commit message generation

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/branch-name-builder-chrome-extension.git
   cd branch-name-builder-chrome-extension
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the extension directory

## Usage

1. Click the extension icon in your Chrome toolbar
2. Select the ticket type from the dropdown
3. Enter your ticket number (e.g., WEB-1234)
4. Input the ticket title
5. Click "Copy" to copy the generated branch name to your clipboard

## Project Structure

```
branch-name-builder/
├── assets/
│   └── fonts/          # Font files
├── css/
│   └── style.css      # Styles and theme
├── js/
│   └── popup.js       # Main extension logic
├── manifest.json      # Extension configuration
└── index.html        # Popup interface
```

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Chrome Extension APIs

## Development

### Prerequisites

- Google Chrome Browser
- Basic knowledge of HTML, CSS, and JavaScript
- Git

### Local Development

1. Make your changes to the source code
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension
4. Test your changes

### Coding Standards

- Use consistent indentation (2 spaces)
- Follow alphabetical ordering for CSS properties
- Keep functions small and focused
- Add comments for complex logic

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Pull Request Process

1. Ensure your code follows the coding standards
2. Update the README.md with details of changes if applicable
3. The PR will be merged once you have the sign-off of at least one maintainer

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Support

If you encounter any problems or have suggestions, please [open an issue](https://github.com/yourusername/branch-name-builder-chrome-extension/issues).