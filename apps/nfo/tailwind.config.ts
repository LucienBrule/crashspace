export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: '#000000',
                    light: '#ffffff',
                },
                text: {
                    DEFAULT: '#ffffff',
                    light: '#000000',
                },
                link: {
                    DEFAULT: '#0ff',
                },
                highlight: '#ff0000',
                muted: '#cccccc',
            },
            fontFamily: {
                mono: ['Courier New', 'Courier', 'monospace'],
            },
            fontSize: {
                base: '14px',
                title: ['var(--text-title, 20px)', '1.5rem'],
            },
            borderColor: {
                signature: 'gray',
            },
        },
    },
    plugins: [],
}
