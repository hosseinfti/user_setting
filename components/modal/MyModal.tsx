import React from "react";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  isOpen?: boolean;
  showOnCloseIcon?: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  disableSubmit?: boolean;
  disableClose?: boolean;
}

const MyModal = (props: Props) => {
  const {
    isOpen = true,
    onClose,
    title = "",
    showOnCloseIcon = true,
    onSubmit,
    children,
    submitText = "submit",
    cancelText = "cancel",
    disableSubmit,
    disableClose,
  } = props;

  return (
    <Modal
      disableEscapeKeyDown={disableClose}
      keepMounted
      open={isOpen}
      onClose={onClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "100%",
          bgcolor: "background.paper",
          border: "none",
          borderRadius: "0.5em",
          boxShadow: 24,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
          }}
        >
          {(title || onClose) && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: children || onSubmit ? "1px solid" : "",
                borderBottomColor: "grey.200",
                padding: "1em 1.5em",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                  color: "text.primary",
                  lineHeight: 2.5,
                }}
              >
                {title}
              </Typography>
              {onClose && showOnCloseIcon && (
                <IconButton
                  sx={{ padding: 0 }}
                  onClick={onClose}
                  disabled={disableClose}
                >
                  <CloseIcon
                    sx={{
                      color: "grey.400",
                      margin: "0.5em",
                      fontSize: "0.85em",
                    }}
                  />
                </IconButton>
              )}
            </Box>
          )}

          {children && (
            <Box
              sx={{
                padding: "3em 1.5em",
                overflowY: "auto",
                maxHeight: "calc(100vh - 15em)",
              }}
            >
              {children}
            </Box>
          )}

          {(onSubmit || onClose) && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                borderTop:
                  (onClose && showOnCloseIcon) || title || children
                    ? "1px solid"
                    : "",
                borderTopColor: "grey.200",
                padding: "1em 1.5em",
              }}
            >
              {onClose && (
                <Button
                  color={"secondary"}
                  variant={"contained"}
                  sx={{
                    width: "5em",
                    height: "3em",
                    marginLeft: "0.5em",
                    boxShadow: "none",
                  }}
                  onClick={onClose}
                  disabled={disableClose}
                >
                  {cancelText}
                </Button>
              )}
              {onSubmit && (
                <Button
                  variant={"contained"}
                  sx={{ width: "12em", height: "3em" }}
                  onClick={onSubmit}
                  disabled={disableSubmit}
                >
                  {submitText}
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default MyModal;
