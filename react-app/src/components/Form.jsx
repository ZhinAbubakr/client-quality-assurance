import { Box, Button, TextField } from "@mui/material";
import React from "react";

export default function Form() {
  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField label="Title" variant="outlined" />
        <TextField label="Content" variant="outlined" multiline maxRows={4}/>
      </Box>
      <Button
        sx={{ m: 2 }}
        onClick={() => {
          console.log("done");
        }}
      >
        SUBMIT
      </Button>
    </>
  );
}
