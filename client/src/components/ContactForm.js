import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
 
  const inputHandler = (event) => {
    setFormState({ ...formState, [event.target.name]: [event.target.value] });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    //console.log("Form Submitted");
    axios
    .post("https://reqres.in/api/users", formState)
    .then((response) => console.log(response))
    .catch((err) => console.log(err))
  };
  return (
    <div className="form-container">
      <p>Contact Us</p>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            value={formState.name}
            onChange={inputHandler}
          />
        </label>

        <label htmlFor="email">
          E-mail address
          <input
            type="email"
            name="email"
            id="email"
            value={formState.email}
            onChange={inputHandler}
          />
        </label>

        <label htmlFor="message">
          Message
          <input
            type="text"
            name="message"
            id="message"
            value={formState.message}
            onChange={inputHandler}
          />
        </label>
        <input className="submit" type="submit" />
      </form>
    </div>
  );
};
export default ContactForm;