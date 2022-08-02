import {
  Button,
  // Box,
  // Card,
  // CardContent,
  Container,
  Grid,
  // Typography,
} from "@mui/material";
import React, { useState } from "react";
import Cards from "../../components/Card";
import Popup from "./Popup";
import Form from "../../components/Form";

export default function ListOfQuestions() {

  const [openPopup, setOpenPopup] = useState(false);

  const [questions] = useState([
    {
      id: 1,
      name: "Questions one",
      description:
        "Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the questionAnswer of the question Answer of the question",
    },
    {
      id: 2,
      name: "Questions Two",
      description:
        "Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the questionAnswer of the question Answer of the question",
    },
    {
      id: 3,
      name: "Questions Three",
      description:
        "Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the questionAnswer of the question Answer of the question",
    },
    
  ]);

  // const navigate = useNavigate();

  return (
    <>
      {/* <Cards  questions={questions}/> */}

      <Container sx={{ marginTop: 8, marginLeft: 2 }}>
        <Grid container>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <Button
              sx={{ float: "right" }}
              variant="contained"
              onClick={() => {
                setOpenPopup(true)
                console.log("add question");
              }}
            >
              ADD
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Cards questions={questions} />
          </Grid>
        </Grid>
      </Container>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}

      >
<Form />
      </Popup>
    </>
  );
}
