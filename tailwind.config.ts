
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./app/(project)/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}", // Include shared components if any are used in project
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          black: '#09090B', // Void Black
          surface: '#18181B', // Graphite
          surfaceHighlight: '#27272A',
          white: '#F8FAFC', // Vapor White
          mint: '#00DC82', // Electric Mint
          fern: '#047857', // Deep Fern
          glow: '#BBF7D0', // Lime Glow
          text: '#ECEDEE', // Text Main
          muted: '#A1A1AA', // Text Muted
          border: '#27272A', // Border Color
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
};
export default config;
