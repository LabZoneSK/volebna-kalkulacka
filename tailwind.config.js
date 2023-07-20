/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        50: "50px",
        34: "34px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      width: {
        930: "930px",
      },
      colors: {
        magenta: "#C01A72",
        "light-grey": "#DDD",
      },
      spacing: {
        100: "100px",
        77: "77px",
        50: "50px",
        30: "30px",
        20: "20px",
      },
      borderRadius: {
        cool: "56px",
      },
      boxShadow: {
        "custom-light": "0px 95px 60px -60px rgba(0, 0, 0, 0.25)",
      },
      backdropFilter: {
        blur: "blur(12.5px)",
      },
    },
  },
  plugins: [],
};
