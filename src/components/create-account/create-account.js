import "./create-account.scss";
import SocialMediaSignUp from "../socialmedia/socialmediasignup";
import SignUpEmail from "../signup-email/signup-email";
import { Link } from "react-router-dom";

const CreateAccount = (props) => {
  return (
    <div className="createAccount">
      <div className="createAccountHeader">
        <div>
          <h1 className="create-account-title">Create an account</h1>
          <p className="create-account-sub-title">
            Sign up so that your information is not lost and safe with us
          </p>
        </div>

        <div className="memberStatusCreateAccount">
          <span>Already a member?</span>
          <Link to="/login" className="linkCreateAccount">
            Log In
          </Link>
        </div>
      </div>

      <SocialMediaSignUp
        setIsSocial={props.setIsSocial}
        handleNext={props.handleNext}
      />
      <SignUpEmail
        clicked={(email, password) => props.clicked(email, password)}
        emailHandler={(event) => props.emailHandler(event)}
        emailErr={props.emailErr}
        passErr={props.passErr}
      />
    </div>
  );
};

export default CreateAccount;
