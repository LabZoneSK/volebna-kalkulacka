import withMT from '@material-tailwind/react/utils/withMT'

/** @type {import('tailwindcss').Config} */
export default withMT({
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontSize: {
                50: '50px',
                40: '40px',
                34: '34px',
                30: '30px',
                26: '26px',
                18: '18px',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            width: {
                960: '960px',
                930: '930px',
            },
            colors: {
                magenta: '#C01A72',
                'z-blue': '#364889',
                'z-gray': '#A8A8A8',
                'light-grey': '#DDD',
                'z-row': '#F0F0F0',
                'z-hover': 'rgba(192, 26, 114, 0.15);',
            },
            spacing: {
                200: '200px',
                120: '120px',
                100: '100px',
                80: '80px',
                77: '77px',
                70: '70px',
                62: '62px',
                60: '60px',
                50: '50px',
                30: '30px',
                20: '20px',
                10: '10px',
            },
            borderRadius: {
                cool: '56px',
            },
            boxShadow: {
                'custom-light': '0px 95px 60px -60px rgba(0, 0, 0, 0.25)',
            },
            backdropFilter: {
                blur: 'blur(12.5px)',
            },
            gridTemplateColumns: {
                15: 'repeat(15, minmax(0, 150px))',
            },
        },
    },
    plugins: [],
})
