import { render, screen } from "@testing-library/react"
import Logo from "./"

describe("COMPONENT: Logo", () => {
  test("Renders", () => {
    render(<Logo />)
    const image = screen.getByRole("img") as HTMLImageElement
    expect(image).toHaveAttribute("src", "logo.png")
    expect(image).toHaveAttribute("alt", "Logo")
    expect(image).toHaveClass("logo")
  })
})
