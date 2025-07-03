export const getCurrencyList = () => ({
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
    const data = await response.json()

    return await data
  },
  staleTime: 1000 * 60 * 60, // 1 hour
})
