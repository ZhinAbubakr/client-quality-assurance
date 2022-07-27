import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function ListOfQuestions() {
  const [questions, setQuestions] = useState([
    { id: 1 , name: "Questions one", description: "Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the questionAnswer of the question Answer of the question" },
    { id: 2 ,name: "Questions Two", description: "Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the questionAnswer of the question Answer of the question" },
    {id: 3 , name: "Questions Three", description: "Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the questionAnswer of the question Answer of the question" },
    {id: 4 , name: "Questions Four", description: "Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the questionAnswer of the question Answer of the question" },
  ]);

  return (
    <>
    {questions.map((ques)=>(


<Box component="span" sx={{ p: 2, border: '1px dashed grey' }} key={ques.id}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              {ques.name}
            </Typography>
            <Typography variant="body2">          
              {ques.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>

    )
    )}
      
    </>
  );
}
