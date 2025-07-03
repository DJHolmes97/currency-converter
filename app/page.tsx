"use client"
import React, { useEffect } from "react"
import Container from "@mui/material/Container"
import { Dropdown, Input } from "@/components"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"

import { getConversionResult, getCurrencyList } from "@/api"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import LoopIcon from "@mui/icons-material/Loop"

const queryClient = new QueryClient()

const CurrencyConverter = () => {
  const [selectedFromCurrency, setSelectedFromCurrency] = React.useState("")
  const [selectedToCurrency, setSelectedToCurrency] = React.useState("")
  const [amountToConvert, setAmountToConvert] = React.useState("")
  const [conversionResultData, setConversionResultData] = React.useState("")
  const currencyListResult = useQuery({
    queryKey: getCurrencyList().queryKey,
    queryFn: getCurrencyList().queryFn,
    staleTime: getCurrencyList().staleTime,
  })

  const conversionResultAPI = getConversionResult({
    to: selectedToCurrency,
    from: selectedFromCurrency,
    amount: amountToConvert,
  })

  const conversionResult = useQuery({
    queryKey: conversionResultAPI.queryKey,
    queryFn: conversionResultAPI.queryFn,
    staleTime: conversionResultAPI.staleTime,
    enabled: false, // Disable automatic fetching
  })

  const handleCurrencyChange = (
    value: string,
    setFunction: (value: React.SetStateAction<string>) => void
  ) => {
    setFunction(value)
  }
  const currencyFromList = React.useMemo(() => {
    if (currencyListResult.isPending || currencyListResult.isFetching) return []
    if (currencyListResult.error) {
      console.error("Error fetching currency list:", currencyListResult.error)
      return []
    }

    return (
      Object.keys(currencyListResult.data).reduce((acc: any[], curr: any) => {
        if (!currencyListResult.data[curr]) return acc
        acc.push({
          value: curr,
          label: `${currencyListResult.data[curr].name} (${curr})`,
          isDisabled: curr === selectedToCurrency,
        })
        return acc
      }, []) || []
    )
  }, [currencyListResult.error, currencyListResult.data, selectedToCurrency])

  const currencyToList = React.useMemo(() => {
    if (currencyListResult.isPending || currencyListResult.isFetching) return []
    if (currencyListResult.error) {
      console.error("Error fetching currency list:", currencyListResult.error)
      return []
    }

    setSelectedFromCurrency("GBP")
    setSelectedToCurrency("USD")
    return (
      Object.keys(currencyListResult.data).reduce((acc: any[], curr: any) => {
        if (!currencyListResult.data[curr]) return acc
        acc.push({
          value: curr,
          label: `${currencyListResult.data[curr].name} (${curr})`,
          isDisabled: curr === selectedFromCurrency,
        })
        return acc
      }, []) || []
    )
  }, [currencyListResult.error, currencyListResult.data])

  const handleOnClickSwap = () => {
    setSelectedFromCurrency((prev) => {
      const temp = selectedToCurrency
      setSelectedToCurrency(prev)
      return temp
    })
    setConversionResultData("")
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    // Allow only numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmountToConvert(value)
    }
  }

  const handleOnClickConvert = async () => {
    conversionResult.refetch()
  }

  useEffect(() => {
    if (conversionResult.data) {
      setConversionResultData(conversionResult.data.converted)
    }
  }, [conversionResult.data])

  return (
    <Container maxWidth="md">
      <Card sx={{ padding: 4 }}>
        <Typography
          variant="h1"
          gutterBottom
          sx={{ textAlign: "center", fontSize: "4rem" }}
        >
          Currency Converter
        </Typography>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid size={{ xs: 12, sm: 4, md: 4 }} spacing={2}>
            <Stack spacing={2}>
              <Dropdown
                value={selectedFromCurrency}
                onChange={(value) =>
                  handleCurrencyChange(value, setSelectedFromCurrency)
                }
                options={currencyFromList}
                id="from-currency-dropdown"
                label="Select currency to convert from"
                testid="from-currency-dropdown"
              />
              <Input
                placeholder="Enter amount to convert"
                value={amountToConvert}
                onChange={handleAmountChange}
              />
            </Stack>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 2, md: 2 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={handleOnClickSwap}
              aria-label="Swap currencies"
            >
              <LoopIcon />
            </IconButton>
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <Stack spacing={2}>
              <Dropdown
                value={selectedToCurrency}
                onChange={(value) =>
                  handleCurrencyChange(value, setSelectedToCurrency)
                }
                options={currencyToList}
                id="to-currency-dropdown"
                label="Select currency to convert to"
                testid="to-currency-dropdown"
              />
              <Input
                placeholder="Conversion result"
                isDisabled
                value={conversionResultData || ""}
              />
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginTop: 2 }}
            onClick={handleOnClickConvert}
          >
            Convert
          </Button>
        </Box>
      </Card>
    </Container>
  )
}

export default function Home() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <main className="bg-gray-100  min-h-screen p-4">
          <CurrencyConverter />
        </main>
      </QueryClientProvider>
    </div>
  )
}
