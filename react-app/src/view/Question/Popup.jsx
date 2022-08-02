import { Button, Dialog, DialogTitle, Typography } from "@mui/material";
import React from "react";

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <>
      <Dialog open={openPopup} maxWidth="md">
        <DialogTitle>
          <Button onClick={() => setOpenPopup(false)} sx={{ float: "right" }}>X</Button>
          <Typography >Create Question</Typography>
        </DialogTitle>
        <DialogTitle>
          {children}
        </DialogTitle>
      </Dialog>
    </>
  );
}
