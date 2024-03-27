import { Link } from "react-router-dom";
import "./login.scss";
import Logo from "../../images/logo.svg";
import SocialMediaLogIn from "../socialmedia/socialmedialogin";
import SignIn from "../signin/signin";
import InputModal from "../input-modal/input-modal";
import ForgotPassword from "../forgot-password/forgot-password";

const Login = (props) => {
  return (
    <>
      <div className="main-container">
        <div className="loginHeader">
          <Link to="/">
            <div>
              <img src={Logo} alt="Logo" />
            </div>
          </Link>
          <div className="memberStatus">
            <span>Not a member?</span>
            <Link to="/signup" className="link">
              Sign up
            </Link>
          </div>
        </div>
        <div className="content">
          <div className="loginForm">
            <h1 className="title">Welcome back!</h1>
            <p className="subTitle">The universe of digital decor awaits you</p>
            <SocialMediaLogIn />
            <SignIn />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
