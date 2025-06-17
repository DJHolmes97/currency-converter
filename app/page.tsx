"use client"
import React from "react"
import Container from "@mui/material/Container"
import { Dropdown } from "@/components"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { getCurrencyList } from "@/api"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const CurrencyConverter = () => {
  const [selectedFromCurrency, setSelectedFromCurrency] = React.useState("USD")
  const [selectedToCurrency, setSelectedToCurrency] = React.useState("EUR")

  const { isPending, error, data, isFetching } = getCurrencyList()

  const currencyList = React.useMemo(() => {
    if (isPending || isFetching) return []
    if (error) {
      console.error("Error fetching currency list:", error)
      return []
    }
    return (
      data.reduce((acc: any[], curr: any) => {
        console.log("Currency:", curr)
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
            value={isPending ? selectedFromCurrency : "Loading..."}
            onChange={setSelectedFromCurrency}
            options={
              isPending
                ? [
                    { value: "USD", label: "US Dollar" },
                    { value: "EUR", label: "Euro" },
                    { value: "JPY", label: "Japanese Yen" },
                  ]
                : [{ value: "loading", label: "Loading..." }]
            }
            id="from-currency-dropdown"
            label="Select currency to convert from"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Dropdown
            value={isPending ? selectedToCurrency : "Loading..."}
            onChange={setSelectedToCurrency}
            options={
              isPending
                ? [
                    { value: "USD", label: "US Dollar" },
                    { value: "EUR", label: "Euro" },
                    { value: "JPY", label: "Japanese Yen" },
                  ]
                : [{ value: "loading", label: "Loading..." }]
            }
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
