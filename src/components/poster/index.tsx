import { FC } from "react"
import poster from "./poster.png"
import styles from "./poster.module.scss"

const Poster: FC = () => (
  <img src={poster} alt="Poster" className={styles.poster} />
)

export default Poster
