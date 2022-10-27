import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { contactType, platforms, selectType } from "../pages";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmButton from "./confirmButton/ConfirmButton";
import translate from "../i18n/translate";
import MyCollapse from "./collapse/MyCollapse";

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
            }}
          >
            <Typography>{translate(contact?.type)}</Typography>
            <Typography> {translate("link")} : </Typography>
          </Box>
          <Typography>
            <a href={contact?.link}>{contact?.link}</a>
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
            description={`${translate("sure_to_delet.item", {
              item: "this_item",
            })}`}
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
