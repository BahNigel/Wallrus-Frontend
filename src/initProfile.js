import { userDetailActions } from "./redux/Slices/userSnippet/userSnippet";
import { ArtistSnippet, getDecoratorSnippet } from "./apis/apiCalls";

const accessToken = localStorage.getItem("Access_Key");
const refreshToken = localStorage.getItem("Refresh_Key");

export const decoProfile = (dispatch) => {
  dispatch(userDetailActions.setLoader(true));
  getDecoratorSnippet()
    .then((res) => {
      dispatch(
        userDetailActions.setDetails({
          firstName: res.first_name,
          lastName: res.last_name,
          profilePic: res.profile_picture,
          entryLevel: res.entry_level
        })
      );
      dispatch(userDetailActions.setLoader(false));
    })
    .catch((err) => {
      // alert("Couldn't fetch your details");
      dispatch(userDetailActions.setLoader(false));
    });
};

export const artistProfile = (dispatch) => {
  dispatch(userDetailActions.setLoader(true));
  ArtistSnippet(accessToken, refreshToken)
    .then((res) => {
      dispatch(
        userDetailActions.setDetails({
          firstName: res.first_name,
          lastName: res.last_name,
          profilePic: res.profile_picture,
          entryLevel: res.entry_level
        })
      );
      dispatch(userDetailActions.setLoader(false));
    })
    .catch((err) => {
      // alert("Couldn't fetch your details");
      dispatch(userDetailActions.setLoader(false));
    });
};
