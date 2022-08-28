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
import { useTranslation } from "react-i18next";

export default function PopupCreate(props) {
  const { getCategories, openPopup, setOpenPopup } = props;
  const {t} = useTranslation();
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
      console.log("error adding category");
    }
  };

  return (
    <>
      <Dialog
        open={openPopup}
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title">
            {t("listOfCategory.AddCategory")}
          <Button onClick={() => setOpenPopup(false)} sx={{ float: "right" }}>
            X
          </Button>
        </DialogTitle>
        
        <DialogContent>
          <DialogContentText>
          {t("listOfCategory.info")}
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
              label={t("listOfCategory.Content")}
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
            {t("listOfCategory.submit")}
          </Button>
        </DialogTitle>
      </Dialog>
    </>
  );
}
