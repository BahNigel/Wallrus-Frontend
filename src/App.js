import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useParams,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./apis/AuthContext";
import Hidden from "@material-ui/core/Hidden";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import Confirmation from "./components/confirmation/confirmation";
import PhoneNumberVerification from "./components/verification/phone-number";
import EmailVerification from "./components/verification/email";
import Dashboard from "./components/dashboard/dashboard";
import Editprofile from "./components/EditProfile/EditProfile";
import UploadDesign from "./components/upload-design/upload-design";
import CustomizeDesignForm from "./components/home/Forms/Customize-design-form/Customize-design-form";
import EditDesign from "./components/edit-design/edit-design";
import UploadDesignForm from "./components/home/Forms/Upload-design-form/upload-design-form";
import "./App.scss";
import MobileDashboard from "./components/dashboard/MobileDashboard";
import LandingPage from "./components/home/landing-page/landing-page";
import ArtistList from "./components/home/artist/artistList";
import ViewArtist from "./components/home/artist/viewArtist";
import MyStudio from "./components/home/artist/myStudio";
import MobileMyStudio from "./components/home/artist/MobileMyStudio";
import HomeDiscover from "./components/home/home-discover/home-discover";
import HomeFAQ from "./components/home/home-faq/home-faq";
import Shop from "./components/home/Shop/Shop";
import Product from "./components/home/Shop/product/product";
import UserProfile from "./components/home/userprofile/userprofile";
import Collection from "./components/home/userprofile/user-profile-tabs-components/user-collections/collection/collection";
import OrderStatus from "./components/home/order-status/order-status";
import Cart from "./components/home/cart/cart";
import Payment from "./components/home/payment/payment";
import RequestForm from "./components/home/Forms/Request-Management-Form/request-form";
import AboutUs from "./components/home/landing-page/about-us/about-us";
import DesignToSell from "./components/home/landing-page/design-to-sell/design-to-sell";
import ForgotPassword from "./components/forgot-password/forgot-password";
import CollectionModel from "./components/collection-model/collection-model";
import Contents from "./components/contents/contents";
import Page404 from "./components/page404/Page404";
import SharedCart from "./components/SharedLink/cart/cart";
import StudioScreen from "./components/StudioScreen/StudioScreen";
import ComingSoon from "./components/coming-soon/ComingSoon";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isArtist, setIsArtist] = useState(false);
  const history = useHistory();

  const getToken = () => {
    let time = new Date().getTime();
    const expire = new Date(
      Number(window.localStorage.getItem("Expire_Time"))
    ).getTime();
    if (expire < time) {
      const refresh = window.localStorage.getItem("Refresh_Key");
      const requestOptions = {
        client_id: process.env.REACT_APP_login_client_id,
        client_secret: process.env.REACT_APP_login_client_secret,
        grant_type: "refresh_token",
        refresh_token: refresh,
      };
      axios
        .post(`${process.env.REACT_APP_ROOT_URL}/auth/token`, requestOptions)
        .then((res) => {
          let newAccessToken = res.data;
          window.localStorage.setItem(
            "Access_Key",
            newAccessToken.access_token
          );
          window.localStorage.setItem(
            "Expire_Time",
            Number(newAccessToken.expires_in) * 1000 + time
          );
          window.localStorage.setItem(
            "Refresh_Key",
            newAccessToken.refresh_token
          );
          window.location.reload();
        })
        .catch((err) => {
          alert("REFRESH Error in fetching data, please log in again.");
          console.log(err);
          window.localStorage.clear();
          window.sessionStorage.clear();
          setIsAuth(false);
          history?.push("/");
        });
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("Access_Key")) {
      setIsAuth(true);
      if (window.localStorage.getItem("User_Type") === "Artist") {
        setIsArtist(true);
      }

      getToken();
    }
  }, []);

  let routes;

  axios.defaults.baseURL = `${process.env.REACT_APP_ROOT_URL}`;

  if (isAuth) {
    routes = (
      <>
        <Switch>
          <Route exact path="/home">
            <Shop />
            {/* <CollectionModel /> */}
          </Route>
          <Route exact path="/shop">
            <Shop />
          </Route>
          <Route exact path="/uploaddesignform">
            {/* <UploadDesignForm /> */}
            <ComingSoon />
          </Route>
          <Route exact path="/shop/:id">
            <Product />
          </Route>
          <Route exact path="/shop/:id/:customizedesign">
            {/* <CustomizeDesignForm /> */}
            <ComingSoon />
          </Route>
          <Route exact path="/collection/:id">
            <Collection />
          </Route>
          <Route exact path="/requestForm">
            <RequestForm />
          </Route>
          <Route exact path="/orderstatus">
            <OrderStatus />
          </Route>
          <Route exact path="/userprofile">
            <UserProfile />
          </Route>
          <Route exact path="/artist">
            <ArtistList />
          </Route>
          <Route exact path="/artist/:name">
            <ViewArtist />
          </Route>
          {/* <Route exact path="/studio">
          <Hidden only={["xs", "sm"]}>
            <MyStudio />
          </Hidden>
          <Hidden mdUp>
            <MobileMyStudio />
          </Hidden>
        </Route> */}
          <Route exact path="/discover">
            <HomeDiscover />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/payment">
            <Payment />
          </Route>
          <Route exact path="/faq">
            <HomeFAQ />
          </Route>
          <Route exact path="/dashboard">
            <Hidden only={["xs", "sm"]}>
              <Dashboard />
            </Hidden>
            <Hidden mdUp>
              <MobileDashboard />
            </Hidden>
          </Route>
          <Route exact path="/editprofile">
            <Editprofile />
          </Route>
          <Route exact path="/upload-design">
            <UploadDesign />
          </Route>
          <Route exact path="/edit-design">
            <EditDesign />
          </Route>
          <Route path="/shared/:client/:cart">
            <SharedCart />
          </Route>
          <Route path="/studio-screen">
            <StudioScreen />
          </Route>
          <Route exact path="/contents/:id">
            <Contents />
          </Route>
          <Route
            exact
            path="/"
            render={() => {
              return isArtist ? (
                <Redirect to="/dashboard" />
              ) : (
                <Redirect to="/home" />
              );
            }}
          />
          <Route
            path="*"
            render={() => {
              return isArtist ? (
                <Redirect to="/dashboard" />
              ) : (
                <Redirect to="/home" />
              );
            }}
          />
        </Switch>
      </>
    );
  } else {
    routes = (
      <>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/confirmation">
            <Confirmation />
          </Route>
          <Route exact path="/verifyPhone">
            <PhoneNumberVerification />
          </Route>
          <Route exact path="/verifyEmail">
            <EmailVerification />
          </Route>
          <Route exact path="/contents/:id">
            <Contents />
          </Route>
          <Route exact path="/about-us" component={AboutUs} />
          <Route exact path="/design-to-sell" component={DesignToSell} />
          <Route path="/shared/:client/:cart" component={SharedCart} />

          <Route
            exact
            path="/forgot-password/:email/:uidb64/:token"
            component={ForgotPassword}
          />
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, isArtist, setIsArtist }}>
      <div className="App">
        <Router>{routes}</Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
