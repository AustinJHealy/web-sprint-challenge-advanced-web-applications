import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./utils/PrivateRoute";
import BubblePage from "./components/BubblePage";
//import ContactForm from "./components/ContactForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <PrivateRoute exact path="/bubble-page" component={BubblePage} />
        
        {/*<PrivateRoute exact path="contact-page" component={ContactForm} />*/}
      </div>
    </Router>
  );
}

export default App;
