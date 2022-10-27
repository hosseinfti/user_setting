import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Typography,
  SvgIconTypeMap,
  Link,
  IconButton,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import telegram from "@mui/icons-material/Telegram";
import linkedIn from "@mui/icons-material/LinkedIn";
import instagram from "@mui/icons-material/Instagram";
import twitter from "@mui/icons-material/Twitter";
import website from "@mui/icons-material/Public";
import facebook from "@mui/icons-material/Facebook";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ListItem from "../components/ListItem";
import translate from "../i18n/translate";
import { userContext } from "./_app";
import MyCollapse from "../components/collapse/MyCollapse";

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
  const [contacts, setContacts] = useState<Array<contactType | undefined>>();
  const [isCollapse, setIsCollapse] = useState<boolean>(false);

  useEffect(() => {
    let loadedContact = JSON.stringify(contacts);
    if (loadedContact && loadedContact.length > 0) {
      localStorage.setItem("contacts", loadedContact);
    }
  }, [contacts]);

  useEffect(() => {
    let loadedContact = localStorage.getItem("contacts");
    if (loadedContact && loadedContact.length > 0) {
      setContacts(JSON.parse(loadedContact));
    }
  }, []);

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
              {context?.theme === "dark" ? (
                <IconButton>
                  <DarkModeOutlinedIcon
                    onClick={() => {
                      context?.setTheme("light");
                    }}
                  />
                </IconButton>
              ) : (
                <IconButton sx={{ color: "#000000" }}>
                  <LightModeIcon
                    onClick={() => {
                      context?.setTheme("dark");
                    }}
                  />
                </IconButton>
              )}
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
            {translate("contacts")}
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
          <MyCollapse
            setIsOpen={(bool) => {
              setIsCollapse(bool);
            }}
            isOpen={isCollapse}
            onChange={(collapseInfo) => {
              if (collapseInfo) {
                collapseInfo.id = String(new Date().valueOf());
                if (contacts) {
                  contacts.push(collapseInfo);
                  setContacts([...contacts]);
                }
              }
            }}
          />
          {contacts &&
            contacts.map((contact, index) => {
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
