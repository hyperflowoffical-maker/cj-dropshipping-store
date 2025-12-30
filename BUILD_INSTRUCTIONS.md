# Building Tailwind CSS

Since npm is not available, you have two options:

## Option 1: Use Tailwind Play CDN (Quick but not production-ready)
The HTML files currently use CDN. For production, use Option 2.

## Option 2: Build Tailwind CSS Properly

1. Install Node.js from https://nodejs.org/
2. Open terminal in this directory
3. Run: `npm install`
4. Run: `npm run build-css`
5. This will create `dist/output.css`
6. Update all HTML files to use: `<link rel="stylesheet" href="dist/output.css">`

## Option 3: Use Tailwind Standalone CLI (No npm install needed)

Download the standalone CLI from: https://github.com/tailwindlabs/tailwindcss/releases

Then run:
```
./tailwindcss -i ./src/input.css -o ./dist/output.css --minify
```

