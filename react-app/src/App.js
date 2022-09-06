import Login from "./view/UserAuth/Login";
import SignUp from "./view/UserAuth/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dahsboard from "./components/Layout";
import Questions from "./view/Question/ListOfQuestions";
import Question from "./view/Question/Question";
import Users from "./view/Users/ListOfUsers";
import User from "./view/Users/User";
import Categories from "./view/Categories/ListOfCategories";
import RequireAuth from "./view/UserAuth/RequireAuth";
import Profile from "./components/UserProfile.jsx";
import ListOfRoles from "./view/Roles/ListOfRoles";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import Role from "./view/Roles/Role";
import Category from "./view/Categories/Category";
import RequireAdmin from "./components/RequireAdmin";
import NotAllowed from "./components/NotAllowed";
import NotFound from "./components/NotFound";
import { getTheme } from "./theme";
import { useEffect } from "react";
import { getDir } from "./helpers/getDir";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { useTranslation } from "react-i18next";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function RTL({ children, dir }) {
  if (dir === "rtl")
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
  else return children;
}

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === "eng") {
      document.body.dir = "ltr";
    } else {
      document.body.dir = "rtl";
    }
  }, [i18n.language]);

  return (
    <RTL dir={getDir(i18n.language)}>
      <ThemeProvider theme={getTheme(getDir(i18n.language))}>
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
                <Route path="" element={<Questions />} />
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
    </RTL>
  );
}

export default App;
