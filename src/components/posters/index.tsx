import { CSSProperties, FC, useRef } from "react"
import { useAppContext } from "../../hooks"
import styles from "./posters.module.scss"

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

/*const isOverPoster = (x: number, y: number) => {
  const { scrollX, scrollY } = window
  const rangeX = scrollX > x - 560 && scrollX < x + 560
  const rangeY = scrollY > y - 560 && scrollY < y + 560

  return rangeX && rangeY ? true : false
}*/

const Posters: FC = () => {
  // const posterRef = useRef<HTMLImageElement | null>(null)
  const [{ posters }] = useAppContext({
    posters: defaultPosters,
  })

  return (
    <>
      {posters?.map(({ src, top, left, rotation }) => {
        const style: CSSProperties = {
          top,
          left,
          transform: `rotate(${rotation}deg)`,
        }

        /*
        const styling = posterRef.current && getComputedStyle(posterRef.current)
        const width = styling?.getPropertyValue("width")
        const height = styling?.getPropertyValue("height")

        console.log(width, height)

        const test = isOverPoster(top, left)
        console.log("Test", test)
        */

        return (
          <img
            // ref={posterRef}
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
