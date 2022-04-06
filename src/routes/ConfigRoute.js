import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scanner from "../views/Scanner";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import PrivateRoute from "./PrivateRoute";
import NoMatch from "../views/NoMatch";
const ConfigRoute = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="scanner" element={<Scanner />} /> 
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
};

export default ConfigRoute;
