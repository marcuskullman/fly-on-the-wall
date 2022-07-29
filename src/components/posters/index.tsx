import { CSSProperties, FC } from "react"
import styles from "./posters.module.scss"
import Poster1 from "./poster1.png"
import Poster2 from "./poster2.png"

interface Poster {
  src: string
  top: number
  left: number
  rotation: number
}

export const posters: Poster[] = [
  {
    src: Poster1,
    top: 4000,
    left: 4000,
    rotation: -1,
  },
  {
    src: Poster2,
    top: 6000,
    left: 6000,
    rotation: 3,
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
