import React, { ReactElement, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/lab";
import { IconButton, InputAdornment, SvgIconTypeMap } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Box } from "@mui/system";
import translate from "../../i18n/translate";

type OptionValue = string | number | readonly string[] | undefined;

type Option<T extends OptionValue> = {
  value?: T;
  label?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
};

type Props<T extends OptionValue> = {
  options: Option<T>[];
  value?: T;
  defaultValue?: T;
  onChange: (value: T) => void;
  placeholder?: string;
  sx?: object;
  id: string;
  isLoading?: boolean;
  size?: "small" | "medium";
  key?: string;
  label?: string;
  required?: boolean;
  helperText?: string;
};

function Select<T extends OptionValue>(props: Props<T>) {
  const {
    options,
    sx = {},
    onChange,
    value,
    defaultValue,
    placeholder = "",
    id,
    isLoading = true,
    size,
    label,
    required,
    helperText,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChangeValue = (newValue: T) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <Autocomplete<Option<T>>
      className={"MyAutoComplete"}
      onChange={(e: any, newValue) => {
        if (newValue && newValue.value) {
          handleChangeValue(newValue.value);
        }
      }}
      open={isOpen}
      openOnFocus={true}
      forcePopupIcon={true}
      onOpen={(e) => {
        setIsOpen(true);
      }}
      onBlur={(e) => {
        setIsOpen(false);
      }}
      loading={isLoading}
      loadingText={<div>در حال دریافت</div>}
      size={size}
      sx={{ ...sx, paddingRight: "0" }}
      id={id}
      options={options}
      key={JSON.stringify(options)}
      isOptionEqualToValue={(newValue, option) =>
        newValue?.value === option?.value
      }
      defaultValue={
        defaultValue && {
          value: defaultValue,
          label: options.find((option) => option.value === defaultValue)?.label,
        }
      }
      value={
        value && {
          value: value,
          label: options.find((option) => option.value === value)?.label,
        }
      }
      getOptionLabel={(option) => option.label || `${option.value}`}
      renderOption={(props, option) => {
        return (
          <li value={option.value} {...props} key={`${option.value}`}>
            {option.icon && (
              <Box sx={{ marginRight: "1em" }}>
                <option.icon />
              </Box>
            )}
            {translate(option.label) || `${translate(option.value)}`}
          </li>
        );
      }}
      renderInput={(params) => {
        return (
          <TextField
            required={required}
            helperText={translate(helperText)}
            value={value}
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment sx={{ paddingRight: 0 }} position={"start"}>
                  <IconButton
                    sx={{ opacity: 0.5 }}
                    onClick={() => {
                      if (isOpen) {
                        setIsOpen(false);
                      } else {
                        setIsOpen(true);
                      }
                    }}
                  >
                    {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder={`${translate(placeholder)}`}
            label={translate(label)}
          />
        );
      }}
    />
  );
}

export default Select;
