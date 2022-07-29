import { FC, useState, useEffect } from "react"
import { useMove } from "./hooks"
import Wall from "./components/wall"
import Fly from "./components/fly"
import Logo from "./components/logo"
import Poster from "./components/poster"
import styles from "./app.module.scss"

const App: FC = () => {
  const move = useMove()
  const [paused, setPaused] = useState<boolean>(true)

  useEffect(
    () => document.querySelector("html")?.classList.add(styles.html),
    []
  )

  return (
    <>
      <Wall paused={paused} move={move} />
      <Poster />
      <div className={`${styles.placeholder} ${paused ? styles.active : ""}`}>
        <Logo />
      </div>
      <div className={`${styles.placeholder} ${!paused ? styles.active : ""}`}>
        <Fly move={move} />
      </div>
      <button
        type="button"
        autoFocus={true}
        className={styles.pause}
        onClick={() => setPaused(!paused)}
      />
    </>
  )
}

export default App
