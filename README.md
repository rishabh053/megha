# Valentine Week Website for Megha 💕

A beautiful, interactive Valentine Week website built with React + Vite.

## Features ✨

- 🔒 Lock screen with personalized question
- 📅 7 Days of Valentine Week, each unlocking on its specific date
- 🎮 Unique interactive game/animation for each day
- 💾 Progress saved in localStorage
- 📱 Fully responsive and mobile-friendly
- 🎨 Clean, minimal, and romantic design

## Valentine Week Days

1. **Rose Day** (Feb 7) - Shy button that moves away
2. **Propose Day** (Feb 8) - Runaway NO button
3. **Chocolate Day** (Feb 9) - Button text changes on hover
4. **Teddy Day** (Feb 10) - Disappearing NO button
5. **Hug Day** (Feb 11) - Hold-to-win button
6. **Kiss Day** (Feb 12) - Fake choice (both lead to sweet message)
7. **Valentine's Day** (Feb 14) - Final message with confetti

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with all the production files.

## Deploy to GitHub Pages

### Method 1: Using GitHub Actions (Recommended)

1. Create a new repository on GitHub named `megha` or any name you prefer
2. Push this code to the repository
3. Go to repository Settings → Pages
4. Under "Build and deployment", select "GitHub Actions"
5. Create `.github/workflows/deploy.yml` with this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

6. Push the workflow file, and your site will be live at `https://yourusername.github.io/megha/`

### Method 2: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Install gh-pages:
```bash
npm install -g gh-pages
```

3. Deploy:
```bash
gh-pages -d dist
```

### Important: Update Your Base URL

If your GitHub username is different from "rishabh.bio", update `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/megha/', // or '/your-repo-name/' if different
})
```

## Customization

### Change the Lock Screen Answer
Edit `src/components/LockScreen.jsx`, line 8:
```javascript
const correctAnswer = 'megha' // Change this to any answer
```

### Adjust Valentine Week Dates
Edit `src/components/DaySelection.jsx`, the `days` array (lines 13-20).

### Modify Messages
Each day's message can be customized in its respective file in `src/components/days/`

## Testing Dates

To test all days without waiting for actual dates, you can temporarily modify the date check in `DaySelection.jsx`:

```javascript
const isDayUnlocked = (day) => {
  return true; // This unlocks all days
}
```

Remember to change it back before deployment!

## File Structure

```
valentine-week/
├── public/
│   └── heart.svg
├── src/
│   ├── components/
│   │   ├── days/
│   │   │   ├── RoseDay.jsx
│   │   │   ├── ProposeDay.jsx
│   │   │   ├── ChocolateDay.jsx
│   │   │   ├── TeddyDay.jsx
│   │   │   ├── HugDay.jsx
│   │   │   ├── KissDay.jsx
│   │   │   └── ValentineDay.jsx
│   │   ├── LockScreen.jsx
│   │   └── DaySelection.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This is a personal project. Feel free to use it as inspiration! ❤️

---

Made with ❤️ by Rishabh for Megha
