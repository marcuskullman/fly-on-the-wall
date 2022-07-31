import { CSSProperties, FC, useEffect, useState, useCallback } from "react"
import { useMove, useAppContext } from "../../hooks"
import styles from "./posters.module.scss"
interface Poster {
  src: string
  top: number
  left: number
  rotation: number
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
  const move = useMove()
  const [, dispatch] = useAppContext()
  const [posters, setPosters] = useState<Poster[]>(defaultPosters)

  const hoverPoster = (top: number, left: number): boolean => {
    const { scrollX, scrollY, innerWidth, innerHeight } = window
    const x = scrollX + innerWidth / 2
    const y = scrollY + innerHeight / 2
    const rangeX = x > left && x < left + 560
    const rangeY = y > top && y < top + 560

    return rangeX && rangeY
  }

  const callback = useCallback(() => {
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
  }, [posters, dispatch])

  useEffect(() => callback, [move, callback])

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
