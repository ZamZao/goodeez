/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Goodeez Design System
        goodeez: {
          blue: {
            50: '#F0F7FF',
            100: '#E0EFFE',
            200: '#BAE0FD',
            300: '#7CC5FC',
            400: '#4FA3FF', // Light Blue
            500: '#2C85F5',
            600: '#1B4F9C', // Main Blue
            700: '#16458A',
            800: '#133970',
            900: '#0F2A47', // Navy
            950: '#08182B',
          },
          yellow: {
            50: '#FFFEF5',
            100: '#FFF4D9', // Cream
            200: '#FFE6A8',
            300: '#FFD666',
            400: '#FFCA2C', // Main Yellow
            500: '#F5AC00',
            600: '#D68800',
            700: '#B36600',
            800: '#945008',
            900: '#7A410D',
          },
        },
        // Semantic Aliases
        primary: {
          50: '#F0F7FF',
          100: '#E0EFFE',
          200: '#BAE0FD',
          300: '#7CC5FC',
          400: '#4FA3FF',
          500: '#2C85F5',
          600: '#1B4F9C', // DEFAULT
          700: '#16458A',
          800: '#133970',
          900: '#0F2A47',
          DEFAULT: '#1B4F9C',
          foreground: '#FFFFFF',
        },
        secondary: {
          50: '#FFFEF5',
          100: '#FFF4D9',
          200: '#FFE6A8',
          300: '#FFD666',
          400: '#FFCA2C', // DEFAULT
          500: '#F5AC00',
          600: '#D68800',
          700: '#B36600',
          800: '#945008',
          900: '#7A410D',
          DEFAULT: '#FFCA2C',
          foreground: '#0F2A47',
        },
        accent: {
          DEFAULT: '#4FA3FF', // Light Blue
          foreground: '#FFFFFF',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
    },
  },
  plugins: [],
}
