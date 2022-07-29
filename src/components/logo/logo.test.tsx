import { render, screen } from "@testing-library/react"
import Logo from "./"

describe("COMPONENT: Logo", () => {
  test("Renders", () => {
    render(<Logo />)
    const logo = screen.getByRole("img") as HTMLImageElement
    expect(logo).toHaveAttribute("src", "logo.png")
    expect(logo).toHaveAttribute("alt", "Logo")
    expect(logo).toHaveClass("logo")
  })
})
