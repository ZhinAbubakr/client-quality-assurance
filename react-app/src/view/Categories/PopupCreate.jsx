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

export default function PopupCreate(props) {
  const { getCategories, openPopup, setOpenPopup } = props;

  const [name, setName] = useState("");

  const createCategory = async () => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: base + "/categories",
        data: {
          category: {
            name: name,
          },
        },
      });
      console.log(response);
      getCategories();
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
          <Typography>Create Category</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            fill the all the fields below to create a category:
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
              createCategory();
              setOpenPopup(false);
              console.log("done");
            }}
          >
            SUBMIT
          </Button>
        </DialogTitle>
      </Dialog>
    </>
  );
}
