import { Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Cards({ questions }) {
  const navigate = useNavigate();
  return (
    <>
      {questions.map((ques) => (
        <Box
          component="span"
          sx={{ p: 1 }}
          key={ques.attributes.id}
          onClick={() => {
            return navigate("/questions/" + ques.attributes.id);
          }}
        >
          <Card
            variant="outlined"
            sx={{
              p: 1,
              cursor: "pointer" ,
              "&:hover": {
                backgroundColor: "#5c6bc0",
                color: "#ffffff",
                // opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {ques.name}
              </Typography>
              <Typography variant="body2">{ques.attributes.content}</Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </>
  );
}
