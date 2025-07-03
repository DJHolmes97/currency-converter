import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Home from "../app/page"
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query"
import { server } from "../utils/msw-test-server"
import { console } from "inspector"

const queryCache = new QueryCache()
beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  queryCache.clear()
})
afterAll(() => server.close())

const renderWithClient = (ui: React.ReactNode) => {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
}

describe("CurrencyConverter", () => {
  it("renders the main heading", () => {
    renderWithClient(<Home />)
    expect(screen.getByText(/Currency Converter/i)).toBeInTheDocument()
  })

  it("renders currency dropdowns with correct options", async () => {
    const result = renderWithClient(<Home />)

    // Wait for the currency list API to load and dropdowns to be populated
    await waitFor(
      async () => {
        // First wait for dropdowns to be present
        expect(
          result.getByLabelText(/Select currency to convert from/i)
        ).toBeInTheDocument()
        expect(
          result.getByLabelText(/Select currency to convert to/i)
        ).toBeInTheDocument()

        // Then wait for the currency options to be loaded and default values set
        expect(result.getByText(/British Pound \(GBP\)/)).toBeInTheDocument()
        expect(result.getByText(/US Dollar \(USD\)/)).toBeInTheDocument()

        const fromDropdown = result.getByLabelText(
          /Select currency to convert from/i
        )
        fireEvent.mouseDown(fromDropdown)
        expect(result.getByText(/Euro \(EUR\)/)).toBeInTheDocument()
      },
      { timeout: 3000 } // Give more time for API calls to complete
    )
  })

  it("swaps currencies when swap button is clicked", async () => {
    renderWithClient(<Home />)

    // Wait for currency list to load and default values to be set
    await waitFor(
      () => {
        expect(
          screen.getByLabelText(/Select currency to convert from/i)
        ).toBeInTheDocument()
        expect(screen.getByTestId("from-currency-dropdown")).toHaveValue("GBP")
        expect(screen.getByTestId("to-currency-dropdown")).toHaveValue("USD")
      },
      { timeout: 3000 }
    )

    const swapButton = screen.getByRole("button", { name: /Swap currencies/i })
    fireEvent.click(swapButton)

    // After swap, from should be USD, to should be GBP
    await waitFor(
      () => {
        expect(screen.getByTestId("from-currency-dropdown")).toHaveValue("USD")
        expect(screen.getByTestId("to-currency-dropdown")).toHaveValue("GBP")
      },
      { timeout: 3000 }
    )

    fireEvent.click(swapButton)

    // After second swap, from should be back to GBP, to should be USD
    await waitFor(
      () => {
        expect(screen.getByTestId("from-currency-dropdown")).toHaveValue("GBP")
        expect(screen.getByTestId("to-currency-dropdown")).toHaveValue("USD")
      },
      { timeout: 3000 }
    )
  })

  it("allows entering an amount and disables non-numeric input", async () => {
    renderWithClient(<Home />)

    // Wait for component to fully load
    await waitFor(
      () => {
        expect(
          screen.getByPlaceholderText("Enter amount to convert")
        ).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    const input = screen.getByPlaceholderText("Enter amount to convert")
    fireEvent.change(input, { target: { value: "123.45" } })
    expect(input).toHaveValue("123.45")
    fireEvent.change(input, { target: { value: "abc" } })
    expect(input).toHaveValue("123.45") // Should not accept non-numeric
  })

  it("shows conversion result after clicking Convert", async () => {
    renderWithClient(<Home />)

    console.debug("Convert button clicked")
    // Wait for component to fully load with default currencies
    await waitFor(
      () => {
        expect(screen.getByTestId("from-currency-dropdown")).toHaveValue("GBP")
        expect(screen.getByTestId("to-currency-dropdown")).toHaveValue("USD")
      },
      { timeout: 3000 }
    )

    const input = screen.getByPlaceholderText("Enter amount to convert")
    fireEvent.change(input, { target: { value: "10" } })

    const convertBtn = screen.getByRole("button", { name: /Convert/i })
    fireEvent.click(convertBtn)
    // Wait for conversion API to complete and result to be displayed
    await waitFor(
      () => {
        const resultInput = screen.getByPlaceholderText("Conversion result")
        expect(resultInput).toHaveValue("12.00") // 10 GBP * 1.2 = 12 USD
      },
      { timeout: 3000 }
    )
  })

  it("disables the correct options in dropdowns", async () => {
    renderWithClient(<Home />)

    // Wait for currency list to load and default values to be set
    await waitFor(
      () => {
        console.log("test")
        expect(
          screen.getByLabelText(/Select currency to convert from/i)
        ).toBeInTheDocument()
        expect(screen.getByTestId("from-currency-dropdown")).toHaveValue("GBP")
        expect(screen.getByTestId("to-currency-dropdown")).toHaveValue("USD")
      },
      { timeout: 3000 }
    )

    const fromDropdown = screen.getByLabelText(
      /Select currency to convert from/i
    )
    fireEvent.mouseDown(fromDropdown)

    const dropdownOptions = screen.getAllByRole("option")
    expect(dropdownOptions).toHaveLength(4) // 4 currencies in the mock
    const USDOption = dropdownOptions.find((option) =>
      option.textContent?.includes("USD")
    ) as HTMLOptionElement | undefined
    expect(USDOption).toBeInTheDocument()
    expect(USDOption?.ariaDisabled).toBe("true")
  })
})
