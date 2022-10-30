import { Box, Button, Link, SvgIcon, Typography } from "@mui/material";
import React, { useState } from "react";
import { contactType, platforms, selectType } from "../pages";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmButton from "./confirmButton/ConfirmButton";
import translate from "../i18n/translate";
import MyCollapse from "./collapse/MyCollapse";
import telegram from "@mui/icons-material/Telegram";
import linkedIn from "@mui/icons-material/LinkedIn";
import instagram from "@mui/icons-material/Instagram";
import twitter from "@mui/icons-material/Twitter";
import website from "@mui/icons-material/Public";
import facebook from "@mui/icons-material/Facebook";

const platformIcon: any = {
  telegram: telegram,
  linkedIn: linkedIn,
  instagram: instagram,
  twitter: twitter,
  website: website,
  facebook: facebook,
};

interface PropType {
  contact: contactType | undefined;
  onDelete: () => void;
  onChange: (collapseInfo: contactType | undefined) => void;
}

const ListItem = (props: PropType) => {
  const { contact, onDelete, onChange } = props;
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
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
              flex: 1,
            }}
          >
            {contact && contact.type && (
              <SvgIcon
                sx={{ marginBottom: "0.2em" }}
                component={platformIcon[contact.type]}
              />
            )}
            <Typography> {translate("link")} : </Typography>
          </Box>
          <Link
            sx={{ flex: 3, textAlign: "right", textDecoration: "none" }}
            href={contact?.link}
          >
            <Typography sx={{ marginTop: "0.5em" }}>{contact?.link}</Typography>
          </Link>
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
              {translate("edit")}
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
                  {translate("delete")}
                </Typography>
              </Button>
            }
            description={ <Typography>
{translate("sure_to_delete_this_item")}
            </Typography>
            }
          />
        </Box>
      </Box>
      {
        <MyCollapse
          defaultData={contact}
          setIsOpen={(bool) => {
            setIsCollapse(bool);
          }}
          isOpen={isCollapse}
          onChange={(collapseInfo) => {
            if (collapseInfo) {
              onChange(collapseInfo);
              setIsCollapse(false);
            }
          }}
        />
      }
    </Box>
  );
};

export default ListItem;
