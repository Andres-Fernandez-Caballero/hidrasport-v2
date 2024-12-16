/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{ts,jsx,tsx,mdx}",
    "./components/**/*.{ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",

    // Or if using `src` directory:
    "./src/**/*.{,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        18: '4.5rem', // Custom spacing (18 * 0.25rem = 4.5rem)
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
