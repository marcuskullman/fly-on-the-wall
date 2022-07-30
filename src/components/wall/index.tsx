import { FC, useEffect, useRef } from "react"
import { Move } from "../../hooks/use-move"
import { useAppContext } from "../../hooks"
import Posters from "../posters"
import styles from "./wall.module.scss"
interface Props {
  paused: boolean
  move: Move | void
}

const Wall: FC<Props> = ({ move, paused }) => {
  const [
    {
      config: { speed },
    },
  ] = useAppContext()
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
          top: add ? scrollY + speed : scrollY - speed,
          behavior: "auto",
        })
      } else {
        scrollTo({
          left: add ? scrollX + speed : scrollX - speed,
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
  }, [move, paused, speed])

  return (
    <div className={`${styles.wall} ${move && !paused ? styles.moving : ""}`}>
      <Posters />
    </div>
  )
}

export default Wall
