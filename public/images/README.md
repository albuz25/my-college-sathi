# Images folder

## Hero background

Place your hero background image here as:

- **Filename:** `hero-bg.jpg` (or `hero-bg.png`, `hero-bg.webp`)
- **Path:** `public/images/hero-bg.jpg`
- **URL in app:** `/images/hero-bg.jpg`

Recommended size: 1920×1080 px or larger. The image is used as `background-size: cover` and `background-position: center`.

If you use a different filename, update the path in:
`src/app/(marketing)/page.tsx` → hero section → `backgroundImage: "url('/images/your-file.jpg')"`
