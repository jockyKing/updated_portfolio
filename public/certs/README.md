# Certificate Images Folder

Place your certificate image files (`.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`) in this folder (`public/certs/`).

## How to link an image to a certification card

1. Drop your image file here, for example:
   `public/certs/google-data-analytics.png`

2. In `src/data/portfolioData.ts`, find the matching item in `CERTIFICATIONS` and set its `imageFile` property:
   ```ts
   imageFile: 'google-data-analytics.png',
   ```

Vite automatically serves files from `public/certs/` at `/certs/<filename>` during development and copies them into `dist/certs/` when building.
