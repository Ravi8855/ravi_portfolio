## Deployment Guide (Vercel & Netlify) and CI

### Vercel (recommended for Vite/React)
1. Create a GitHub repository and push your project.
2. On Vercel dashboard -> New Project -> Import from GitHub.
3. Set the root to the project folder (or leave blank if root).
4. Framework Preset: `Vite` or `Other -> Vite`.
5. Build command: `npm run build` (or `vite build` if not set)
6. Output directory: `dist`
7. Environment variables: add any if you use them (e.g., API_KEYS).
8. Deploy — Vercel will run builds on every push and provide a preview URL automatically.

### Netlify
1. Create a repo and push code to GitHub.
2. Netlify -> New site from Git -> Connect your repo.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. If using Netlify CLI locally, run `netlify deploy --prod` after building.
6. Netlify also supports automatic deploys on push with previews.

### CI (GitHub Actions) - example workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: site-dist
          path: dist
# For automatic deploy to Vercel/Netlify, use their GitHub Apps or use deploy actions/plugins specific to the provider.
```

### Note on certificates
- The project includes a client-side certificate gallery that stores files in the browser (LocalStorage) for preview during demos.
- For production, upload your certificate files to `public/certs` (create that folder) and update the gallery to fetch from `/certs` for persistent hosting.




## Server (Node + S3) deployment suggestions

This project contains a server in `/server` which provides:
- `POST /api/upload` — multipart upload to S3
- `GET /api/certs` — list certs in S3
- `DELETE /api/certs` — delete a cert by key

### Steps to configure
1. Create an AWS S3 bucket (e.g., `ravi-portfolio-certs`) and enable public read for objects or use CloudFront for secure delivery.
2. Create an IAM user with `s3:PutObject`, `s3:ListBucket`, `s3:DeleteObject` permissions for the bucket.
3. Set environment variables on the server host:
   - `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET`
4. Run server: `cd server && npm install && npm run start`

### Recommended hosting
- Host frontend on **Vercel** (static site)
- Host backend on **Render** (Web Service) or **Heroku** or AWS Elastic Beanstalk.
  - On Render, connect your GitHub repo and set environment variables in the Render dashboard.
  - For Heroku, set config vars and deploy.

### GitHub Actions (example)
- Frontend: keep using Vercel Git integration (recommended).
- Backend: use Render's GitHub integration or use a deploy action for Render/Heroku.

If you want, I can:
- Create the GitHub repository for you (requires permission) and push the code.
- Set up Vercel integration for the frontend and Render integration for backend if you provide access tokens / link the repo.

