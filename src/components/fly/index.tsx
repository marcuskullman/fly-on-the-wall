import {
  FC,
  useEffect,
  useRef,
  useReducer,
  useCallback,
  CSSProperties,
} from "react"
import fly from "./fly.png"
import { Move } from "../../hooks/use-move"
import styles from "./fly.module.scss"

interface Props {
  paused: boolean
  move: Move | void
}

const getTimeout = (): number => 500 * (Math.floor(Math.random() * 6) + 1)
const getRotation = (): string =>
  `rotate(${Math.floor(Math.random() * (180 - -180 + 1)) + -180}deg)`

const Fly: FC<Props> = ({ move, paused }) => {
  const [state, setState] = useReducer(
    (state: CSSProperties, action: CSSProperties): CSSProperties => ({
      ...state,
      ...action,
    }),
    {
      top: 0,
      left: 0,
      transform: "none",
    }
  )

  const flyRef = useRef<HTMLImageElement | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const wait = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setState({ transform: getRotation() })
      wait()
    }, getTimeout())
  }, [])

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (!move) {
      setState({ top: 0, left: 0, transform: getRotation() })
      wait()
      return
    }

    const style = (rotation: number) =>
      setState({
        top: up ? -25 : down ? 25 : 0,
        left: left ? -25 : right ? 25 : 0,
        transform: `rotate(${rotation}deg)`,
      })

    const { up, down, left, right, lastDirectionWasVertical } = move

    if (lastDirectionWasVertical) {
      if (left) {
        style(-90)
      } else if (right) {
        style(90)
      } else if (up) {
        style(0)
      } else {
        style(180)
      }
    } else {
      if (up) {
        style(0)
      } else if (down) {
        style(180)
      } else if (left) {
        style(-90)
      } else {
        style(90)
      }
    }
  }, [move, paused, wait])

  return (
    <figure className={`${styles.figure} ${paused ? styles.paused : ""}`}>
      <img
        ref={flyRef}
        src={fly}
        alt="Fly"
        className={styles.img}
        style={state}
      />
    </figure>
  )
}

export default Fly
