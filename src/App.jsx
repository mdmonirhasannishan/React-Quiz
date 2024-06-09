import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Signup from "./pages/Signup";
import "./styles/App.css";
import PublicRoute from "./components/PublicRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthProvider />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/*" element={<PublicRoute />}>
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="/*" element={<PrivateRoute />}>
              <Route path="quiz/:id" element={<Quiz />} />
              <Route path="result/:id" element={<Result />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
