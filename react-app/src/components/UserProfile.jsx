import React from "react";
// { useState }
import { Container, Grid, Paper, Typography } from "@mui/material";
// import axiosInstance from "../axios";
// import { base } from "../api";
// import { useEffect } from "react";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
// import { signIn } from "../store/auth";

const UserProfile = () => {
  // const [admin, setAdmin] = useState([]);
  // const dispatch = useDispatch();
  // const auth = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.auth);

  // const getUser = async () => {
  //   try {
  //     const { data } = await axiosInstance({
  //       method: "get",
  //       url: base + "/auth/get-user-info",
  //     });
  //     dispatch(signIn(data.data.attributes));
  //     setAdmin(data);
  //     console.log(admin?.data?.attributes);
  //   } catch (errro) {
  //     console.log("not successful");
  //   }
  // };

  // const userInfo = user?.user;

  console.log(user);

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <>
      <Container sx={{ marginTop: 10, marginLeft: 2 }}>
        <Paper variant="outlined" sx={{ p: 4 }}>
          <Grid container sx={{ p: 4 }}>
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Typography variant="h4">{user?.first_name}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ p: 4 }}>
              <Typography>ID : {user?.id}</Typography>
              <Typography>First Name : {user?.first_name}</Typography>
              <Typography>Last Name : {user?.last_name}</Typography>
              <Typography>Email : {user?.email}</Typography>
              <Typography>Role : {user?.role_ids[0]}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default UserProfile;
