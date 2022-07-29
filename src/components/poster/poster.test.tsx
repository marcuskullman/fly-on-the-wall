import { render, screen } from "@testing-library/react"
import Poster from "./"

describe("COMPONENT: Poster", () => {
  test("Renders", () => {
    render(<Poster />)
    const image = screen.getByRole("img") as HTMLImageElement
    expect(image).toHaveAttribute("src", "poster.png")
    expect(image).toHaveAttribute("alt", "Poster")
    expect(image).toHaveClass("poster")
  })
})
