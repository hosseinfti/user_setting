import React, { useEffect, useState } from "react";
import { Button, Typography, Link, IconButton } from "@mui/material";
import { Box, Container } from "@mui/system";
import telegram from "@mui/icons-material/Telegram";
import linkedIn from "@mui/icons-material/LinkedIn";
import instagram from "@mui/icons-material/Instagram";
import twitter from "@mui/icons-material/Twitter";
import website from "@mui/icons-material/Public";
import facebook from "@mui/icons-material/Facebook";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import ListItem from "../components/ListItem";
import translate from "../i18n/translate";
import MyCollapse from "../components/collapse/MyCollapse";
import SearchInput from "../components/search/SearchInput";
import Tab from "../components/tab/Tab";
import { useDispatch } from "react-redux";
import {
  localeActions,
  localStringsType,
  storeType,
  themeActions,
} from "../store/store";
import { useAppSelector } from "../store/MyProvider";

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
  icon?: React.ElementType<any>;
}
export interface selectType {
  value: string;
  label: string;
  icon?: React.ElementType<any>;
}

export default function Home() {
  const [contacts, setContacts] = useState<Array<contactType>>([]);
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const [searchedText, setSearchedText] = useState<string | undefined>();
  const [filteredType, setFilteredType] = useState<string>("all");

  const dispatch = useDispatch();
  const locale = useAppSelector((state: storeType) => state.locale);
  const theme = useAppSelector((state: storeType) => state.theme);

  useEffect(() => {
    if (contacts.length > 0) {
      let loadedContact = JSON.stringify(contacts);
      if (loadedContact && loadedContact.length > 0) {
        localStorage.setItem("contacts", loadedContact);
      }
    }
  }, [contacts]);

  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    if (currentLang) {
      dispatch(localeActions.setLocale(currentLang));
      document.body.style.direction = currentLang === "fa-ir" ? "rtl" : "ltr";
    }
  }, []);

  useEffect(() => {
    let loadedContact = localStorage.getItem("contacts");
    if (loadedContact && loadedContact.length > 0) {
      setContacts(JSON.parse(loadedContact));
    } else {
      setContacts([]);
    }
    let lastTheme = localStorage.getItem("theme");
    if (lastTheme) {
      dispatch(themeActions.setTheme(lastTheme));
    }
  }, []);

  const localeHandler = (e: localStringsType) => {
    dispatch(localeActions.setLocale(e));
    localStorage.setItem("lang", e);
  };

  return (
    <Container fixed sx={{ display: "flex", justifyContent: "center" }}>
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
                flexWrap: "wrap",
                gap: "1em",
              }}
            >
              <Button
                onClick={() => {
                  localeHandler("fa-ir");
                  document.body.style.direction = "rtl";
                }}
                variant={locale.locale === "fa-ir" ? "contained" : "outlined"}
              >
                فارسی
              </Button>
              <Button
                onClick={() => {
                  localeHandler("en-us");
                  document.body.style.direction = "ltr";
                }}
                variant={locale.locale === "en-us" ? "contained" : "outlined"}
              >
                English
              </Button>
              {theme.theme === "dark" ? (
                <IconButton>
                  <DarkModeOutlinedIcon
                    onClick={() => {
                      dispatch(themeActions.setTheme("light"));
                      localStorage.setItem("theme", "light");
                    }}
                  />
                </IconButton>
              ) : (
                <IconButton sx={{ color: "#000000" }}>
                  <LightModeIcon
                    onClick={() => {
                      dispatch(themeActions.setTheme("dark"));
                      localStorage.setItem("theme", "dark");
                    }}
                  />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
        <Typography
          sx={{ width: "100%", display: "flex", justifyContent: "start" }}
        >
          {translate("filteredBy")}
        </Typography>
        <Box
          sx={{
            width: "100%",
            marginBlock: "1em",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tab
            active={filteredType}
            onclick={(value) => {
              setFilteredType(value);
            }}
          />
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
          <SearchInput
            value={searchedText}
            onChange={(value: string) => setSearchedText(value)}
          />
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
                console.log(collapseInfo);
                collapseInfo.id = String(new Date().valueOf());
                contacts.push(collapseInfo);
                setContacts([...contacts]);
              }
            }}
            allData={contacts}
          />
          {contacts &&
            contacts
              .filter((category) => {
                if (filteredType !== "all") {
                  return category?.type === filteredType;
                } else {
                  return contacts;
                }
              })
              .filter((filtered) => {
                if (searchedText) {
                  return (
                    filtered?.link?.includes(searchedText) ||
                    filtered?.type?.includes(searchedText)
                  );
                } else {
                  return contacts;
                }
              })
              .map((contact, index) => {
                return (
                  <ListItem
                    key={index}
                    allContact={contacts}
                    contact={contact}
                    onDelete={() => {
                      contacts.splice(index, 1);
                      setContacts([...contacts]);
                    }}
                    onChange={(collapseInfo: contactType) => {
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
