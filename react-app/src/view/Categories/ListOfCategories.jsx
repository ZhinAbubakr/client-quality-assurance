import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { base } from "../../api";

const ListOfCategories = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [listOfCategories, setListOfCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/categories",
      });
      console.log(data?.data);
      setListOfCategories(data?.data);
    } catch (errro) {
      console.log("not successful");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Container sx={{ marginLeft: 5, marginTop: 12, p: 4 }}>
        {listOfCategories.map((categories) => (
          <List key={categories.attributes.id}>
            <ListItem>
              <ListItemButton role={undefined} dense>
                <Checkbox {...label} />
                <ListItemText
                  id={categories.attributes.id}
                  primary={categories.attributes.name}
                />
              </ListItemButton>
            </ListItem>
          </List>
        ))}
        <Stack spacing={2} direction="row" justifyContent="end">
          <Button variant="contained">DELETE</Button>
          <Button variant="contained">EDIT</Button>
        </Stack>
      </Container>
    </>
  );
};

export default ListOfCategories;
