import { FC, useEffect } from "react"
import { useMove, useAppContext } from "./hooks"
import Wall from "./components/wall"
import Fly from "./components/fly"
import Logo from "./components/logo"
import styles from "./app.module.scss"

const App: FC = () => {
  const move = useMove()
  const [{ paused }, dispatch] = useAppContext()

  useEffect(() => {
    document.querySelector("html")?.classList.add(styles.html)
    window.scrollTo(5000, 5000)
  }, [])

  return (
    <>
      <Wall move={move} />
      <Fly move={move} />
      <Logo />
      <button
        type="button"
        autoFocus={true}
        className={styles.button}
        onClick={() => dispatch({ paused: !paused })}
      >
        {paused ? "Start" : "Pause"}
      </button>
    </>
  )
}

export default App
