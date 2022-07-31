import { CSSProperties, FC, useEffect, useState, useCallback } from "react"
import { useMove } from "../../hooks"
import styles from "./posters.module.scss"
interface Poster {
  src: string
  top: number
  left: number
  rotation: number
  found?: boolean
}

// TODO Width/ height of image is 560x560 in the code
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
    for (let i = 0; i < posters.length; i++) {
      const poster = posters[i]

      if (poster.found) break

      const { top, left } = poster
      const hover = hoverPoster(top, left)

      if (hover) {
        const clone = [...posters]
        clone[i].found = true
        setPosters(clone)
        break
      }
    }
  }, [posters])

  useEffect(() => callback, [move, callback])

  return (
    <>
      {posters?.map(({ src, top, left, rotation, found }: Poster) => {
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
            className={`${styles.poster} ${found ? styles.found : ""}`}
            style={style}
          />
        )
      })}
    </>
  )
}

export default Posters
