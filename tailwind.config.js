/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{ts,jsx,tsx,mdx}',
    './components/**/*.{ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}