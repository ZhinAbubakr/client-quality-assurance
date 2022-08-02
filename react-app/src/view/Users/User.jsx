import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

import React from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { n } = useParams();
  const [role, setRole] = React.useState([
    { id: 1, name: "AI" },
    { id: 2, name: "ReactJs" },
  ]);

  const handleChange = (e) => {
    setRole(e.target.value);
    console.log(role);
  };

  return (
    <>
      <Container sx={{ marginTop: 10, marginLeft: 2 }}>
        <Paper variant="outlined" sx={{ p: 4 }}>
          <Grid container sx={{ p: 4 }}>
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Typography variant="h4">User {n}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ p: 4 }}>
              <Typography>First Name :</Typography>
              <Typography>Last Name :</Typography>
              <Typography>Full Name :</Typography>
              <Typography>Email :</Typography>
              <Typography>Role :</Typography>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 5 }}>
              <FormControl sx={{ m: 0, width: 200 }}>
                <Select
                  value={role}
                  onChange={handleChange}
                  displayEmpty
                  placeholder="choose category"
                >
                  <MenuItem value={1}>Software Engineer</MenuItem>
                  <MenuItem value={2}>Quality assurance</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row" justifyContent="end">
              <Button variant="contained">DELETE</Button>
              <Button variant="contained">EDIT</Button>
            </Stack>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default User;
