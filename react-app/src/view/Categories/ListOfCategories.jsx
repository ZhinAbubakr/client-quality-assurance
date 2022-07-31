import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const ListOfCategories = () => {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <Container sx={{ marginLeft: 5, marginTop: 12, p: 4 }}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {["AI", "REACTJS", "IT", "JAVA"].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      // checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${value}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Stack spacing={2} direction="row" justifyContent="end">
          <Button backgroundColor="secondary" variant="contained">
            DELETE
          </Button>
          <Button backgroundColor="secondary" variant="contained">
            EDIT
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default ListOfCategories;
