import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { base } from "../../api";

export default function Popup(props) {
  const { getQuestions, openPopup, setOpenPopup } = props;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [choosedCategory, setChoosedCategory] = useState(3);

  function handleChange(event) {
    // handle change for select input (role)
    console.log(event.target.value);
    setChoosedCategory(event.target.value);
  }

  const getCategories = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/categories",
      });
      setCategoryList(data?.data);
    } catch (errro) {
      console.log("not successful");
    }
  };

  const createQuestion = async () => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: base + "/questions",
        data: {
          title: title,
          content: content,
          category_ids: [choosedCategory],
        },
      });
      console.log(response);
      getQuestions();
      // props.getQuestions();
    } catch {
      console.log("error posting questions");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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
          <Grid item xs={12} sx={{ p: 4 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            {categoryList.length > 0 && (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={choosedCategory}
                label="role"
                onChange={(e) => {
                  handleChange(e);
                }}
                fullWidth
              >
                {categoryList?.map((role, index) => (
                  <MenuItem key={index} value={role?.attributes?.id}>
                    {role?.attributes?.id} : {role?.attributes?.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Grid>
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
