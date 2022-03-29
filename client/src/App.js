import "./App.css";
// import { BrowserRouter as Router,Route, Switch } from "react-router-dom";
//  ----------------------v5

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; //---v6
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./context/AuthContext";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import About from "./views/About";
import PostContextProvider from "./context/PostContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/Register" element={<Auth />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/About" element={<About />} />
            </Route>
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
