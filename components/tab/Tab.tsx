import React from "react";
import { Button } from "@mui/material";
import translate from "../../i18n/translate";
import { Box } from "@mui/system";

const tab = [
  { all: "all" },
  { twitter: "twitter" },
  { instagram: "instagram" },
  { facebook: "facebook" },
  { telegram: "telegram" },
  { linkedin: "linkedin" },
  { website: "website" },
];

interface Props {
  onclick: (value: any) => void;
  active: string;
}

const Tab = (props: Props) => {
  const { onclick, active = "all" } = props;
  return (
    <Box>
      {tab.map((item, index) => {
        return (
          <Button
            sx={{ marginInline: "0.1em" }}
            key={index}
            variant={active === Object.keys(item)[0] ? "contained" : "outlined"}
            onClick={() => onclick(Object.keys(item)[0])}
          >
            {translate(Object.values(item))}
          </Button>
        );
      })}
    </Box>
  );
};

export default Tab;
