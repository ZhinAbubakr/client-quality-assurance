import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { base } from "../../api";

export const getCategories = async (setData) => {
  try {
    const { data } = await axiosInstance({
      method: "get",
      url: base + "/categories",
    });
    setData(data?.data);
  } catch (errro) {
    console.log("not successful");
  }
};

export default function Popup(props) {
  const { getQuestions, openPopup, setOpenPopup } = props;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [choosedCategory, setChoosedCategory] = useState([]);
  const theme = useTheme();

  function handleChange(event) {
    // handle change for select input (role)
    console.log(event.target.value);
    setChoosedCategory(event.target.value);
  }

  const createQuestion = async () => {
    try {
      const response = await axiosInstance({
        method: "post",
        url: base + "/questions",
        data: {
          title: title,
          content: content,
          category_ids: choosedCategory,
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
    getCategories(setCategoryList);
  }, []);

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
          <Button
            variant="contained"
            size="small"
            sx={{
              float: "right",
              backgroundColor: theme.palette.error.dark,
              color: "white",
            }}
            onClick={() => setOpenPopup(false)}
          >
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
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              sx={{ p: 1 }}
              label="Content"
              variant="outlined"
              multiline
              maxRows={4}
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Box>

          <Grid item xs={12} sx={{ p: 4 }}>
            <InputLabel>Role</InputLabel>
            {categoryList.length > 0 && (
              <Select
                defaultValue={""}
                value={choosedCategory}
                fullWidth
                // label="Category"
                onChange={(e) => {
                  console.log(choosedCategory)
                  handleChange(e);
                }}
                multiple
              >
                {categoryList?.map((category, index) => (
                  <MenuItem key={index} value={category?.attributes?.id}>
                    {category?.attributes?.id} : {category?.attributes?.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Grid>
          <Button
            variant="contained"
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
