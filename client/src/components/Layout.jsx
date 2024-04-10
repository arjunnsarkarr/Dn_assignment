import React, { useContext, useEffect, useState } from "react";
import ResizeableBox from "./ResizeableBox";
import { CentralizedData } from "../Context/Context";

const Layout = () => {
  const domain = import.meta.env.VITE_APP_DOMAIN;
  const [allData, setAllData] = useState([]);
  const [state, setState] = useContext(CentralizedData);


  useEffect(() => {
    const alldata = async () => {
      const result = await fetch(`${domain}/data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      setAllData(data.data);
      setState(false);
    };
    alldata();
  }, [state]);

  return (
    <>
      <div className="flex">
        {allData.map((data, idx) => (
          <div key={idx}>
            {idx <= 1 && (
              <ResizeableBox img={data.img_url} count={data.count} idx={idx} />
            )}
          </div>
        ))}
      </div>
      {/* this box is for proper layout shown in the task */}
      {allData.map((data, idx) => (
        <div key={idx}>
          {idx == 2 && (
            <ResizeableBox img={data.img_url} count={data.count} idx={idx} />
          )}
        </div>
      ))}
    </>
  );
};

export default Layout;
