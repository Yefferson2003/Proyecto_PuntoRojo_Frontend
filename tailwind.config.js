/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require('@iconify/tailwind')

export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			principal: '#ff0000',
  			fondo: '#e0e0e0',
  			grisClaro: '#f0f0f0'
  		},
  		screens: {
  			tablet: '900px',
  			tablet2: '600px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [addDynamicIconSelectors(), require("tailwindcss-animate")]
}