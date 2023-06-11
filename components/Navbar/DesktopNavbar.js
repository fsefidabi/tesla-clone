import { useState } from "react"
import Link from "next/link"
import useMediaQuery from "hooks/useMediaQuery"
import { products, menuItems } from "public/static/contents/navbar"
import { MEDIA_QUERY_TARGETS } from "constants/mediaQueryTargets"
import TeslaLogo from "icons/TeslaLogo"
import MobileMenu from "./MobileMenu"

export default function DesktopNavbar(props) {
  const { theme } = props

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const isTablet = useMediaQuery(MEDIA_QUERY_TARGETS.TABLET)

  function handleToggleMobileMenu() {
    setShowMobileMenu(!showMobileMenu)
  }

  return <div
    className={`flex justify-between items-center flex-wrap px-6 sm:px-8 py-4 bg-transparent ${theme === "light" ? "text-white" : "text-neutral-900"}`}>
    <div className={"flex min-w-2/12 shrink-0 grow basis-0"}>
      <Link href={"/"} className={"w-30 h-6 sm:mx-4 inline-flex align-middle"}>
        <TeslaLogo className={theme === "light" ? "fill-white" : "fill-neutral-900"}/>
      </Link>
    </div>

    {!isTablet ? <>
      <ol className={"flex shrink-0"}>
        {products.map(product => (
          <li key={product.id}
              className={"text-sm font-normal py-1 px-2 rounded cursor-pointer hover:bg-slate-400 hover:bg-opacity-20 hover:backdrop-blur-2xl"}>
            <Link
              href={product.link}
            >
              <span className={"px-2"}>{product.label}</span>
            </Link>
          </li>
        ))}
      </ol>

      <ol className={"flex justify-end min-w-2/12 shrink-0 grow basis-0"}>
        {menuItems.map(item => (
          <li key={item.id}
              className={"text-sm font-normal py-1 px-2 rounded cursor-pointer hover:bg-slate-400 hover:bg-opacity-20 hover:backdrop-blur-2xl"}>
            {(item.hasOwnProperty("link") && !item.hasOwnProperty("subMenus")) ? <Link
              href={item.link}
            >
              <span className={"px-2"}>{item.label}</span>
            </Link> : <span className={"px-2"}>{item.label}</span>}
          </li>
        ))}
      </ol>
    </> : <>
      <li
        key={"mobile-menu"}
        className={"list-none text-sm font-normal py-1 px-2 rounded cursor-pointer hover:bg-slate-400 hover:bg-opacity-20 hover:backdrop-blur-2xl"}
        onClick={() => handleToggleMobileMenu()}
      >
        <span className={"px-2"}>Menu</span>
      </li>
      <MobileMenu show={showMobileMenu} handleClose={handleToggleMobileMenu}/>
    </>}
  </div>
}
