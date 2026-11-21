# Certificate Images Folder

Place your certificate image files (`.png`, `.jpg`, `.jpeg`, `.webp`) in this folder (`public/certs/`).

## How to link an image to a certification card

1. Drop your image file here, for example:
   `public/certs/google-data-analytics.png`

2. In `index.html`, find the matching `<article class="cert-card">` and set its `data-cert-img` attribute:
   ```html
   <article class="cert-card" data-cert-img="/certs/google-data-analytics.png">
   ```

Vite automatically serves files from `public/certs/` at `/certs/<filename>` during development and copies them into `dist/certs/` when building.
