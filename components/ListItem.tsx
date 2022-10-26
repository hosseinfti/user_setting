import { Box, Button, Collapse, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { contactType, platforms, selectType } from "../pages";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MySelect from "../components/select/MySelect";
import ConfirmButton from "./confirmButton/ConfirmButton";
import translate from "../i18n/translate";

interface PropType {
  contact: contactType | undefined;
  onDelete: () => void;
  onChange: (collapseInfo: contactType | undefined) => void;
}

const ListItem = (props: PropType) => {
  const { contact, onDelete, onChange } = props;

  const [collapseInfo, setCollapseInfo] = useState<contactType | undefined>(
    contact
  );
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);

  const textFiledRef = useRef(null);
  const handleValidate = (e: any) => {
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
            {/* <Box>{contact && contact.icon && <contact.icon />}</Box> */}
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
                }}
              >
                {translate("cancel")}
              </Button>
              <Button
                onClick={() => {
                  onChange(collapseInfo);
                  setIsCollapse(false);
                }}
                disabled={!collapseInfo?.type || !collapseInfo?.link || !valid}
                variant="contained"
              >
                {translate("edit_contact")}
              </Button>
            </Box>
          </Box>
        </Collapse>
      }
    </Box>
  );
};

export default ListItem;
