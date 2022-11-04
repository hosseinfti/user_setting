import { Button, Collapse, TextField } from "@mui/material";
import { Box } from "@mui/system";
import MySelect from "../select/MySelect";
import React, { useEffect, useRef, useState } from "react";
import { contactType, platforms } from "../../pages";
import translate from "../../i18n/translate";
import { storeType } from "../../store/store";
import { useAppSelector } from "../../store/MyProvider";

interface Props {
  defaultData?: contactType | undefined;
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  onChange: (data: contactType | undefined) => void;
  allData?: contactType[];
}

const MyCollapse = (props: Props) => {
  const { isOpen, setIsOpen, onChange, defaultData, allData } = props;
  const [collapseInfo, setCollapseInfo] = useState<contactType | undefined>(
    defaultData
  );
  const [valid, setValid] = useState<boolean>(false);
  const [isExist, setIsExist] = useState<boolean>(false);
  const locale = useAppSelector((state: storeType) => state.locale);
  const textFiledRef = useRef(null);

  const myHelperText = () => {
    if (textFiledRef.current) {
      if (isExist) {
        return translate("cant_be_Repetitious");
      } else {
        return translate("should_url");
      }
    } else {
      return translate("required_field");
    }
  };
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

  useEffect(() => {
    if (allData) {
      let Index = allData.findIndex((_data) => {
        return (
          _data?.link === collapseInfo?.link &&
          _data?.type === collapseInfo?.type
        );
      });
      if (Index > 0) {
        setIsExist(true);
      } else {
        setIsExist(false);
      }
    }
  }, [collapseInfo, allData]);

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
            error={!valid || isExist}
            helperText={myHelperText()}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: locale.locale === "fa-ir" ? "end" : "start",
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
            disabled={
              !collapseInfo?.type || !collapseInfo?.link || !valid || isExist
            }
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
