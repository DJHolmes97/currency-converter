type GetConversionResultProps = {
  to: string
  from: string
  amount: string
}

export const getConversionResult = (props: GetConversionResultProps) => ({
  queryKey: ["conversionResult"],
  queryFn: async () => {
    const response = await fetch(
      `https://currency-converter-api-three.vercel.app/api/convert-currencies?to=${props.to}&from=${props.from}&amount=${props.amount}`,
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
