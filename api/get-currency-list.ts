import { useQuery } from "@tanstack/react-query"

export const getCurrencyList = () =>
  useQuery({
    queryKey: ["currencyList"],
    queryFn: async () => {
      const response = await fetch(
        "https://currency-converter-api-three.vercel.app/api/get-currency-list",
        {
          headers: {
            "x-api-token": process.env.NEXT_PUBLIC_API_TOKEN || "",
          },
        }
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return await response.json()
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  })
