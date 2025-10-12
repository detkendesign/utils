# utils

Lightweight TypeScript utility collection / standard library.

## Structure

Organized into focused modules under `src/lib/`:

- **general/** - Common helpers, type guards, and shared types
- **dates/** - Date manipulation and formatting utilities
- **logger/** - Logging utilities
- **numbers/** - Number formatting, calculations, and conversions
- **strings/** - String manipulation and formatting
- **times/** - Time-related constants and utilities

Each module has corresponding tests in `src/tests/`.

## Dependencies

The utils don't have any dependencies at all, to keep them lightweight and
simple. Only node dependencies in this project are development-related.

## Usage / Installation

To use the utils, please copy-paste them. There's no NPM package, as they should
serve as a base for new TS projects and should be extended in your own project.

## Development

This project uses **_pnpm_** as the package manager.

```bash
pnpm i          # Install development dependencies
pnpm test       # Run tests with Vitest
pnpm build      # Compile TypeScript
pnpm lint       # Run the linter
```
