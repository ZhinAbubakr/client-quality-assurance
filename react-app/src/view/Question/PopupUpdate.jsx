import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { base } from "../../api";

export default function PopupUpdate(props) {
  const { singleQuestion, getSingleQuestion, openPopup, setOpenPopup, id } =
    props;

  const [categoryList, setCategoryList] = useState([]);
  const [choosedCategory, setChoosedCategory] = useState([]);
  const [questionTitle, setQuestionTitle] = useState(singleQuestion?.title);
  const [questionContent, setQuestionContent] = useState(
    singleQuestion?.content
  );

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

  const updateQuestion = async () => {
    try {
      await axiosInstance({
        method: "PUT",
        url: base + "/questions/" + id,
        data: {
          question: {
            title: questionTitle,
            content: questionContent,
            category_ids: choosedCategory,
          },
        },
      });

      getSingleQuestion();
      alert("updated successfully");
    } catch (errro) {
      console.log("not successful");
      alert("not successful");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <>
      <Dialog maxWidth="lg" open={openPopup} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            here you can update your question!
          </DialogContentText>
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
            autoFocus
            margin="dense"
            defaultValue={singleQuestion?.title}
            label="Title"
            multiline={true}
            minRows={10}
            maxRows={5}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setQuestionTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            defaultValue={singleQuestion?.content}
            label="Content"
            type="text"
            fullWidth
            multiline={true}
            minRows={10}
            maxRows={5}
            variant="outlined"
            onChange={(e) => setQuestionContent(e.target.value)}
          />
          </Box>
          </DialogTitle>
          {/* <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          > */}
            {categoryList.length > 0 && (
              <Select
                defaultValue={""}
                value={choosedCategory}
                fullWidth
                // label="Category"
                onChange={(e) => {
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
          {/* </Box> */}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => {
              updateQuestion();
              setOpenPopup(false);
              console.log("done");
              getSingleQuestion();
              // getQuestions();
            }}
          >
            SUBMIT
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
