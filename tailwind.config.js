/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-colono': '#006b98', // Coloca aquí el color personalizado
      },
    },
  },
  plugins: [],
}

