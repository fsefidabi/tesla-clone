import Link from "next/link"
import styles from "./TopBanner.module.scss"

export default function DesktopTopBanner() {
  return <div className={"bg-white"}>
    <div className={`${styles.banner} p-4 sm:p-3.5 text-center text-slate-600 text-sm text-white`}>
      <span className={`text-sm sm:text-base`}>$7,500 </span>
      <Link href={"#"} className={"link"}><span className={"cursor-pointer"}>Federal Tax Credit</span></Link>
      <span className={"px-4 inline-block w-full sm:w-fit"}>Available for new Model 3 and Model Y</span>
    </div>
  </div>
}
