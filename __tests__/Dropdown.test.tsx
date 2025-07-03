import * as React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Dropdown } from "../components/Dropdown/Dropdown"

describe("Dropdown", () => {
  const options = [
    { value: "usd", label: "USD" },
    { value: "eur", label: "EUR" },
    { value: "gbp", label: "GBP", isDisabled: true },
  ]

  const label = "Currency"
  const id = "currency-dropdown"

  it("renders the label", () => {
    render(
      <Dropdown
        value="usd"
        onChange={() => {}}
        options={options}
        id={id}
        label={label}
      />
    )
    expect(screen.getByLabelText(label)).toBeInTheDocument()
  })

  it("renders all options", () => {
    render(
      <Dropdown
        value="usd"
        onChange={() => {}}
        options={options}
        id={id}
        label={label}
      />
    )
    fireEvent.mouseDown(screen.getByLabelText(label))
    const list = document.querySelector("ul")
    expect(list).toHaveTextContent("USD")
    expect(list).toHaveTextContent("EUR")
    expect(list).toHaveTextContent("GBP")
  })

  it("calls onChange with the selected value", () => {
    const handleChange = jest.fn()
    render(
      <Dropdown
        value="usd"
        onChange={handleChange}
        options={options}
        id={id}
        label={label}
      />
    )
    fireEvent.mouseDown(screen.getByLabelText(label))
    fireEvent.click(screen.getByText("EUR"))
    expect(handleChange).toHaveBeenCalledWith("eur")
  })

  it("disables MenuItem when isDisabled is true", () => {
    render(
      <Dropdown
        value="usd"
        onChange={() => {}}
        options={options}
        id={id}
        label={label}
      />
    )
    fireEvent.mouseDown(screen.getByLabelText(label))
    const gbpOption = screen.getByText("GBP").closest("li")
    expect(gbpOption).toHaveAttribute("aria-disabled", "true")
  })

  it("shows the selected value", () => {
    render(
      <Dropdown
        value="eur"
        onChange={() => {}}
        options={options}
        id={id}
        label={label}
      />
    )
    expect(screen.getByText("EUR")).toBeInTheDocument()
  })
})
