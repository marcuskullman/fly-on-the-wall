import {
  useEffect,
  useState,
  useReducer,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
} from "react"

interface State {
  arrowup: boolean
  arrowdown: boolean
  arrowleft: boolean
  arrowright: boolean
  w: boolean
  a: boolean
  d: boolean
  s: boolean
}

interface Action extends Partial<State> {}

export interface Move {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
  lastDirectionWasVertical?: boolean
}

const types: any = {
  keyDown: "keydown",
  keyUp: "keyup",
  wheel: "wheel",
}

const up = ["arrowup", "w"]
const down = ["arrowdown", "s"]
const left = ["arrowleft", "a"]
const right = ["arrowright", "d"]

const test = (a: string[], b: string[], keys: string[]): boolean =>
  a.some(key => keys.includes(key)) && !b.some(key => keys.includes(key))

export const useMove = (): Move | void => {
  const [move, setMove] = useState<Move>({
    up: false,
    down: false,
    left: false,
    right: false,
  })

  const [state, setState] = useReducer(
    (state: State, action: Action) => ({
      ...state,
      ...action,
    }),
    {
      arrowup: false,
      arrowdown: false,
      arrowleft: false,
      arrowright: false,
      w: false,
      a: false,
      d: false,
      s: false,
    }
  )

  const [lastDirectionWasVertical, setLastDirectionWasVertical] = useState<
    boolean | undefined
  >(undefined)

  useEffect(() => {
    const { keyDown, keyUp, wheel } = types
    const keyboardHandler: KeyboardEventHandler = (
      e: KeyboardEvent
    ): boolean | void => {
      e.preventDefault()

      const { key, type, repeat } = e

      return !repeat && setState({ [key.toLowerCase()]: type === keyDown })
    }

    const mouseHandler: MouseEventHandler = (e: MouseEvent): void =>
      e.preventDefault()

    window.addEventListener(keyDown, (e: KeyboardEvent) => keyboardHandler(e))
    window.addEventListener(keyUp, (e: KeyboardEvent) => keyboardHandler(e))
    window.addEventListener(wheel, (e: MouseEvent) => mouseHandler(e), {
      passive: false,
    })

    return () => {
      window.removeEventListener(keyDown, keyboardHandler)
      window.removeEventListener(keyUp, keyboardHandler)
      window.removeEventListener(wheel, mouseHandler)
    }
  }, [])

  useEffect(() => {
    const keys = [
      ...new Map(Object.entries(state).filter(key => key[1])).keys(),
    ]

    const newMove = {
      up: test(up, down, keys),
      left: test(left, right, keys),
      right: test(right, left, keys),
      down: test(down, up, keys),
    }

    setMove({
      ...newMove,
      lastDirectionWasVertical,
    })

    setLastDirectionWasVertical(newMove.up || newMove.down)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  if (Object.values(move).some(value => value)) {
    return move as Move
  }
}
