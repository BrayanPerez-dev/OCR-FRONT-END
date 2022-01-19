import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Scanner from '../views/Scanner';
import SingIn from '../views/SingIn';
import SingUp from '../views/SingUp';
const ConfigRoute = () => {
    return (
            <Router>
                <Routes>
                  <Route path="/" element={<SingIn/>}/>
                  <Route path="/singup" element={<SingUp/>}/>
                  <Route path="/scanner" element={<Scanner/>}/>
                </Routes>
            </Router>
    )
}

export default ConfigRoute
