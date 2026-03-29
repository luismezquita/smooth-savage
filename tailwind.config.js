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
                // Usaremos 'sans' para que toda la app cambie a una letra moderna
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}