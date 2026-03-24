import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Crock Spot Brand Colors from Brand Guide
        'crock-orange': {
          DEFAULT: '#F49220',
          light: '#F9A94D',
          dark: '#D97D0E',
        },
        // The Spot Café - burnt orange from logo
        'spot-burnt-orange': {
          DEFAULT: '#C65D24',
          light: '#D97630',
          dark: '#A84D1E',
        },
        'crock-maroon': {
          DEFAULT: '#8C2D2E',
          light: '#A84445',
          dark: '#6B2223',
        },
        'crock-green': {
          DEFAULT: '#667934',
          light: '#7E9442',
          dark: '#4F5E28',
        },
        'crock-purple': {
          DEFAULT: '#614B8A',
          light: '#7A62A8',
          dark: '#4A3A6B',
        },
        'crock-dark': {
          DEFAULT: '#2F2744',
          light: '#3E3456',
          darker: '#1E1A2D',
        },
        'crock-yellow': {
          DEFAULT: '#F0DB9C',
          light: '#F5E7BB',
          dark: '#E5C977',
        },
        'crock-gray': {
          light: '#C7C8CA',
          DEFAULT: '#77787B',
          dark: '#4A4B4D',
        },
      },
      fontFamily: {
        display: ['var(--font-gobold)', 'sans-serif'],
        body: ['var(--font-muli)', 'Mulish', 'sans-serif'],
        cafe: ['var(--font-pacifico)', 'Pacifico', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'steam': 'steam 2s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        steam: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.6' },
          '50%': { transform: 'translateY(-10px) scale(1.1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #2F2744 0%, #614B8A 50%, #2F2744 100%)',
        'cta-gradient': 'linear-gradient(90deg, #F49220 0%, #F9A94D 100%)',
        'dark-gradient': 'linear-gradient(180deg, #2F2744 0%, #1E1A2D 100%)',
      },
    },
  },
  plugins: [],
}
export default config
