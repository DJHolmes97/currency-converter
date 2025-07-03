import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"

export const handlers = [
  http.get(
    "https://currency-converter-api-three.vercel.app/api/get-currency-list",
    ({ request }) => {
      return HttpResponse.json(
        {
          GBP: { name: "British Pound" },
          USD: { name: "US Dollar" },
          EUR: { name: "Euro" },
          JPY: { name: "Japanese Yen" },
        },
        { status: 200 }
      )
    }
  ),
  http.get(
    "https://currency-converter-api-three.vercel.app/api/convert-currencies",
    ({ request }) => {
    const url = new URL(request.url)
    const from = url.searchParams.get("from")
    const to = url.searchParams.get("to")
    const amount = parseFloat(url.searchParams.get("amount") || "0")

    if (!from || !to || isNaN(amount)) {
      return HttpResponse.json({ error: "Invalid parameters" }, { status: 400 })
    }

    // Mock conversion logic
    const rates: Record<string, number> = {
      GBP: 1.0,
      USD: 1.2,
      EUR: 1.1,
    }

    const convertedAmount = (amount * (rates[to] / rates[from])).toFixed(2)

    return HttpResponse.json({ converted: convertedAmount })
  }),
]

export const server = setupServer(...handlers)
