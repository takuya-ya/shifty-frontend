import type { Config } from 'tailwindcss';

const contentGlobs = ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'];

const config: Config = {
  content: contentGlobs,
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
