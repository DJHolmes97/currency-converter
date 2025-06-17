"use client"
import React from "react"
import Container from "@mui/material/Container"
import { Dropdown } from "@/components"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { getCurrencyList } from "@/api"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"

const queryClient = new QueryClient()

const CurrencyConverter = () => {
  const [selectedFromCurrency, setSelectedFromCurrency] = React.useState("usd")
  const [selectedToCurrency, setSelectedToCurrency] = React.useState("eur")

  const { isPending, error, data, isFetching } = useQuery({
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
  console.log(data)
  const currencyList = React.useMemo(() => {
    if (isPending || isFetching) return []
    if (error) {
      console.error("Error fetching currency list:", error)
      return []
    }
    return (
      Object.keys(data).reduce((acc: any[], curr: any) => {
        acc.push({ value: curr, label: `${data[curr]} (${curr})` })
        return acc
      }, []) || []
    )
  }, [isPending, isFetching, error, data])
  return (
    <Container maxWidth="md">
      <Typography variant="h1" gutterBottom>
        Currency Converter
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Dropdown
            value={isPending ? selectedFromCurrency : "gbp"}
            onChange={setSelectedFromCurrency}
            options={currencyList}
            id="from-currency-dropdown"
            label="Select currency to convert from"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Dropdown
            value={isPending ? selectedToCurrency : "usd"}
            onChange={setSelectedToCurrency}
            options={currencyList}
            id="to-currency-dropdown"
            label="Select currency to convert to"
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginTop: 2 }}
          onClick={() => console.log("Convert clicked")}
        >
          Convert
        </Button>
      </Box>
    </Container>
  )
}

export default function Home() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <main>
          <CurrencyConverter />
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
      </QueryClientProvider>
    </div>
  )
}
