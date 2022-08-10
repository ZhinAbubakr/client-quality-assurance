import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import axiosInstance from "../../axios";
import { base } from "../../api";

export default function PopupUpdate(props) {
  const { getSingleCategory, openPopup, setOpenPopup, id } = props;

  const [name, setName] = useState("");

  const updateCategory = async () => {
    try {
      const response = await axiosInstance({
        method: "put",
        url: base + "/categories" + id,
        data: {
          name: name,
        },
      });
      console.log(response);
      getSingleCategory();
    } catch {
      console.log("error posting questions");
    }
  };

  return (
    <>
      <Dialog
        open={openPopup}
        maxWidth="xl"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create Question"}
          <Button onClick={() => setOpenPopup(false)} sx={{ float: "right" }}>
            X
          </Button>
        </DialogTitle>
        <DialogTitle>
          <Typography>Create Question</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            fill the all the fields below to create a question:
          </DialogContentText>
        </DialogContent>
        <DialogTitle>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              sx={{ p: 1 }}
              label="Content"
              variant="outlined"
              multiline
              maxRows={4}
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>

          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => {
              updateCategory();
              setOpenPopup(false);
              console.log("done");
              // getQuestions();
            }}
          >
            SUBMIT
          </Button>
        </DialogTitle>
      </Dialog>
    </>
  );
}
