import { FC, useState, useEffect } from "react"
import { useMove } from "./hooks"
import Wall from "./components/wall"
import Fly from "./components/fly"
import Logo from "./components/logo"
import styles from "./app.module.scss"

const App: FC = () => {
  const move = useMove()
  const [paused, setPaused] = useState<boolean>(true)

  useEffect(() => {
    document.querySelector("html")?.classList.add(styles.html)
    window.scrollTo(5000, 5000)
  }, [])

  return (
    <>
      <Wall paused={paused} move={move} />
      <Fly paused={paused} move={move} />
      <Logo paused={paused} />
      <button
        type="button"
        autoFocus={true}
        className={styles.button}
        onClick={() => setPaused(!paused)}
      >
        {paused ? "Start" : "Pause"}
      </button>
    </>
  )
}

export default App
