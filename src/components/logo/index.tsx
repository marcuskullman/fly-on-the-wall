import { FC } from "react"
import logo from "./logo.png"
import styles from "./logo.module.scss"

const Logo: FC = () => <img src={logo} alt="Logo" className={styles.logo} />

export default Logo
