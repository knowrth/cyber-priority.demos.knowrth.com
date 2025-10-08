/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./scripts/**/*.{js,ts}",
    "./components/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        // Use CSS variables defined in theme.css
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        accent: "var(--color-accent)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
      },
      fontFamily: {
        sans: ["var(--font-primary)", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
      },
      transitionTimingFunction: {
        fast: "var(--transition-fast)",
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        body: {
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text)",
          fontFamily: "var(--font-primary)",
        },
        a: {
          color: "var(--color-primary)",
          transition: "color var(--transition-fast)",
        },
        "a:hover": {
          color: "var(--color-accent)",
        },
      });
    },
  ],
};
