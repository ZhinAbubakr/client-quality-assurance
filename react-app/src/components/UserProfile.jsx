import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import Image from "../Assets/user (1).png";
import { useTranslation } from "react-i18next";
import axiosInstance from "../axios";
import { base } from "../api";
import { useState } from "react";
// import axiosInstance from "../axios";
// import { base } from "../api";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [roles, setRoles] = useState([]);
  const { t } = useTranslation();

  const getRoles = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/roles",
      });
      console.log(data?.data, "llllllllllllll");
      setRoles(data?.data);
    } catch (errro) {
      console.log("not successful");
    }
  };
  // const updateUser = async () => {
  //   try {
  //     const { data } = await axiosInstance({
  //       method: "put",
  //       url: base + `/users/` + user.id,
  //       data: {
  //         user: {
  //           first_name: "Admin",
  //           last_name: "",
  //           email: "admin@gmail.com",
  //           password: "admin12345",
  //           role_ids: [1],
  //         },
  //       },
  //     });

  //     console.log(data?.data?.attributes);
  //   } catch (errro) {
  //     console.log("not successful");
  //   }
  // };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mx: 2,
          my: 2,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {t("userProfile.profilePage")}
          </Typography>
          <Grid container spacing={3} paddingTop={4}>
            <Grid item lg={4} md={6} xs={12}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar
                      src={Image}
                      sx={{
                        height: 64,
                        mb: 2,
                        width: 64,
                      }}
                    />
                    <Typography color="textPrimary" gutterBottom variant="h5">
                      {user?.first_name} {user?.last_name}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <form autoComplete="off" noValidate>
                <Card>
                  <CardHeader
                    subheader={t("userProfile.info")}
                    // title="Profile"
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <Typography
                          sx={{ fontSize: 12 }}
                          color="text.secondary"
                        >
                          {t("userProfile.firstName")}
                        </Typography>
                        <Typography variant="h6">{user?.first_name}</Typography>
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <Typography
                          sx={{ fontSize: 12 }}
                          color="text.secondary"
                        >
                          {t("userProfile.lastName")}
                        </Typography>
                        <Typography variant="h6"> {user?.last_name}</Typography>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Typography
                          sx={{ fontSize: 12 }}
                          color="text.secondary"
                        >
                          {t("userProfile.email")}
                        </Typography>
                        <Typography variant="h6"> {user?.email}</Typography>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Typography
                          sx={{ fontSize: 12 }}
                          color="text.secondary"
                        >
                          {t("userProfile.role")}
                        </Typography>
                        <Typography variant="h6">
                          {roles.find(
                            (item) => item?.attributes?.id === user?.role_ids[0]
                          )?.attributes.name
                            ? roles.find(
                                (item) =>
                                  item?.attributes?.id === user?.role_ids[0]
                              )?.attributes.name
                            : user?.role_ids[0]}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default UserProfile;
