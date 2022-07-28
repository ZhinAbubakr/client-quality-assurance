// import "./App.css";
import Login from "./view/UserAuth/Login";
import SignUp from "./view/UserAuth/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dahsboard from "./components/Dahsboard";
import Questions from "./view/Question/ListOfQuestions";
import Question from "./view/Question/Question";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="" element={<Dahsboard />}>
              <Route path="questions/"  >
                <Route path="" element={<Questions />}/>
                <Route path=":id" element={<Question />}/>
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
