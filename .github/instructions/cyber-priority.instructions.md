---
applyTo: '**'
---
# Prompt for GitHub Copilot

You are an experienced full-stack web developer. Build a **static, single-page responsive website** for a **tech startup in the cybersecurity domain**.  
The website should be **modern, minimal, and professional**, using **TailwindCSS** for styling.  

## 💡 Requirements

### General
- Use **TailwindCSS** (include it locally, not via CDN).
- All colors and fonts should be configurable from a **single SCSS or CSS file** — for example, define `--primary`, `--secondary`, `--accent`, `--font-primary` in a root style block.
- Use a **light theme**.
- The layout should be **fully responsive**, optimized for both desktop and mobile.
- All text and image content should have **placeholder text/images** when not available.
- The website must be **self-contained** — do **not use any external downloads or CDNs**.

### Structure
The page includes these main sections:
1. **Header (Sticky)**
   - Logo on the left (use placeholder logo text or image).
   - Navigation menu on the right with links to `Home`, `About Us`, `Services`, `Careers`, and `Contact Us`.
   - On smaller screens, collapse into a **hamburger menu** that toggles visibility of links.
   - Smooth scroll to respective sections when menu items are clicked.

2. **Home Section**
   - A **carousel/slider** with 3 hero images (use placeholder images).
   - Each slide has overlay **title text** (e.g., “Protecting Your Digital Future”).
   - Use only lightweight JS for carousel (no external libraries).

3. **About Us Section**
   - Section title with an **icon**.
   - A simple **textual write-up** about the company.

4. **Services Section**
   - Section title with icon.
   - Display **5 services**, each in a responsive card layout (2 or 3 per row on desktop, stacked on mobile).
   - Each service has:
     - An image (placeholder)
     - A service title
     - A short description

5. **Careers Section**
   - Section title with icon.
   - A generic write-up about company culture.
   - Display a **mailto link** like “Send Resume” — clicking opens the default mail client.

6. **Contact Us Section**
   - Section title with icon.
   - Include an image (placeholder) and contact information such as address, phone, and email.

7. **Footer**
   - Simple footer with copyright text.

### 🧩 Additional Details
- Use semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`, etc.).
- Use meaningful class names.
- Include comments explaining key sections.
- Ensure **smooth scrolling** between sections.
- The file structure should be:

## 🛠️ Setup & Build

1. **Install Tailwind CSS (once per project):**
   ```bash
   npm install -D tailwindcss
2. ** build the Tailwind CSS file:**
   ```bash
   npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
   ```
