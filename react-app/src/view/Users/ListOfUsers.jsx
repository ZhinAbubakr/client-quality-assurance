import React, { useState, useEffect } from "react";
import Tables from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import axiosInstance from "../../axios";
import { base } from "../../api";

const ListOfUsers = () => {
  const navigate = useNavigate();
  const [listOfUser, setListOfUser] = useState([]);

  const getQuestions = async () => {
    try {
      const { data } = await axiosInstance({
        method: "get",
        url: base + "/users",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjE5NTE1MzZ9.PFcypt2fLglYT-xunOtBVKrmu8xFdl7yxbpVUcjkBo4`,
        },
      });
      console.log(data?.data);
      setListOfUser(data?.data);
    } catch (errro) {
      console.log("not successful");
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const [cols] = useState([
    {
      name: "role_ids",
      label: "Role",
    },
    {
      name: "first_name",
      label: "First Name",
    },
    {
      name: "last_name",
      label: "Last Name",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      action: "action",
      label: "Action",
    },
  ]);

  const SelectedRow = (id) => {
    navigate("/users/" + id);
  };

  return (
    <>
      <Container sx={{ marginTop: 8, marginLeft: 2 }}>
        <Tables users={listOfUser} cols={cols} SelectedRow={SelectedRow} />
      </Container>
    </>
  );
};

export default ListOfUsers;
