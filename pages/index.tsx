import React, { useEffect, useRef, useState } from "react";
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

export interface contactType {
  id: string;
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
  const [contacts, setContacts] = useState<Array<contactType>>([
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
  const platforms: selectType[] = [
    { value: "twitter", label: "توییتر", icon: twitter },
    { value: "instagram", label: "اینستاگرام", icon: instagram },
    { value: "facebook", label: "فیسبوک", icon: facebook },
    { value: "telegram", label: "تلگرام", icon: telegram },
    { value: "linkedin", label: "لینکدین", icon: linkedIn },
    { value: "website", label: "وب‌سایت", icon: website },
  ];

  const textFiledRef = useRef();

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
  const handleValidate = (e) => {
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
            <Typography variant="h5">تنظیمات کاربری</Typography>
            <Box sx={{ display: "flex", gap: "1em", marginTop: "3em" }}>
              <Link sx={{ textDecoration: "none" }}>
                <Typography>خانه</Typography>
              </Link>
              <Link sx={{ textDecoration: "none" }}>
                <Typography>کاربر</Typography>
              </Link>
              <Link sx={{ textDecoration: "none" }}>
                <Typography>تنظیمات کاربری</Typography>
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
              <Button>فارسی</Button>
              <Button>English</Button>
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
            مسیر های ارتباطی
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Button
              onClick={() => {
                setIsCollapse(true);
              }}
              sx={{ marginBlock: "1em" }}
            >
              افزودن مسیر ارتباطی
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
                  helperText="این فیلد اجباری است"
                  label={"نوع"}
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
                  label={"لینک"}
                  required
                  error={!valid}
                  helperText={
                    textFiledRef.current
                      ? "محتوای وارد شده باید از جنس آدرس اینترنتی باشد"
                      : "این فیلد الزامی است"
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
                  انصراف
                </Button>
                <Button
                  onClick={() => {
                    collapseInfo.id = String(new Date().valueOf());
                    contacts.push(collapseInfo);
                    setContacts([...contacts]);
                    handleCollapse(false);
                  }}
                  disabled={
                    !collapseInfo?.type || !collapseInfo?.link || !valid
                  }
                  variant="contained"
                >
                  ثبت راه ارتباطی
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
