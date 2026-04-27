/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'fruit-light': '#F0F4F0', // Fondo suave
                'fruit-dark': '#2E1065',  // Fondo oscuro elegante púrpura oscuro (Tailwind violet-950)
                'fruit-green': '#22C55E', // El verde principal
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            keyframes: {
                'slide-up': {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
            },
            animation: {
                'slide-up': 'slide-up 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
            },
        },
    },
    plugins: [],
}