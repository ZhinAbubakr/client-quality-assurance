import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { base } from "../../api";
import { Box } from "@mui/system";

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

  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <>
      <Dialog open={openPopup} onClose={handleClose} maxWidth="md">
        <DialogTitle>
          {"Create Question"}
          <IconButton
            sx={{ color: theme.palette.error.dark, float: "right" }}
            onClick={() => setOpenPopup(false)}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogTitle>
          <DialogContentText>
            fill the all the fields below to create a question:
          </DialogContentText>
        </DialogTitle>

        <DialogContent>
          <TextField
            sx={{ mt: 4, mb: 2 }}
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            sx={{ my: 2 }}
            label="Content"
            variant="outlined"
            multiline={true}
            minRows={10}
            maxRows={10}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {categoryList.length > 0 && (
            <Select
              MenuProps={{
                sx: {
                  width: "100%",
                },
              }}
              sx={{ my: 2 }}
              // defaultValue={""}
              value={choosedCategory}
              fullWidth
              multiple
              onChange={(e) => {
                console.log(choosedCategory);
                handleChange(e);
              }}
            >
              {categoryList?.map((category, index) => (
                <MenuItem
                  key={index}
                  value={category?.attributes?.id}
                  sx={{ minWidth: 200, py: 1 }}
                >
                  {category?.attributes?.id} : {category?.attributes?.name}
                </MenuItem>
              ))}
            </Select>
          )}

          <Button
            variant="contained"
            sx={{ m: 2, float: "right" }}
            onClick={() => {
              createQuestion();
              setOpenPopup(false);
              console.log("done");
              // getQuestions();
            }}
          >
            SUBMIT
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
