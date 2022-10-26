import { Box, Button, Collapse, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { contactType, selectType } from "../pages";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import telegram from "@mui/icons-material/Telegram";
import linkedIn from "@mui/icons-material/LinkedIn";
import instagram from "@mui/icons-material/Instagram";
import twitter from "@mui/icons-material/Twitter";
import website from "@mui/icons-material/Public";
import facebook from "@mui/icons-material/Facebook";
import MySelect from "../components/select/MySelect";
import ConfirmButton from "./confirmButton/ConfirmButton";

interface PropType {
  contact: contactType;
  onDelete: () => void;
  onChange: (collapseInfo: contactType) => void;
}

const ListItem = (props: PropType) => {
  const { contact, onDelete, onChange } = props;

  const [collapseInfo, setCollapseInfo] = useState<contactType>(contact);
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
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
  const handleValidate = (e) => {
    const reg = new RegExp(`(www|http:|https:)+[^\s]+[\w]`);
    setValid(reg.test(e.target.value));
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "grey.100",
        padding: { xs: "0.875em" },
        borderRadius: "1em",
        marginBottom: "1em",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "grey.100",
          padding: "1em",
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            display: "flex",
            flex: 3,
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5em",
              flexWrap: "wrap",
            }}
          >
            <Box>photo</Box>
            <Typography>{contact.type}</Typography>
            <Typography> لینک : </Typography>
          </Box>
          <Typography>
            <a href={contact.link}>{contact.link}</a>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            flex: 1,
          }}
        >
          <Button
            disabled={isCollapse}
            onClick={() => {
              setIsCollapse(true);
            }}
          >
            <EditIcon />
            <Typography sx={{ display: { xs: "none", sm: "inline-block" } }}>
              ویرایش
            </Typography>
          </Button>
          <ConfirmButton
            onSubmit={() => onDelete()}
            Render={
              <Button color="error">
                <DeleteIcon />
                <Typography
                  sx={{ display: { xs: "none", sm: "inline-block" } }}
                >
                  حذف
                </Typography>
              </Button>
            }
            description={"آیا از حذف این مورد مطئن هستید؟"}
          />
        </Box>
      </Box>
      {
        <Collapse in={isCollapse} timeout="auto" unmountOnExit>
          <Box
            sx={{
              width: "100%",
              padding: "1.5em",
              backgroundColor: "grey.300",
              borderRadius: "1em",
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
                value={collapseInfo && collapseInfo.type && collapseInfo.type}
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
                }}
              >
                انصراف
              </Button>
              <Button
                onClick={() => {
                  onChange(collapseInfo);
                  setIsCollapse(false);
                }}
                disabled={!collapseInfo?.type || !collapseInfo?.link || !valid}
                variant="contained"
              >
                ویرایش راه ارتباطی
              </Button>
            </Box>
          </Box>
        </Collapse>
      }
    </Box>
  );
};

export default ListItem;
