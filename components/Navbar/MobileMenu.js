import { useEffect, useState } from "react"
import Link from "next/link"
import { products, menuItems } from "public/static/contents/navbar"
import CloseIcon from "icons/CloseIcon"
import GlobeIcon from "icons/GlobeIcon"

function MobileMenu(props) {
  const { handleClose, show } = props
  const [allMenuItems, setAllMenuItems] = useState([])

  useEffect(() => {
    const menuSubItems = menuItems.find(item => item.label === "Menu").subMenus
    setAllMenuItems([...products, ...menuSubItems])
  }, [])

  return <div
    className={`w-screen h-screen absolute top-0 right-0 backdrop-blur-sm bg-black bg-opacity-10 flex flex-row-reverse transition-opacity ${show ? "visible opacity-100" : "invisible opacity-0"}`}
  >
    <div
      className={`w-80 h-screen bg-white text-sm text-neutral-900 p-10 flex flex-col absolute transition-all duration-300 ${show ? " right-0 opacity-100" : "-right-52 opacity-0"}`}>
      <div className={"w-6 text-neutral-900 z-10 ml-auto mb-6 cursor-pointer"} onClick={handleClose}>
        <CloseIcon/>
      </div>

      <ol
        className={"overflow-y-scroll"}>
        {allMenuItems.map(item => (
          item.id !== "lang" ? <Link key={item.id} href={item.link}>
            <li key={item.id} className={"my-2 py-1.5 rounded hover:bg-gray-100"}>
              <span className={"px-2"}>{item.label}</span>
            </li>
          </Link> : <div key={"lang"} className={"flex gap-3"}>
            <GlobeIcon/>
            <div className={"flex flex-col"}>
              <span>United States</span>
              <span className={"text-neutral-500 text-xs"}>English</span>
            </div>
          </div>
        ))}
      </ol>
    </div>
  </div>
}

export default MobileMenu
