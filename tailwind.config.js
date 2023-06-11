/** @type {import('tailwindcss').Config} */
import { MEDIA_QUERY_TARGETS } from "./constants/mediaQueryTargets"

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      spacing: {
        "30": "7.5rem",
        "66": "16.5rem"
      },
      margin: {
        "26": "6.5rem"
      },
      inset: {
        "34": "8.5rem",
        "out": "-800px"
      },
      fontSize: {
        "4.5xl": ["2.5rem", {
          lineHeight: "2.75rem"
        }]
      },
      borderWidth: {
        "3": "3px"
      },
      minWidth: {
        "1/12": "8.333333%",
        "2/12": "16.666667%"
      },
      colors: {
        black: "#000000"
      }
    },
    screens: {
      "sm": `${MEDIA_QUERY_TARGETS.MOBILE}px`
    }
  },
  safelist: [
    'bg-stone-200',
    'bg-neutral-700',
    'bg-zinc-800',
    'bg-white',
    'bg-black',
    'border-stone-200',
    'border-neutral-700',
    'border-zinc-800',
    'border-white',
    'border-black',
    'text-stone-200',
    'text-neutral-700',
    'text-zinc-800',
    'text-white',
    'text-black'
  ]
}
