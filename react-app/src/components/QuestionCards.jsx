import { useTheme } from "@mui/material";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../view/Question/Popup";

const breakpointColumnsObj = {
    default: 4,
    1950: 3,
    1680: 2,
    980: 1
}

export default function QuestionCards({ questions , breakpointColumnsObj}) {
  const [categoryList, setCategoryList] = useState([]);
  

  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    getCategories(setCategoryList);
  }, []);

  console.log(
    "categoryList",
    categoryList?.find((category) => category?.attributes?.id === 1)?.attributes
      .name
  );

  console.log(questions);

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
            boxShadow: '0px 15px 25px rgba(50, 50, 50, 0.1)'
          }}
        >
          <CardContent>
            <Typography
              component={"p"}
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {new Date(ques.attributes.created_at).toDateString()}
            </Typography>
            <Typography component={"h5"} variant="h5">
              {ques.attributes.title}
            </Typography>
            <Typography component={"h5"} variant="body2" sx={{ py: 2 }}>
              {ques.attributes.content}
            </Typography>
            <Typography
              component={"h5"}
              sx={{ mb: 1.5 }}
              color="text.secondary"
            >
              {/* {console.log("ytirty",ques?.attributes?.category_ids.map((id)=>id))} */}
              {ques.attributes.category_ids.map((id, i) => (
                <Chip
                  // color="secondary"
                  sx={{
                    color: theme.palette.primary.dark,
                    backgroundColor: "#E0FBFC",
                    ml: 1
                  }}
                  key={i}
                  label={
                    categoryList?.find(
                      (category) => category?.attributes?.id === id
                    )?.attributes.name
                  }
                />
              ))}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
