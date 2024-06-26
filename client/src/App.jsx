import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import "./App.css";
import CentralData from "./Context/Context";
import Loading from "./components/Loading";

const App = () => {
  const [loading, setLoading] = useState(true);


  // this useeffect will show loding screen 
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  return !loading ? (
    <CentralData>
      <Layout />
    </CentralData>
  ) : (
    <Loading />
  );
};

export default App;
