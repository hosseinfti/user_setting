import {
  FormControl,
  InputAdornment,
  TextField,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import React, { useEffect, useState } from "react";

interface Props {
  value: string | undefined;
  onChange: (value: string) => void;
}

const SearchInput = (props: Props) => {
  const [showClearIcon, setShowClearIcon] = useState<"none" | "inline-block">(
    "none"
  );

  useEffect(() => {
    if (props.value) {
      setShowClearIcon("inline-block");
    } else {
      setShowClearIcon("none");
    }
  }, [props.value]);

  return (
    <FormControl sx={{ marginBlock: "1em" }}>
      <TextField
        variant="outlined"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              style={{
                height: "2.5em",
                maxHeight: "2.5em",
                display: showClearIcon,
              }}
              onClick={() => props.onChange("")}
            >
              <IconButton>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

export default SearchInput;
