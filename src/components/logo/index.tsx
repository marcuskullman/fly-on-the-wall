import { FC } from "react"
import logo from "./logo.png"
import styles from "./logo.module.scss"

interface Props {
  paused: boolean
}

const Logo: FC<Props> = ({ paused }) => (
  <figure className={`${styles.figure} ${paused ? styles.paused : ""}`}>
    <img src={logo} alt="Logo" className={styles.logo} />
  </figure>
)

export default Logo
