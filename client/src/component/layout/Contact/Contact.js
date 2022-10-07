import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:smsabir777@gmail.com@gmail.com">
        <Button>Contact: smsabir777@gmail.com</Button>
        <Button>Contact: abhishekjoshi2030@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
