const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#92E3A9',
                    DEFAULT: '#92E3A9',
                    dark: '#92E3A9',
                },
                secondary: {
                    light: '#FFE768',
                    DEFAULT: '#FFE768',
                    dark: '#FFE768',
                },
                dark: {
                    light: '#23645A',
                    DEFAULT: '#23645A',
                    dark: '#23645A',
                },
                hover: {
                    DEFAULT: "#263038",
                    card: "#FFF9D8"
                },
                input: {
                    DEFAULT: "#F5F8F5"
                }
            },
            fontFamily: {
                Montserrat: ['Montserrat', 'sans-serif'],
            },
            fontWeight: {
                bold: '700',
                semiBold: '600',
                medium: '500',
                regular: '400'
            },
        },
        screens: {
            'xs': '380px',
            ...defaultTheme.screens,
          },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require("daisyui"),
        require('tailwind-scrollbar')   ,
    ],
};