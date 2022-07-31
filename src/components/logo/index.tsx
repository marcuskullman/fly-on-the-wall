import { FC } from "react"
import { useAppContext } from "../../hooks"
import logo from "./logo.png"
import styles from "./logo.module.scss"

const Logo: FC = () => {
  const [{ paused }] = useAppContext()

  return (
    <figure className={`${styles.figure} ${paused ? styles.paused : ""}`}>
      <img src={logo} alt="Logo" className={styles.logo} />
    </figure>
  )
}

export default Logo
