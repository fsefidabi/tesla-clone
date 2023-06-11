import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import useEventListener from "hooks/useEventListener"
import useMediaQuery from "hooks/useMediaQuery"
import { MEDIA_QUERY_TARGETS } from "constants/mediaQueryTargets"
import { homePageOverlayContents } from "public/static/contents/homePage"
import { footerItems } from "public/static/contents/footer"
import DesktopTopBanner from "components/TopBanner/DesktopTopBanner"
import DesktopNavbar from "components/Navbar/DesktopNavbar"
import CTA from "components/CTA/CTA"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [mainElement, setMainElement] = useState(null)
  const [activeSection, setActiveSection] = useState({ index: 0, content: homePageOverlayContents[0] })

  const root = useRef()

  const isMobile = useMediaQuery(MEDIA_QUERY_TARGETS.MOBILE)

  useEventListener(mainElement, "scroll", handleScrollEvent)

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.lastScrollPosition = 0
      const mainEl = document.querySelector("main")
      setMainElement(mainEl)
    }
  }, [])

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.defaults({
        toggleActions: "restart pause resume pause",
        scroller: ".main-container"
      })

      if (activeSection.index === 0) {
        gsap.from(root?.current.querySelectorAll(".animate-by-scroll h1"), {
          duration: 1.5,
          yPercent: 100,
          opacity: 0,
          ease: "power4",
          yoyo: true
        })
        gsap.from(root?.current.querySelectorAll(".animate-by-scroll h4"), {
          duration: 1,
          yPercent: 100,
          opacity: 0,
          ease: "power4",
          delay: 0.8
        })
      }

    }, root)

    return () => ctx.revert()
  }, [])

  function handleScrollEvent() {
    const overlayElement = document.querySelector(".overlay")
    const sections = [...root?.current.querySelectorAll("section.homepage-hero")]
    const threshold = 100
    sections.forEach((section, index) => {
      if (index < sections.length - 1 && document.lastScrollPosition > sections[index + 1].offsetTop - threshold) {
        setActiveSection({ index: index + 1, content: homePageOverlayContents[index + 1] })
      }
      if (activeSection.index > 0 && document.lastScrollPosition < sections[activeSection.index - 1].offsetTop + threshold) {
        setActiveSection({ index: activeSection.index - 1, content: homePageOverlayContents[activeSection.index - 1] })
      }
    })

    if (mainElement.scrollTop - threshold < sections[activeSection.index].offsetTop && mainElement.scrollTop >= sections[activeSection.index].offsetTop) {
      overlayElement.style.opacity = 1
    }
    if (mainElement.scrollTop > sections[activeSection.index].offsetTop + threshold || mainElement.scrollTop < sections[activeSection.index].offsetTop - threshold) {
      overlayElement.style.opacity = 0
    }

    document.lastScrollPosition = mainElement.scrollTop
  }

  return <div ref={root}>
    <Head>
      <title>Tesla Clone</title>
    </Head>

    <header className={"fixed w-screen z-20"}>
      <DesktopTopBanner/>
      <DesktopNavbar theme={activeSection.index === 0 ? "light" : "dark"}/>
    </header>

    <main className={"main-container w-screen h-screen flex flex-col overflow-y-scroll snap-y snap-mandatory"}>
      <div
        className={`overlay sticky top-0 left-0 flex justify-center z-10 w-screen h-screen shrink-0 transition duration-100 ${activeSection.index === 0 ? "text-white" : "text-neutral-900"}`}
        style={{ opacity: 1 }}>
        <div className={"animate-by-scroll absolute text-center"}
             style={{ marginTop: `calc(18vh + ${isMobile ? "36" : "2"}px)` }}>
          <h1 className={"font-medium w-fit mx-auto text-4xl sm:text-4.5xl mb-2"}>{activeSection.content.title}</h1>
          {activeSection.content.subTitles.length > 0 ? activeSection.content.subTitles.map((subTitle, index) => (
            <h4
              key={index}
              className={`font-light w-fit mx-auto text-sm leading-5 mb-0.5 ${subTitle.hasOwnProperty("link") && subTitle.link !== null ? "link" : ""}`}
            >
              {subTitle.title}
            </h4>
          )) : null}
        </div>

        <div
          className={"animate-by-scroll buttons absolute flex flex-col sm:flex-row sm:justify-center w-full px-6 gap-x-6 gap-y-4 absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2"}>
          {activeSection.content.CTAs.map((cta, index) => (
            <CTA
              key={index}
              label={cta.label}
              link={cta.link}
              theme={cta.theme}
              type={cta.type || "contained"}
            />
          ))}
        </div>
      </div>

      <section className={"homepage-hero w-screen h-screen relative shrink-0 snap-start snap-always"}>
        <video
          className={"absolute top-0 left-0 h-full w-full object-cover"}
          preload="auto"
          playsInline=""
          data-autoplay-desktop="true"
          data-autoplay-portrait="true"
          data-autoplay-mobile="true"
          data-play-on-hover="false"
          muted
          loop
          data-src-desktop="/static/images/test-drive/Homepage-Test_Drive-NA-Desktop.mp4"
          data-src-portrait="/static/images/test-drive/Homepage-Test_Drive-NA-Desktop.mp4"
          data-src-mobile="/static/images/test-drive/Homepage-Test_Drive-NA-Mobile.mp4"
          data-src="/static/images/test-drive/Homepage-Test_Drive-NA-Desktop.mp4"
          src="/static/images/test-drive/Homepage-Test_Drive-NA-Desktop.mp4"
          data-loaded
          autoPlay
        ></video>
      </section>

      <section className={"homepage-hero w-screen h-screen relative shrink-0 snap-start snap-always"}>
        <picture
          className={"absolute top-0 left-0 h-full w-full object-none"}
          data-alt="Red Model 3 parked on weathered concrete in front of a cityscape"
          data-iesrc="/static/images/model-3/Homepage-Model-3-Desktop-LHD.png">
          <source
            srcSet="/static/images/model-3/Homepage-Model-3-LHD-Mobile.png"
            media="(max-width: 599px)"/>
          <source
            srcSet="/static/images/model-3/Homepage-Model-3-Desktop-LHD.png"
            media="(min-width: 600px)"/>
          <source
            srcSet="/static/images/model-3/Homepage-Model-3-LHD-Mobile.png"
            media="(min-width: 600px) and (orientation:portrait)"/>
          <img
            src="/static/images/model-3/Homepage-Model-3-Desktop-LHD.png"
            srcSet="/static/images/model-3/Homepage-Model-3-Desktop-LHD.png"
            alt="Red Model 3 parked on weathered concrete in front of a cityscape"
            className="w-full h-full object-cover"/>
        </picture>
      </section>

      <section className={"homepage-hero w-screen h-screen relative shrink-0 snap-start snap-always"}>
        <picture
          className={"absolute top-0 left-0 h-full w-full object-none"}
          data-alt="Metallic blue Model Y driving down a hillside highway"
          data-iesrc="/static/images/model-y/Homepage-Model-Y-Global-Desktop.png">
          <source
            srcSet="/static/images/model-y/Homepage-ModelY-LHD-Mobile.png"
            media="(max-width: 599px)"/>
          <source
            srcSet="/static/images/model-y/Homepage-Model-Y-Global-Desktop.png"
            media="(min-width: 600px)"/>
          <source
            srcSet="/static/images/model-y/Homepage-ModelY-LHD-Mobile.png"
            media="(min-width: 600px) and (orientation:portrait)"/>
          <img
            src="/static/images/model-y/Homepage-Model-Y-Global-Desktop.png"
            srcSet="/static/images/model-y/Homepage-Model-Y-Global-Desktop.png"
            alt="Metallic blue Model Y driving down a hillside highway"
            className="w-full h-full object-cover"/>
        </picture>
      </section>

      <section className={"homepage-hero w-screen h-screen relative shrink-0 snap-start snap-always"}>
        <picture
          className={"absolute top-0 left-0 h-full w-full object-none"}
          data-alt="Solid black Model S accelerating on an elevated highway	"
          data-iesrc="/static/images/model-s/Model-S-homepage-desktop.png">
          <source
            srcSet="/static/images/model-s/Model-S-homepage-mobile.png"
            media="(max-width: 599px)"/>
          <source
            srcSet="/static/images/model-s/Model-S-homepage-desktop.png"
            media="(min-width: 600px)"/>
          <source
            srcSet="/static/images/model-s/Model-S-homepage-mobile.png"
            media="(min-width: 600px) and (orientation:portrait)"/>
          <img
            src="/static/images/model-s/Model-S-homepage-desktop.png"
            srcSet="/static/images/model-s/Model-S-homepage-desktop.png"
            alt="Solid black Model S accelerating on an elevated highway	"
            className="w-full h-full object-cover"/>
        </picture>
      </section>

      <section className={"homepage-hero w-screen h-screen relative shrink-0 snap-start snap-always"}>
        <picture
          className={"absolute top-0 left-0 h-full w-full object-none"}
          data-alt="Pearl white Model X navigating a mountainous road"
          data-iesrc="/static/images/model-x/Homepage-Model-X-Desktop-LHD.png">
          <source
            srcSet="/static/images/model-x/Homepage-Model-X-Mobile-LHD_001.png"
            media="(max-width: 599px)"/>
          <source
            srcSet="https://digitalassets.tesla.com/tesla-contents/image/upload/h_1800,w_2880,c_fit,f_auto,q_auto:best/Homepage-Model-X-Desktop-LHD"
            media="(min-width: 600px)"/>
          <source
            srcSet="/static/images/model-x/Homepage-Model-X-Mobile-LHD_001.png"
            media="(min-width: 600px) and (orientation:portrait)"/>
          <img
            src="/static/images/model-x/Homepage-Model-X-Desktop-LHD.png"
            srcSet="/static/images/model-x/Homepage-Model-X-Desktop-LHD.png"
            alt="Pearl white Model X navigating a mountainous road"
            className="w-full h-full object-cover"/>
        </picture>
      </section>

      <section className={"homepage-hero w-screen h-screen relative shrink-0 snap-start snap-always"}>
        <picture
          className={"absolute top-0 left-0 h-full w-full object-none"}
          data-alt="Ranch style home powered by Tesla solar panels and Powerwall"
          data-iesrc="/static/images/solar-panels/425_HP_SolarPanels_D.png">
          <source
            srcSet="/static/images/solar-panels/Homepage-SolarPanels-Mobile.png"
            media="(max-width: 599px)"/>
          <source
            srcSet="/static/images/solar-panels/425_HP_SolarPanels_D.png"
            media="(min-width: 600px)"/>
          <source
            srcSet="/static/images/solar-panels/Homepage-SolarPanels-Mobile.png"
            media="(min-width: 600px) and (orientation:portrait)"/>
          <img
            src="/static/images/solar-panels/425_HP_SolarPanels_D.png"
            srcSet="/static/images/solar-panels/425_HP_SolarPanels_D.png"
            alt="Ranch style home powered by Tesla solar panels and Powerwall"
            className="w-full h-full object-cover"/>
        </picture>
      </section>

      <section className={"homepage-hero w-screen h-screen relative shrink-0 snap-start snap-always"}>
        <picture
          className={"absolute top-0 left-0 h-full w-full object-none"}
          data-alt="Home outfitted with Tesla Solar Roof"
          data-iesrc="/static/images/solar-roof/Homepage-SolarRoof-Desktop-Global.png">
          <source
            srcSet="/static/images/solar-roof/Homepage-SolarRoof-Mobile.png"
            media="(max-width: 599px)"/>
          <source
            srcSet="/static/images/solar-roof/Homepage-SolarRoof-Desktop-Global.png"
            media="(min-width: 600px)"/>
          <source
            srcSet="/static/images/solar-roof/Homepage-SolarRoof-Mobile.png"
            media="(min-width: 600px) and (orientation:portrait)"/>
          <img
            src="/static/images/solar-roof/Homepage-SolarRoof-Desktop-Global.png"
            srcSet="/static/images/solar-roof/Homepage-SolarRoof-Desktop-Global.png"
            alt="Home outfitted with Tesla Solar Roof"
            className="w-full h-full object-cover"/>
        </picture>
      </section>

      <section className={"homepage-hero w-screen h-screen relative shrink-0 snap-start snap-always"}>
        <picture
          className={"absolute top-0 left-0 h-full w-full object-none"}
          data-alt="Gen 3 Wall Connector with tempered white glass faceplate"
          data-iesrc="/static/images/accessories/Desktop_Accessories.png">
          <source
            srcSet="/static/images/accessories/Homepage-Accessories-Mobile.png"
            media="(max-width: 599px)"/>
          <source
            srcSet="/static/images/accessories/Desktop_Accessories.png"
            media="(min-width: 600px)"/>
          <source
            srcSet="/static/images/accessories/Homepage-Accessories-Mobile.png"
            media="(min-width: 600px) and (orientation:portrait)"/>
          <img
            src="/static/images/accessories/Desktop_Accessories.png"
            srcSet="/static/images/accessories/Desktop_Accessories.png"
            alt="Gen 3 Wall Connector with tempered white glass faceplate"
            className="w-full h-full object-cover"/>
        </picture>
      </section>
    </main>

    <footer className={"sm:fixed bottom-0 w-screen flex justify-center"}>
      {activeSection.index === homePageOverlayContents.length - 1 ?
        <ol className={"flex flex-col sm:flex-row justify-center gap-y-1 items-center shrink-0"}>
          {footerItems.map(item => (
            (!isMobile || (isMobile && item.mandatory === true)) &&
            <li key={item.id} className={"text-xs text-neutral-600 font-normal py-1 px-2"}>
              <Link
                href={item.link}
              >
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ol> : null}
    </footer>
  </div>
}
