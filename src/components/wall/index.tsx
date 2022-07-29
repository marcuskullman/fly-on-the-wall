import { FC, useEffect, useRef } from "react"
import { Move } from "../../hooks/move"
import styles from "./wall.module.scss"
interface Props {
  paused: boolean
  move: Move | void
}

// Config
const SPEED = 5

const Wall: FC<Props> = ({ move, paused }) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (!move || paused) {
      return
    }

    const loop = (vertical: boolean, add: boolean) => {
      const { scrollX, scrollY, scrollTo } = window

      if (vertical) {
        scrollTo({
          top: add ? scrollY + SPEED : scrollY - SPEED,
          behavior: "auto",
        })
      } else {
        scrollTo({
          left: add ? scrollX + SPEED : scrollX - SPEED,
          behavior: "auto",
        })
      }

      timeoutRef.current = setTimeout(() => loop(vertical, add), 0)
    }

    const { up, down, left, right, lastDirectionWasVertical } = move

    if (lastDirectionWasVertical) {
      if (left) {
        loop(false, false)
      } else if (right) {
        loop(false, true)
      } else if (up) {
        loop(true, false)
      } else {
        loop(true, true)
      }
    } else {
      if (up) {
        loop(true, false)
      } else if (down) {
        loop(true, true)
      } else if (left) {
        loop(false, false)
      } else {
        loop(false, true)
      }
    }
  }, [move, paused])

  useEffect(() => window.scrollTo(5000, 5000), [])

  return (
    <div className={`${styles.wall} ${move && !paused ? styles.active : ""}`} />
  )
}

export default Wall
