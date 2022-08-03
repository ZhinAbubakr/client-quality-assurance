import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axiosInstance from "../../axios";
import { base } from "../../api";

export default function Popup(props) {
  const { openPopup, setOpenPopup } = props;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createQuestion = async () => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: base + "/questions",
        data: {
          title: title,
          content: content,
          category_ids: "1",
        },
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjE5NTQ2NTd9.48yrwEOB6I6SKjMWqOQ1Uee0f5mEXsRz2GLE_Y09C60`,
        },
      });
      console.log(response);
    } catch {
      console.log("error posting questions");
    }
  };

  return (
    <>
      <Dialog open={openPopup} maxWidth="md">
        <DialogTitle>
          <Button onClick={() => setOpenPopup(false)} sx={{ float: "right" }}>
            X
          </Button>
          <Typography>Create Question</Typography>
        </DialogTitle>
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
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Content"
              variant="outlined"
              multiline
              maxRows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Box>
          <Button
            sx={{ m: 2 }}
            onClick={() => {
              createQuestion();
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
