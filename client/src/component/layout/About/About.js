import React from "react";
import "./aboutSection.css";
import {  Typography  } from "@material-ui/core";



const About = () => {
 
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>
       <div>
          <div>
           <h1> Head Office Adress :</h1>
            <Typography>30, Azad Bhawan Rd, ITO, IP Estate, New Delhi, Delhi 110002</Typography>
            
            
          </div>
          <div className="aboutSectionContainer2">

          <h1> Regional Office Adress :</h1>
            <Typography>40, Telephone Exchange Rd, Qaisar Bagh, Lucknow, Uttar Pradesh</Typography>
            
          </div>

         
        </div>
           <h3>Information about us</h3>

         <p>
          This is a sample wesbite having all daily use products by India Gov. 
         </p>
      </div>
    
    </div>
  );
};

export default About;
