import Link from "next/link"

export default function CTA(props) {
  const { label, link, type, theme } = props

  const themeColors = {
    white: {
      primary: "white",
      secondary: "black"
    },
    light: {
      primary: "stone-200",
      secondary: "neutral-700"
    },
    dark: {
      primary: "zinc-800",
      secondary: "white"
    },
    black: {
      primary: "black",
      secondary: "white"
    },
  }

  return type === "contained" ? <div
    className={`flex justify-center items-center w-full sm:w-66 rounded py-2 font-medium text-sm cursor-pointer border-3 border-${themeColors[theme].primary} bg-${themeColors[theme].primary} text-${themeColors[theme].secondary}`}
  >
    <Link href={link}>
      <span>{label}</span>
    </Link>
  </div> : <div
    className={`flex justify-center items-center w-full sm:w-66 rounded py-2 font-medium text-sm cursor-pointer duration-500 delay-500 border-3 border-${themeColors[theme].primary} hover:bg-${themeColors[theme].primary} hover:text-${themeColors[theme].secondary}`}
  >
    <Link href={link}>
      <span>{label}</span>
    </Link>
  </div>
}
