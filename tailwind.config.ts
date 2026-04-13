import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cave: {
          bg: 'var(--background)',      // #0a0a0a
          'card': 'var(--card)',        // #1a1a1a  
          'card-alt': 'var(--card-alt)', // #111111
          border: 'var(--border)',      // #2a2a2a
          'text-100': 'var(--foreground)', // #ffffff
          'text-400': 'var(--text-secondary)', // #aaaaaa
          accent: 'var(--accent)',      // #d97706
          'accent-glow': 'var(--accent-glow)', // #fb923c
        },
        'status-pending': {
          DEFAULT: '#e5e7eb',
          text: '#000000',
        },
        'status-approved': {
          DEFAULT: '#10b981',
          text: '#ffffff',
        },
        'status-rejected': {
          DEFAULT: '#ef4444',
          text: '#ffffff',
        },
      },
      boxShadow: {
        'glow-accent': '0 0 20px rgba(217, 119, 6, 0.3)',
        'glow-card': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 5px rgba(217, 119, 6, 0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(217, 119, 6, 0.5)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config

