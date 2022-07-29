import { render, screen } from "@testing-library/react"
import Posters, { posters } from "."

describe("COMPONENT: Poster", () => {
  test("Renders", () => {
    render(<Posters />)
    const image = screen.queryAllByRole("img")[0] as HTMLImageElement
    expect(image).toHaveAttribute("alt", "Poster")
    expect(image).toHaveClass("poster")
  })

  test("Has all required properties", () => {
    for (let poster of posters) {
      expect(poster.top).toBeGreaterThanOrEqual(0)
      expect(poster.left).toBeLessThanOrEqual(10000)
      expect(poster).toHaveProperty("rotation")
      expect(poster).toHaveProperty("src")
    }
  })
})
