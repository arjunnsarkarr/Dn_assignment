import React from "react";
import Layout from "./components/Layout";
import "./App.css";
import CentralData from "./Context/Context";

const App = () => {
  return (
    <div>
      <CentralData>
        <Layout />
      </CentralData>
    </div>
  );
};

export default App;
