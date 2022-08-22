import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../view/Question/Popup";
import { theme } from "../theme";

export default function QuestionCards({ questions }) {
  const [categoryList, setCategoryList] = useState([]);

  const navigate = useNavigate();

  console.log("categoryList", categoryList);

  useEffect(() => {
    getCategories(setCategoryList);
  }, []);

  console.log(questions)

  return (
    <Box display="flex" flexDirection="column">
      {questions.map((ques) => (
        <Card
          key={ques.attributes.id}
          onClick={() => {
            return navigate("/questions/" + ques.attributes.id);
          }}
          sx={{
            cursor: "pointer",
            my: 2,
          }}
        >
          <CardContent>
            <Typography
              component={'p'}
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {new Date(ques.attributes.created_at).toDateString()}
            </Typography>
            <Typography component={'h5'}  variant="h5" >
              {ques.attributes.title}
            </Typography>
            <Typography component={'h5'} variant="body2" sx={{ py: 2 }}>
              {ques.attributes.content}
            </Typography>
            <Typography component={'h5'} sx={{ mb: 1.5 }} color="text.secondary">
              {ques.attributes.category_ids.map((id, i) => (
                <Chip
                  // color="secondary"
                  sx={{color: theme.palette.primary.dark, backgroundColor: "#E0FBFC"}}
                  key={i}
                  label={
                    categoryList.find(
                      (category) => category.attributes.id === id
                    )?.attributes.name
                  }
                />
              ))}
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      ))}
    </Box>
  );
}
