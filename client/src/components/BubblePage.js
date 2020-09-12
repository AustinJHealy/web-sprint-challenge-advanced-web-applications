import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";


const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  //let colors = colorList;
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(()=>{getColors()},[]);


  const getColors = () => {
      axiosWithAuth()
        .get("/api/colors")
        .then(res => {
          // console.log("GET Response: ", res);
          setColorList(res.data);
        })
        .catch(err => console.log(err))
  }
  

  return (
    <div>
      
      <ColorList colors={colorList} updateColors={setColorList} getColors = {getColors}/>
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;
