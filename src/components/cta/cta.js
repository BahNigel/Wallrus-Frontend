import React, { useRef, useState } from "react";
import "./cta.scss";
import MaskGroup1 from "../../images/Mask Group 2.svg";
import MaskGroup2 from "../../images/Mask Group 1.svg";
import { Button,  Slide } from "@material-ui/core";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import Fade from "@material-ui/core/Fade";

const Cta = () => {
  const inputEmail = useRef(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  const subscribe = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("email", inputEmail.current.value);
    axios
      .post(
        `${process.env.REACT_APP_ROOT_URL}/api/subscribe-newsletter/`,
        formdata
      )
      .then((res) => {
        inputEmail.current.value = "";
        // alert("Susseccfully subscribed");
        setState({...state,open:true});
        setMessage("Susseccfully subscribed");
        setErrorMessage("success");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({
      ...state,
      open: false,
    });
  };

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        TransitionComponent={state.Transition}
        open={state.open}
        autoHideDuration={2000}
        onClose={handleClose}
        key={state.Transition.name}
      >
        <Alert
          onClose={handleClose}
          severity={errorMessage}
          // sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <div className="cta">
        <img className="right top" src={MaskGroup1} />
        <img className="left bottom" src={MaskGroup2} />
        <h2 className="h2 x-bold">Don’t miss out any updates</h2>
        <p className="para">
          Get weekly email containing all the latest design, trends, artists, events
          and lots more.
        </p>
        <form className="grid-cols-2" onSubmit={subscribe}>
          <input
            className="primary-input"
            type="email"
            placeholder="Your email id"
            ref={inputEmail}
          />
          <Button variant="contained" className="btn-filled" type="submit">
            Push. Don’t Pull
          </Button>
        </form>
        <p className="para-small">Zero spam. Unsubscribe any time</p>
      </div>
    </React.Fragment>
  );
};

export default Cta;
