/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base': '#0B0F19',
        'bg-surface': '#111827',
        'bg-glass': 'rgba(17, 24, 39, 0.75)',
        'border-subtle': '#1F2937',
        'border-accent': '#3B82F6',
        'text-main': '#F9FAFB',
        'text-muted': '#9CA3AF',
        'amber-ops': '#F59E0B',
        'emerald-pass': '#10B981',
        'red-fail': '#EF4444',
        'cyan-clean': '#06B6D4',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Consolas', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      borderRadius: {
        card: '0.75rem',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      zIndex: {
        drawer: '50',
        modal: '100',
        tour: '200',
      },
      transitionDuration: {
        fast: '150ms',
        smooth: '300ms',
      },
      spacing: {
        'touch-target': '56px',
      },
      gap: {
        'gap-md': '1rem',
      },
      screens: {
        tablet: '768px',
        cleanroom: '1280px',
      },
    },
  },
  plugins: [],
}
