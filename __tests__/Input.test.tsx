import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Input } from "../components/Input/Input"

describe("Input component", () => {
  it("renders with the given placeholder", () => {
    render(<Input placeholder="Enter value" />)
    expect(screen.getByPlaceholderText("Enter value")).toBeInTheDocument()
  })

  it("renders with the given value", () => {
    render(<Input value="123" />)
    expect(screen.getByDisplayValue("123")).toBeInTheDocument()
  })

  it("calls onChange when input changes", () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "abc" } })
    expect(handleChange).toHaveBeenCalled()
  })

  it("is disabled when isDisabled is true", () => {
    render(<Input isDisabled />)
    expect(screen.getByRole("textbox")).toBeDisabled()
  })

  it("uses outlined variant", () => {
    render(<Input />)
    const input = screen.getByRole("textbox")
    // MUI adds data-testid="outlined-input" to the input element for outlined variant
    expect(input.parentElement?.className).toMatch(/MuiOutlinedInput-root/)
  })
})
