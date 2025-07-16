# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## User Preferences

**Language**: Always respond in Simplified Chinese (简体中文) unless explicitly asked to use another language.

## Project Overview

SimpTab is a minimalist Chrome extension that replaces the default new tab page with a clean, customizable interface featuring beautiful background images and useful shortcuts. The extension is built with vanilla JavaScript using RequireJS for module management and Grunt for build automation.

## Development Commands

### Build and Development
- `npm run publish` - Build production version using Grunt (creates `dest-extension/` directory)
- `grunt dev` - Start development mode with file watching and automatic JSHint linting
- `grunt publish` - Full production build (clean, copy, minify HTML, optimize JS/CSS)
- `npm run update` - 标准插件更新流程 (编译 + 手动重载插件)
- `npm run update-auto` - 自动化插件更新流程 (编译 + 自动化提示)

### Code Quality
- `grunt jshint` - Run JSHint on all JavaScript files
- Files are automatically linted during development watch mode

## Architecture Overview

### Core Structure
- **RequireJS Module System**: All JavaScript modules are managed via RequireJS with configuration in `js/main.js`
- **Grunt Build System**: Uses Grunt for task automation, minification, and packaging
- **Chrome Extension V3**: Manifest V3 structure with new tab override functionality (migrated from V2)

### Key Directories
- `js/` - All JavaScript modules and application logic
- `assets/` - Static assets (images, CSS)
- `_locales/` - Internationalization files (zh_CN, zh_TW, en)
- `vender/` - Third-party libraries (jQuery, Lodash, etc.)
- `dest-extension/` - Build output directory for production

### Module Dependencies
Core modules include:
- `background.js` - Background image management and API integrations
- `controlbar.js` - Main control bar functionality
- `setting.js` - User preferences and configuration
- `topsites.js` - Chrome top sites integration
- `bookmarks.js` - Bookmark management
- `i18n.js` - Internationalization support

### Build Process
The Grunt build process:
1. Cleans previous builds (`dest-extension/`)
2. Copies assets and required files
3. Minifies HTML content
4. Optimizes and uglifies JavaScript (removes console.log)
5. Optimizes CSS files
6. Renames `manifest-v3.json` to `manifest.json` in build output

### Chrome Extension Features
- **New Tab Override**: Replaces default Chrome new tab
- **Keyboard Shortcuts**: Alt+Shift+1-4 for various functions
- **Optional Permissions**: Bookmarks, downloads, various image APIs
- **Omnibox Integration**: "st" keyword for search
- **Background Sources**: Bing, Unsplash, Wallhaven, and custom sources

## Key Configuration Files

### RequireJS Configuration
Located in `js/main.js` - defines all module paths and dependencies. When adding new modules, update both the paths and shim configuration.

### Grunt Configuration
Located in `gruntfile.js` - defines build tasks, file copying patterns, and optimization settings.

### Manifest Configuration
The extension uses Manifest V3 format:
- `manifest-v3.json` - Source manifest file (V3 format)
- `manifest-v2.json` - Legacy V2 format (kept for reference)
- During build, `manifest-v3.json` is renamed to `manifest.json` in the output directory
- Includes permissions, shortcuts, host permissions, and CSP configuration

## Development Notes

### Adding New Features
1. Create new module in `js/` directory
2. Add module path to `js/main.js` RequireJS config
3. Include in Grunt build if needed (`gruntfile.js`)
4. Update manifest permissions if required (`manifest-v3.json`)
5. For build optimization, update the `include` array in `gruntfile.js` requirejs task

### Image Sources and APIs
The extension integrates with multiple image APIs. API configurations are handled in `js/apis.js` and `js/cdns.js`.

### Internationalization
All user-facing strings use Chrome i18n API. Message files are in `_locales/` for Chinese (simplified/traditional) and English.

### Testing
Run `grunt dev` for development with automatic linting. Always test changes in Chrome as a loaded unpacked extension before building.

### Manifest V3 Migration Notes
- The project has migrated from Manifest V2 to V3
- CSP restrictions are stricter in V3 - custom scripts using `unsafe-eval` have been removed
- Host permissions are now separate from regular permissions
- Build process automatically uses the V3 manifest format