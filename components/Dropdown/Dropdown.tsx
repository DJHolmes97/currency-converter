import * as React from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"

type DropdownProps = {
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string; isDisabled?: boolean }>
  id: string
  label: string
  testid?: string
}

export const Dropdown = ({
  value,
  onChange,
  options,
  id,
  label,
  testid,
}: DropdownProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={`${id}-select`}
        value={value}
        label={label}
        onChange={handleChange}
        inputProps={{ "data-testid": testid }}
      >
        {options?.map((option) => (
          <MenuItem
            disabled={option.isDisabled}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
