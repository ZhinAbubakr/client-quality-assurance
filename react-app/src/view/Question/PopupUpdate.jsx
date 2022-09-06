import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { base } from "../../api";
import CloseIcon from "@mui/icons-material/Close";

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
      <Dialog open={openPopup} onClose={handleClose} maxWidth="md">
        <DialogTitle>
          Update Question
          <IconButton
            sx={{ color: "red", float: "right" }}
            onClick={() => setOpenPopup(false)}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogTitle>
          <DialogContentText>
            here you can update your question!
          </DialogContentText>
        </DialogTitle>

        <DialogContent>
          <TextField
            sx={{ mt: 4, mb: 2 }}
            defaultValue={singleQuestion?.title}
            label="Title"
            fullWidth
            onChange={(e) => setQuestionTitle(e.target.value)}
          />
          <TextField
            sx={{ mt: 4, mb: 2 }}
            defaultValue={singleQuestion?.content}
            label="Content"
            fullWidth
            multiline={true}
            minRows={10}
            maxRows={10}
            variant="outlined"
            onChange={(e) => setQuestionContent(e.target.value)}
          />

          {categoryList.length > 0 && (
            <Select
            sx={{ my: 2 }}
              defaultValue={""}
              value={choosedCategory}
              fullWidth
              multiple
              onChange={(e) => {
                handleChange(e);
              }}
            >
              {categoryList?.map((category, index) => (
                <MenuItem key={index} value={category?.attributes?.id}>
                  {category?.attributes?.id} : {category?.attributes?.name}
                </MenuItem>
              ))}
            </Select>
          )}

          <Button
            variant="contained"
            sx={{ m: 2 }}
            onClick={() => {
              updateQuestion();
              setOpenPopup(false);
              getSingleQuestion();
            }}
          >
            SUBMIT
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
