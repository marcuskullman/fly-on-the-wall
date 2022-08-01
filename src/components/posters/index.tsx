import { CSSProperties, FC, useEffect, useState } from "react"
import { useAppContext } from "../../hooks"
import styles from "./posters.module.scss"
interface Poster {
  src: string
  top: number
  left: number
  rotation: number
}

const types = {
  scroll: "scroll",
  resize: "resize",
}

export const defaultPosters = [
  {
    src: require("./poster1.png"),
    top: 4000,
    left: 4000,
    rotation: -1,
  },
  {
    src: require("./poster2.png"),
    top: 6000,
    left: 6000,
    rotation: 3,
  },
  {
    src: require("./poster3.png"),
    top: 1000,
    left: 1000,
    rotation: 1,
  },
  {
    src: require("./poster4.png"),
    top: 8000,
    left: 2000,
    rotation: -2,
  },
]

const Posters: FC = () => {
  const [, dispatch] = useAppContext()
  const [posters, setPosters] = useState<Poster[]>(defaultPosters)
  const [{ width, height }, setWindowSize] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })

  const hoverPoster = (top: number, left: number): boolean => {
    const { scrollX, scrollY } = window
    const x = scrollX + width
    const y = scrollY + height
    const rangeX = x > left - 280 && x < left + 280
    const rangeY = y > top - 280 && y < top + 280

    return rangeX && rangeY
  }

  const scrollHandler = (): void => {
    for (const poster of posters) {
      const { top, left } = poster
      const hover = hoverPoster(top, left)

      if (hover) {
        const clone = [...posters]
        const index = clone.indexOf(poster)
        clone.splice(index, 1)

        setPosters(clone)

        if (!clone.length) {
          dispatch({ level: 2 })
        }

        break
      }
    }
  }

  const resizeHandler = () => {
    const { innerHeight, innerWidth } = window

    setWindowSize({ width: innerWidth / 2, height: innerHeight / 2 })
  }

  useEffect(() => {
    resizeHandler()

    const { scroll, resize } = types
    window.addEventListener(scroll, scrollHandler, { passive: false })
    window.addEventListener(resize, resizeHandler, { passive: false })

    return () => {
      window.removeEventListener(scroll, scrollHandler)
      window.removeEventListener(resize, resizeHandler)
    }
  })

  return (
    <>
      <h1
        style={{
          zIndex: 9999,
          position: "fixed",
          top: 0,
          left: 0,
          color: "white",
          fontSize: 100,
        }}
      >
        Find the posters: {posters.length}
      </h1>
      {posters?.map(({ src, top, left, rotation }: Poster) => {
        const style: CSSProperties = {
          top,
          left,
          transform: `rotate(${rotation}deg)`,
        }

        return (
          <img
            key={src}
            src={src}
            alt="Poster"
            className={styles.poster}
            style={style}
          />
        )
      })}
    </>
  )
}

export default Posters
