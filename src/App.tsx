import { FC, useState, useEffect, useRef } from "react"
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

  const appRef = useRef<HTMLDivElement | null>(null)

  const handleClick = () => {
    //appRef.current?.requestFullscreen()
    window.scrollTo(5000, 5000)
    setPaused(!paused)
  }

  return (
    <div ref={appRef}>
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
      />
    </div>
  )
}

export default App
