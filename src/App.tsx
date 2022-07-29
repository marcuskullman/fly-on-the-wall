import { FC, useState, useEffect } from "react"
import { useMove } from "./hooks"
import Wall from "./components/wall"
import Fly from "./components/fly"
import Logo from "./components/logo"
import Posters from "./components/posters"
import styles from "./app.module.scss"

const App: FC = () => {
  const move = useMove()
  const [paused, setPaused] = useState<boolean>(true)

  useEffect(
    () => document.querySelector("html")?.classList.add(styles.html),
    []
  )

  const handleClick = () => {
    window.scrollTo(5000, 5000)
    setPaused(!paused)
  }

  return (
    <>
      <Wall paused={paused} move={move} />
      <Posters />
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
        onClick={handleClick}
      >
        Start
      </button>
    </>
  )
}

export default App
