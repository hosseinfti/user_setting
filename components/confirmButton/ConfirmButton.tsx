import React, { ReactElement, ReactNode, useState } from "react";
import MyModal from "../modal/MyModal";
import { Button, Typography } from "@mui/material";

interface Props {
  onSubmit: () => void;
  title?: string;
  description?: ReactNode;
  Render?: any;
}

const DefaultChildren = ({
  onClick,
  title,
}: {
  title?: string;
  onClick?: () => void;
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
      color="error"
      variant={"contained"}
    >
      {title}
    </Button>
  );
};
const ConfirmButton = ({ Render, onSubmit, description, title }: Props) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleSubmit = () => {
    setIsConfirmOpen(false);
    onSubmit();
  };

  return (
    <>
      <MyModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onSubmit={handleSubmit}
        title={title}
      >
        {description}
      </MyModal>
      {Render && (
        <div
          style={{ display: "flex" }}
          onClick={() => {
            setIsConfirmOpen(true);
          }}
        >
          {Render}
        </div>
      )}
      {!Render && (
        <DefaultChildren
          title={title}
          onClick={() => {
            setIsConfirmOpen(true);
          }}
        />
      )}
    </>
  );
};

export default ConfirmButton;
