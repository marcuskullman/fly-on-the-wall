import { CSSProperties, FC } from "react"
import styles from "./posters.module.scss"
interface Poster {
  src: string
  top: number
  left: number
  rotation: number
}

export const posters: Poster[] = [
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

const Posters: FC = () => (
  <>
    {posters.map(({ src, top, left, rotation }: Poster) => {
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

export default Posters
