import { Button, Collapse, TextField } from "@mui/material";
import { Box } from "@mui/system";
import MySelect from "../select/MySelect";
import React, { useContext, useEffect, useRef, useState } from "react";
import { contactType, platforms } from "../../pages";
import translate from "../../i18n/translate";
import { AppContextInterface, userContext } from "../../pages/_app";

interface Props {
  defaultData?: contactType | undefined;
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  onChange: (data: contactType | undefined) => void;
}

const MyCollapse = (props: Props) => {
  const context: AppContextInterface | null = useContext(userContext);
  const { isOpen, setIsOpen, onChange, defaultData } = props;
  const [collapseInfo, setCollapseInfo] = useState<contactType | undefined>(
    defaultData
  );
  const [valid, setValid] = useState<boolean>(false);

  const textFiledRef = useRef(null);
  const handleValidate = (e: any) => {
    const reg = new RegExp(`(www|http:|https:)+[^\s]+[\w]`);
    setValid(reg.test(e.target.value));
  };

  const handleCollapse = (bool: boolean) => {
    if (bool === false) {
      setCollapseInfo(undefined);
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
  };

  return (
    <Collapse in={isOpen} timeout="auto" unmountOnExit>
      <Box
        sx={{
          width: "100%",
          padding: "1.5em",
          backgroundColor: "grey.100",
          borderRadius: "1em",
          marginBottom: "1em",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },

            gap: "1em",
          }}
        >
          <MySelect
            required
            helperText={"required_field"}
            label={"type"}
            sx={{ flex: { sm: 1 } }}
            onChange={(value) => {
              setCollapseInfo({
                ...collapseInfo,
                type: value,
              });
            }}
            options={platforms}
            id={"taggingType"}
            value={collapseInfo && collapseInfo?.type}
          />
          <TextField
            ref={textFiledRef}
            value={collapseInfo?.link}
            onChange={(e) => {
              handleValidate(e);
              setCollapseInfo({
                ...collapseInfo,
                link: e.target.value,
              });
            }}
            sx={{ flex: { sm: 3 }, direction: "rtl" }}
            label={translate("link")}
            required
            error={!valid}
            helperText={
              textFiledRef.current
                ? translate("should_url")
                : translate("required_field")
            }
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: context?.locale === "fa-ir" ? "end" : "start",
            marginTop: "1em",
            gap: "0.5em",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setIsOpen(false);
              setCollapseInfo(undefined);
            }}
          >
            {translate("cancel")}
          </Button>
          <Button
            onClick={() => {
              onChange(collapseInfo);
              handleCollapse(false);
            }}
            disabled={!collapseInfo?.type || !collapseInfo?.link || !valid}
            variant="contained"
          >
            {translate("submit_contact")}
          </Button>
        </Box>
      </Box>
    </Collapse>
  );
};

export default MyCollapse;
