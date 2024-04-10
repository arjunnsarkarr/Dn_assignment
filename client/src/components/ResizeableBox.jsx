import React, { useContext, useState } from "react";
import { Resizable } from "re-resizable";
import { CentralizedData } from "../Context/Context";

const ResizeableBox = (props) => {
  const domain = import.meta.env.VITE_APP_DOMAIN;
  const { img, count, idx } = props;

  const [show, setShow] = useState(false);
  const [Count, setCount] = useState(count);
  const [image, setImage] = useState(img);
  const [imagee, setImagee] = useState(img);
  const [state, setState] = useContext(CentralizedData);

  const AddHandler = (e) => {
    e.preventDefault();
    setShow(true);
    setImage("");
  };

  const UpdateHandler = async (e) => {
    e.preventDefault();
    setCount(Number(Count) + 1);
    setState(true);
    try {
      const result = await fetch(`${domain}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          box: idx,
          url: image,
        }),
      });
      const res = await result.json();
      console.log(res, "this is response from frontend update handler");
    } catch (error) {
      console.log(error);
    }
    setShow(false);
  };

  return (
    <>
      <div>
        <Resizable
          defaultSize={{
            width: 420,
            height: 390,
          }}
          style={{
            border: "2px solid black",
          }}
          className="m-5 p-1"
        >
          <img
            className="h-full w-full object-cover"
            src={image}
            alt="No img Found"
            required
          />
        </Resizable>

        <div className="flex flex-col ml-6">
          <button onClick={AddHandler} className="myBtn">
            {" "}
            <span className="myBtnspan">Add</span>{" "}
          </button>
          <form onSubmit={UpdateHandler}>
            {show && (
              <input
                type="text"
                placeholder="Add image url"
                className="m-1 p-1"
                onChange={(e) => setImage(e.target.value)}
                value={image}
                required
              />
            )}
            <button type="submit" className="myBtn">
              <span className="myBtnspan"> Update</span>{" "}
            </button>
          </form>

          <span>Count : {Count}</span>
        </div>
      </div>
    </>
  );
};

export default ResizeableBox;
