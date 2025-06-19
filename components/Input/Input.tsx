import React from "react"
import TextField from "@mui/material/TextField"

type InputProps = {
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  isDisabled?: boolean
}

export const Input = ({
  placeholder,
  value,
  onChange,
  isDisabled,
}: InputProps) => {
  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      fullWidth
      disabled={isDisabled}
    />
  )
}
