import "./button.scss";
import Button from "@material-ui/core/Button";

const SignUpButton = (props) => {
  return (
    <Button variant="contained" className="SignUp-Btn" onClick={props.clicked}>
      Sign up
    </Button>
  );
};

export default SignUpButton;
