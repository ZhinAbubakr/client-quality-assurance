// import "./App.css";
import Login from "./view/UserAuth/Login";
import SignUp from "./view/UserAuth/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dahsboard from "./components/Dahsboard";
import Questions from "./view/Question/ListOfQuestions";
import Question from "./view/Question/Question";
import Users from "./view/Users/ListOfUsers";
import User from "./view/Users/User";
import Categories from "./view/Categories/ListOfCategories"
import RequireAuth from "./view/UserAuth/RequireAuth";
import Profile from './components/UserProfile.jsx'; 



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="" element={<RequireAuth><Dahsboard /></RequireAuth>}>
              <Route path={"/profile"} element={<Profile/>} />
              <Route path="questions">
                <Route path="" element={<Questions />} />
                <Route path=":id" element={<Question />} />
              </Route>
              <Route path="users">
                <Route path="" element={<Users />} />
                <Route path=":n" element={<User />} />
              </Route>
              <Route path="category">
                <Route path="" element={<Categories />}/>
              </Route>
            </Route>
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
