import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          lighter: '#55565a',
          DEFAULT: '#555659',
          darker: '#030712',
        },
        secondary: {
          DEFAULT: '#f2f0ef',
        },
        muted: 'hsl(var(--muted))',
      },
      keyframes: {
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          to: {
            opacity: '1',
            transform: 'none',
          },
        },
        'fade-up': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'none',
          },
        },
        slideIn: {
          '0%': {
            transform: 'translateY(2rem)',
            opacity: '0.01',
          },
          '100%': {
            transform: 'translateY(0px)',
            opacity: '1',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s var(--animation-delay,0ms) ease forwards',
        'fade-up': 'fade-up 1s var(--animation-delay,0ms) ease forwards',
        slideIn:
          'slideIn 0.6s cubic-bezier(0, 0, 0.3, 1) 1 normal forwards running',
      },
    },
  },
  plugins: [forms, typography, aspectRatio],
};
export default config;
