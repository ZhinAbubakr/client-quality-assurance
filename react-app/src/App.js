// import "./App.css";
import Login from "./view/UserAuth/Login";
import SignUp from "./view/UserAuth/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dahsboard from "./components/Dahsboard";
import Questions from "./view/Question/ListOfQuestions";
import Question from "./view/Question/Question";
import Users from "./view/Users/ListOfUsers";
import User from "./view/Users/User";
import Categories from "./view/Categories/ListOfCategories";
import RequireAuth from "./view/UserAuth/RequireAuth";
import Profile from "./components/UserProfile.jsx";
import ListOfRoles from "./view/Roles/ListOfRoles";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Role from "./view/Roles/Role";
import Category from "./view/Categories/Category";
import RequireAdmin from "./components/RequireAdmin";
import NotAllowed from "./components/NotAllowed";
import NotFound from "./components/NotFound";

function App() {
  const mdTheme = createTheme(); //theme provider is used to pass the theme to the components
  return (
    <div className="App">
      <ThemeProvider theme={mdTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                path=""
                element={
                  <RequireAuth>
                    <Dahsboard />
                  </RequireAuth>
                }
              >
                <Route path="/profile" element={<Profile />} />
                <Route path="questions">
                  <Route path="" element={<Questions />} />
                  <Route path=":id" element={<Question />} />
                </Route>
                <Route path="users">
                  <Route
                    path=""
                    element={
                      <RequireAdmin>
                        <Users />
                      </RequireAdmin>
                    }
                  />
                  <Route path=":id" element={<User />} />
                </Route>
                <Route path="category">
                  <Route path="" element={<Categories />} />
                  <Route path=":id" element={<Category />} />
                </Route>
                <Route path="role">
                  <Route
                    path=""
                    element={
                      <RequireAdmin>
                        <ListOfRoles />
                      </RequireAdmin>
                    }
                  />
                  <Route path=":id" element={<Role />} />
                </Route>
              </Route>
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<Login />} />
              <Route path="403" element={<NotAllowed />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
