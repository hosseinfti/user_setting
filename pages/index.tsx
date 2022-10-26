import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Collapse,
  SvgIconTypeMap,
  Link,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import MySelect from "../components/select/MySelect";
import telegram from "@mui/icons-material/Telegram";
import linkedIn from "@mui/icons-material/LinkedIn";
import instagram from "@mui/icons-material/Instagram";
import twitter from "@mui/icons-material/Twitter";
import website from "@mui/icons-material/Public";
import facebook from "@mui/icons-material/Facebook";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ListItem from "../components/ListItem";
import translate from "../i18n/translate";
import { userContext } from "./_app";

export const platforms: selectType[] = [
  { value: "twitter", label: "twitter", icon: twitter },
  { value: "instagram", label: "instagram", icon: instagram },
  { value: "facebook", label: "facebook", icon: facebook },
  { value: "telegram", label: "telegram", icon: telegram },
  { value: "linkedin", label: "linkedin", icon: linkedIn },
  { value: "website", label: "website", icon: website },
];
export interface contactType {
  id?: string;
  type?: string;
  link?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}
export interface selectType {
  value: string;
  label: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export default function Home() {
  const context = useContext(userContext);
  const [contacts, setContacts] = useState<Array<contactType | undefined>>([
    {
      id: "123",
      type: "instagram",
      link: "https://www.instagram.com",
      icon: instagram,
    },
  ]);
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const [collapseInfo, setCollapseInfo] = useState<contactType | undefined>();
  const [valid, setValid] = useState<boolean>(false);

  const textFiledRef = useRef(null);

  useEffect(() => {
    setCollapseInfo(undefined);
  }, [contacts]);

  const handleCollapse = (bool: boolean) => {
    if (bool === false) {
      setCollapseInfo(undefined);
      setTimeout(() => {
        setIsCollapse(false);
      }, 1000);
    }
  };
  const handleValidate = (e: any) => {
    const reg = new RegExp(`(www|http:|https:)+[^\s]+[\w]`);
    setValid(reg.test(e.target.value));
  };

  return (
    <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        component="div"
        sx={{
          marginTop: "7em",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "10em",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5">{translate("user_setting")}</Typography>
            <Box sx={{ display: "flex", gap: "1em", marginTop: "3em" }}>
              <Link sx={{ textDecoration: "none" }}>
                <Typography>{translate("home")}</Typography>
              </Link>
              <Link sx={{ textDecoration: "none" }}>
                <Typography>{translate("user")}</Typography>
              </Link>
              <Link sx={{ textDecoration: "none" }}>
                <Typography>{translate("user_setting")}</Typography>
              </Link>
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: "1em",
              }}
            >
              <Button
                onClick={() => {
                  context?.setLocale("fa-ir");
                  document.body.style.direction = "rtl";
                }}
                variant={context?.locale === "fa-ir" ? "contained" : "outlined"}
              >
                فارسی
              </Button>
              <Button
                onClick={() => {
                  context?.setLocale("en-us");
                  document.body.style.direction = "ltr";
                }}
                variant={context?.locale === "en-us" ? "contained" : "outlined"}
              >
                English
              </Button>
              <DarkModeOutlinedIcon />
            </Box>
          </Box>
        </Box>
        <Box
          component="div"
          sx={{
            width: "100%",
            padding: "1.5em",
            backgroundColor: "grey.200",
            borderRadius: "1em",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ textAlign: "start" }} color={"text.secondary"}>
            {translate("soacials")}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Button
              onClick={() => {
                setIsCollapse(true);
              }}
              sx={{ marginBlock: "1em" }}
            >
              {translate("add_contact")}
            </Button>
          </Box>
          <Collapse in={isCollapse} timeout="auto" unmountOnExit>
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
                  justifyContent: "end",
                  marginTop: "1em",
                  gap: "0.5em",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsCollapse(false);
                    setCollapseInfo(undefined);
                  }}
                >
                  {translate("cancel")}
                </Button>
                <Button
                  onClick={() => {
                    if (collapseInfo) {
                      collapseInfo.id = String(new Date().valueOf());
                      contacts.push(collapseInfo);
                      setContacts([...contacts]);
                      handleCollapse(false);
                    }
                  }}
                  disabled={
                    !collapseInfo?.type || !collapseInfo?.link || !valid
                  }
                  variant="contained"
                >
                  {translate("submit_contact")}
                </Button>
              </Box>
            </Box>
          </Collapse>
          {contacts.map((contact, index) => {
            return (
              <ListItem
                key={index}
                contact={contact}
                onDelete={() => {
                  contacts.splice(index, 1);
                  setContacts([...contacts]);
                }}
                onChange={(collapseInfo: contactType | undefined) => {
                  contacts[index] = collapseInfo;
                  setContacts([...contacts]);
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Container>
  );
}
