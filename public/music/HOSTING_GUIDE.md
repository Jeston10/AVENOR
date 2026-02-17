# Hosting Music Files Externally

## Option 1: Vercel Blob (Recommended - You're already on Vercel)

### Method A: Upload via Dashboard (easiest)

1. **Create a Blob store** (one-time):
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) → your project (**avenor-smoky** / web)
   - Open the **Storage** tab → **Connect Database** (or **Create Database**)
   - Choose **Blob** → name it (e.g. `avenor-music`) → **Create**
   - The project will get a `BLOB_READ_WRITE_TOKEN` automatically

2. **Upload your music files:**
   - Go to [Vercel Blob stores](https://vercel.com/dashboard/stores) or your project → **Storage** → your Blob store
   - Use **Upload** (drag-and-drop or browse) to add all 8 MP3 files from `web/public/music/`

3. **Copy the URLs** for each file from the dashboard (each file has a public URL).

4. **Update `web/src/data/playlist.ts`** – replace each `src` with the URL from the dashboard (see “After Uploading” below).

### Method B: Upload via CLI (after Blob store exists)

1. **Create a Blob store** in the dashboard first (see Method A step 1).

2. **Install Vercel CLI and link** (already done if you followed the quick start):
   ```bash
   npm i -g vercel
   vercel login
   cd web && vercel link --yes
   ```

3. **Pull env so CLI has the token:** In Vercel Dashboard → Project → Settings → Environment Variables, ensure `BLOB_READ_WRITE_TOKEN` exists. Then run:
   ```bash
   cd web && vercel env pull .env.local
   ```
   Then run uploads with the token available:
   ```bash
   cd web/public/music
   vercel blob put ambient-calm.mp3
   vercel blob put soft-piano.mp3
   # ... repeat for each file
   ```

4. **Update `web/src/data/playlist.ts`** with the URLs the CLI prints after each upload.

---

## Option 2: Cloudinary (Free tier available)

### Steps:
1. **Sign up:** Go to https://cloudinary.com (free tier: 25GB storage, 25GB bandwidth/month)

2. **Upload files:**
   - Go to Media Library → Upload
   - Upload all your MP3 files
   - Set delivery type to "Upload" (not fetch)

3. **Get URLs:** Each file will have a URL like:
   ```
   https://res.cloudinary.com/[your-cloud-name]/video/upload/v1234567890/ambient-calm.mp3
   ```

4. **Update `web/src/data/playlist.ts`** with these URLs

---

## Option 3: AWS S3 + CloudFront (More setup, but scalable)

### Steps:
1. **Create S3 bucket** on AWS
2. **Upload files** to S3
3. **Set bucket policy** to allow public read access
4. **Get URLs:** `https://[bucket-name].s3.[region].amazonaws.com/ambient-calm.mp3`
5. **Update `web/src/data/playlist.ts`** with these URLs

---

## Option 4: GitHub Releases / Raw GitHub URLs

If files are small (< 100MB total):
1. Create a separate repo or use GitHub Releases
2. Upload MP3 files
3. Use raw GitHub URLs:
   ```
   https://raw.githubusercontent.com/[username]/[repo]/main/music/ambient-calm.mp3
   ```

---

## After Uploading - Update Your Playlist

Edit `web/src/data/playlist.ts` and replace the `src` paths with your external URLs:

```typescript
export const PLAYLIST: Track[] = [
  { 
    id: '1', 
    title: 'Ambient Calm', 
    src: 'https://[your-cdn-url]/ambient-calm.mp3'  // ← Replace with your URL
  },
  // ... etc
]
```

---

## What’s already done for you

- Vercel CLI installed globally
- Logged in to Vercel
- Project **web** linked to your Vercel project (GitHub: Jeston10/AVENOR)
- All 8 MP3 files are in `web/public/music/`

## Your next step (choose one)

**Option A – Dashboard (simplest):**  
1. In Vercel Dashboard → your project → **Storage** → **Create** → **Blob** (name it e.g. `avenor-music`).  
2. In the Blob store, **Upload** the 8 MP3 files from `web/public/music/`.  
3. Copy each file’s public URL and put them into `web/src/data/playlist.ts` as the `src` for each track.

**Option B – CLI:**  
1. Create the Blob store in the dashboard (same as above).  
2. Run `vercel env pull .env.local` in the `web` folder so the CLI has `BLOB_READ_WRITE_TOKEN`.  
3. Run `vercel blob put <filename>.mp3` in `web/public/music` for each file, then copy the printed URLs into `playlist.ts`.
