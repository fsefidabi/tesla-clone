import { useState, useCallback, useEffect } from "react"

const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false)

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true)
    } else {
      setTargetReached(false)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(`(max-width: ${width}px)`)

      if (media.addListener) {
        media.addListener(updateTarget)
      } else {
        media.addEventListener("change", updateTarget)
      }

      if (media.matches) {
        setTargetReached(true)
      }

      return () => {
        if (media.removeListener) {
          media.removeListener(updateTarget)
        } else {
          media.removeEventListener("change", updateTarget)
        }
      }
    }
  }, [])

  return targetReached
}

export default useMediaQuery
