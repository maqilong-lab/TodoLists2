# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NEXUS TASK is a cyberpunk-themed task management system built as a single-page application. It's a pure frontend project with no backend dependencies, featuring a modern UI with neon effects and comprehensive task management capabilities.

## Development Commands

Since this is a static frontend project, there are no build or compilation steps required:

```bash
# Serve the application locally (choose one)
npx serve .
python -m http.server 8000
php -S localhost:8000

# Open the main application file directly in browser
# File: nexus-task-3.0.html
```

## Code Architecture

### Core Structure
- **Single HTML file application**: All functionality is contained in `nexus-task-3.0.html`
- **No external build process**: Uses CDN-hosted dependencies (Tailwind CSS, Chart.js, SortableJS)
- **Pure JavaScript**: No frameworks, vanilla JS with modern ES6+ features

### Key Components
1. **UI Framework**: Tailwind CSS with custom cyberpunk theme
2. **Drag & Drop**: SortableJS for task reordering
3. **Charts**: Chart.js for analytics dashboard
4. **Icons**: Font Awesome icon library
5. **Typography**: Orbitron font from Google Fonts

### Data Management
- **Local Storage**: All task data persists in browser localStorage
- **No API calls**: Completely client-side operation
- **Real-time updates**: UI updates immediately on user interactions

### File Organization
```
TodoLists2/
├── nexus-task-3.0.html     # Main HTML structure
├── styles.css              # Cyberpunk theme styles
├── app.js                  # Application logic
├── .gitignore              # Git configuration
├── README.md               # Chinese documentation
├── CLAUDE.md               # Development guidelines
└── commands/               # Helper scripts
    └── fix-github-issue.md # GitHub issue resolution guide
```

## Technology Stack

- **HTML5**: Semantic markup with modern structure
- **Tailwind CSS**: Utility-first CSS with custom cyberpunk theme
- **Vanilla JavaScript**: ES6+ features, no build step required
- **SortableJS**: Drag-and-drop functionality
- **Chart.js**: Analytics and statistics visualization
- **Local Storage**: Data persistence

## Key Features Implementation

1. **Task Management**: CRUD operations for tasks with priority and categories
2. **Drag & Drop**: Task reordering using SortableJS
3. **Analytics**: Charts showing task completion statistics
4. **Responsive Design**: Mobile-friendly layout with Tailwind
5. **Theme System**: Cyberpunk color scheme with neon effects
6. **Data Persistence**: Automatic localStorage saving

## Development Guidelines

- All changes should maintain the single-file architecture
- Use CDN-hosted libraries only (no npm packages)
- Preserve the cyberpunk aesthetic and neon visual effects
- Ensure mobile responsiveness
- Maintain localStorage data persistence
- Keep Chinese language support for UI elements

## Testing Approach

Since this is a frontend-only project:
1. Manual testing in browser is primary method
2. Test responsive behavior on different screen sizes
3. Verify localStorage persistence across page refreshes
4. Test drag-and-drop functionality
5. Validate form inputs and task operations