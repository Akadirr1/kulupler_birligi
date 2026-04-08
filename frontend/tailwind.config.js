/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep navy blues
        navy: {
          950: '#03050f',
          900: '#060d1e',
          800: '#0a1630',
          700: '#0f2044',
          600: '#152b5e',
        },
        // Neon cyan accent
        neon: {
          DEFAULT: '#00e5ff',
          dark: '#00b8cc',
          glow: 'rgba(0, 229, 255, 0.25)',
        },
        // Electric indigo accent
        electric: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Outfit', 'Inter', 'ui-sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace'],
      },
      backgroundImage: {
        'grid-pattern':
          "linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(to right, rgba(0,229,255,0.04) 1px, transparent 1px)",
        'hero-gradient':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,229,255,0.15) 0%, transparent 60%), linear-gradient(180deg, #060d1e 0%, #03050f 100%)',
      },
      backgroundSize: {
        'grid-size': '48px 48px',
      },
      boxShadow: {
        neon: '0 0 20px rgba(0,229,255,0.3), 0 0 60px rgba(0,229,255,0.1)',
        'neon-sm': '0 0 10px rgba(0,229,255,0.2)',
        card: '0 4px 24px rgba(0,0,0,0.4)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out both',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,229,255,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(0,229,255,0.5)' },
        },
      },
    },
  },
  plugins: [],
};
