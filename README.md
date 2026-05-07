# Shajjad Hossain Seam — Portfolio

A personal portfolio website built with a **macOS Desktop** concept running entirely in the browser. Every section opens as a draggable, resizable window — just like a real Mac.

---

## Features

- 🖥️ **macOS Desktop UI** — draggable/resizable windows, traffic light buttons, macOS menu bar
- 🚀 **Boot Screen** — realistic macOS startup sequence with variable-speed progress bar
- 🔒 **Lock Screen** — blurred desktop, password protected (`anything` to unlock)
- 🍎 **Apple Menu** — dropdown with Log Out option
- 📦 **Dynamic GitHub Projects** — fetches live repos from the GitHub API with 30-minute cache
- 📬 **Contact Form** — powered by Web3Forms, emails delivered directly to inbox
- 🌗 **Light Mode** — macOS Big Sur style colorful wallpaper with frosted glass windows
- 📱 **Mobile Friendly** — clean tab-based layout with sticky header on small screens
- ⚡ **Fast** — no heavy libraries, pure CSS animations, loads in under 1 second

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Pure CSS (no Tailwind) |
| Icons | react-icons v5 |
| Window drag | react-draggable |
| Contact form | Web3Forms |
| Projects data | GitHub REST API |
| Deployment | Vercel |

---

## Project Structure

```
portfolio/
├── public/
│   ├── avatar.jpg              Your profile photo (add this)
│   └── resume.pdf              Your CV/resume PDF (add this)
├── src/
│   ├── components/
│   │   ├── AvatarImg.jsx       Photo with emoji fallback
│   │   ├── BootScreen.jsx      macOS startup animation
│   │   ├── LockScreen.jsx      Password lock overlay
│   │   ├── MenuBar.jsx         Top menu bar + Apple menu
│   │   ├── Dock.jsx            Bottom dock
│   │   ├── Desktop.jsx         Desktop icons
│   │   ├── Window.jsx          Draggable window shell
│   │   ├── AboutWindow.jsx     About + hire card
│   │   ├── ProjectsWindow.jsx  GitHub projects (live API)
│   │   ├── SkillsWindow.jsx    Skills + training
│   │   ├── ResumeWindow.jsx    PDF viewer + download
│   │   └── ContactWindow.jsx   Contact form
│   ├── hooks/
│   │   └── useGitHubRepos.js   GitHub API + cache hook
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env                        API keys (never commit this)
├── .env.example                Template — commit this
└── index.html
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/shseam13/portfolio.git
cd portfolio
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your key:

```env
VITE_WEB3FORMS_KEY=your_key_here
```

Get a free key at [web3forms.com](https://web3forms.com) — enter your email and they send it instantly.

### 3. Add your assets

| File | Location | Purpose |
|---|---|---|
| Profile photo | `public/avatar.jpg` | Appears in desktop icon, dock, about window, lock screen, browser tab |
| Resume PDF | `public/resume.pdf` | Resume window viewer + download button |

### 4. Run locally

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## Customisation

### Personal info
- **Bio, experience, education** → `src/components/AboutWindow.jsx`
- **Skills & training** → `src/components/SkillsWindow.jsx`
- **Contact links** → `src/components/ContactWindow.jsx`

### GitHub projects
Projects are fetched **live** from your public GitHub repos — no manual updates needed. Cache refreshes every 30 minutes.

To change the GitHub username edit `src/hooks/useGitHubRepos.js`:
```js
const USERNAME = 'shseam13'; // change this
```

### Lock screen password
Edit `src/components/LockScreen.jsx`:
```js
if (password === 'anything') { // change this
```

---

## Deployment on Vercel

```bash
npm install -g vercel
vercel
```

Then add your environment variable in the Vercel dashboard:
**Settings → Environment Variables → Add**

| Key | Value |
|---|---|
| `VITE_WEB3FORMS_KEY` | your Web3Forms access key |

Every `git push` to main will auto-deploy.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_WEB3FORMS_KEY` | Yes | Web3Forms access key for the contact form |

> **Security note:** Web3Forms keys are explicitly designed to be used in client-side code (public key). Moving it to `.env` prevents it from being hardcoded visibly in your source files on GitHub. Even so, the key is still bundled into the final JS — this is expected and safe for Web3Forms.

---

## License

MIT — free to use as a template for your own portfolio.

---

Built by [Shajjad Hossain Seam](https://github.com/shseam13)
