import { FC } from "react"
import { useAppContext } from "../../hooks"

const Level: FC = () => {
  const [{ level }] = useAppContext()

  return (
    <h1
      style={{
        zIndex: 9999,
        position: "fixed",
        top: 0,
        right: 0,
        color: "white",
        fontSize: 50,
      }}
    >
      {`Level: ${level}`}
    </h1>
  )
}

export default Level
