import axios from "axios";
import RefreshToken from "./refreshToken";

// artist snippet get call
export async function ArtistSnippet(accessToken, refreshToken) {
  let data_artist;
  let artist;

  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/artist-snippet`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response)
    .then((res) => {
      if (res) {
        data_artist = res.data;
        // console.log(data_artist);
      }
    })
    .catch((err) => {
      let newAccessToken;
      async function fetchRefreshToken() {
        newAccessToken = await RefreshToken(refreshToken);
        window.localStorage.setItem(
          "Access_Key",
          newAccessToken.data.access_token
        );
        window.localStorage.setItem(
          "Expire_Time",
          newAccessToken.data.expires_in
        );
        window.localStorage.setItem(
          "Refresh_Key",
          newAccessToken.data.refresh_token
        );

        await axios
          .get(`${process.env.REACT_APP_ROOT_URL}/api/artist-snippet`, {
            headers: {
              Authorization: `Bearer ${newAccessToken.data.access_token}`,
            },
          })
          .then((response) => response)
          .then((res) => {
            if (res) {
              data_artist = res.data;
              // console.log(data_artist);
            }
          })
          .catch((err) => {
            console.log("Error in fetching data, please reload the page.");
          });
        return data_artist;
      }
      artist = fetchRefreshToken();
      return artist;
    });
  return data_artist;
}

// edit profile get call --arpan
export async function getEditProfileDetails(accessToken) {
  let response;
  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/edit-detail`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log("Edit details issue", err));
  return response;
}

// editprofile get call
export async function GetEdit(accessToken, refreshToken) {
  let getEdit;
  let refreshGetEdit;

  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/edit-detail`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response)
    .then((data) => {
      getEdit = data.data;
      console.log(getEdit);
    })
    .catch((err) => {
      let newAccessToken;
      async function fetchRefreshToken() {
        newAccessToken = await RefreshToken(refreshToken);
        console.log(newAccessToken);
        const accessKey = newAccessToken.data.access_token;
        const expiresIn = newAccessToken.data.expires_in;
        const refreshKey = newAccessToken.data.refresh_token;
        if ((accessKey && expiresIn, refreshKey)) {
          let time = new Date().getTime();
          window.localStorage.setItem("Access_Key", accessKey);
          window.localStorage.setItem(
            "Expire_Time",
            Number(expiresIn) * 1000 + time
          );
          window.localStorage.setItem("Refresh_Key", refreshKey);
        }

        await axios
          .get(`${process.env.REACT_APP_ROOT_URL}/api/edit-detail`, {
            headers: {
              Authorization: `Bearer ${newAccessToken.data.access_token}`,
            },
          })
          .then((response) => response)
          .then((data) => {
            getEdit = data.data;
          })
          .catch((err) => {
            console.log("Error in fetching data, please reload the page.");
          });
        return getEdit;
      }
      refreshGetEdit = fetchRefreshToken();
      return refreshGetEdit;
    });
  return getEdit;
}

// editprofile put call
export async function PutEdit(accessToken, refreshToken, newProfileData) {
  let putEdit;
  // let refreshPutEdit;

  await axios
    .put(`${process.env.REACT_APP_ROOT_URL}/api/edit-detail/`, newProfileData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((data) => {
      putEdit = data;
    })
    .catch((err) => {
      //alert message
      alert("Couldn't update your profile. Please try again");

      // let newAccessToken;
      // async function fetchRefreshToken() {
      //   newAccessToken = await RefreshToken(refreshToken);
      //   window.localStorage.setItem(
      //     "Access_Key",
      //     newAccessToken.data.access_token
      //   );
      //   window.localStorage.setItem(
      //     "Expire_Time",
      //     newAccessToken.data.expires_in
      //   );
      //   window.localStorage.setItem(
      //     "Refresh_Key",
      //     newAccessToken.data.refresh_token
      //   );
      //   await axios
      //     .put(
      //       `${process.env.REACT_APP_ROOT_URL}/api/edit-detail/`,
      //       newProfileData,
      //       {
      //         headers: {
      //           Authorization: `Bearer ${newAccessToken.data.access_token}`,
      //         },
      //       }
      //     )
      //     .then((data) => {
      //       putEdit = data;
      //     })
      //     .catch((err) => {
      //       console.log("Error in fetching data, please reload the page.");
      //     });
      //   return putEdit;
      // }
      // refreshPutEdit = fetchRefreshToken();
      // return refreshPutEdit;
    });
  return putEdit;
}

// notification settings get call
export async function Notificationsettings(accessToken, refreshToken) {
  let notificationSettings;
  let notifications;

  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/notification-settings`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((data) => {
      notificationSettings = data.data;
    })
    .catch((err) => console.log("Notification settings issue", err));

  // .catch((err) => {
  //   let newAccessToken;
  //   async function fetchRefreshToken() {
  //     newAccessToken = await RefreshToken(refreshToken);
  //     window.localStorage.setItem(
  //       "Access_Key",
  //       newAccessToken.data.access_token
  //     );
  //     window.localStorage.setItem(
  //       "Expire_Time",
  //       newAccessToken.data.expires_in
  //     );
  //     window.localStorage.setItem(
  //       "Refresh_Key",
  //       newAccessToken.data.refresh_token
  //     );

  //     await axios
  //       .get(`${process.env.REACT_APP_ROOT_URL}/api/notification-settings`, {
  //         headers: {
  //           Authorization: `Bearer ${newAccessToken.data.access_token}`,
  //         },
  //       })
  //       // .then((response) => response)
  //       .then((data) => {
  //         notificationSettings = data.data;
  //         // console.log(notificationSettings);
  //       })
  //       .catch((err) => {
  //         console.log("Error in fetching data, please reload the page.");
  //       });
  //     return notificationSettings;
  //   }
  //   notifications = fetchRefreshToken();
  //   return notifications;
  // });

  return notificationSettings;
}

// notification settings put call
export async function NotificationsettingsPut(
  accessToken,
  refreshToken,
  newNotifications
) {
  let notificationSettings;
  // let notifications;

  await axios
    .put(
      `${process.env.REACT_APP_ROOT_URL}/api/notification-settings`,
      newNotifications,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((data) => {
      notificationSettings = data;
      console.log(notificationSettings);
    })
    .catch((err) => {
      // alert message
      alert("Couldn't change your notification settings. Please try again");

      // let newAccessToken;
      // async function fetchRefreshToken() {
      //   newAccessToken = await RefreshToken(refreshToken);
      //   window.localStorage.setItem(
      //     "Access_Key",
      //     newAccessToken.data.access_token
      //   );
      //   window.localStorage.setItem(
      //     "Expire_Time",
      //     newAccessToken.data.expires_in
      //   );
      //   window.localStorage.setItem(
      //     "Refresh_Key",
      //     newAccessToken.data.refresh_token
      //   );

      //   await axios
      //     .put(
      //       `${process.env.REACT_APP_ROOT_URL}/api/notification-settings`,
      //       newNotifications,
      //       {
      //         headers: {
      //           Authorization: `Bearer ${newAccessToken.data.access_token}`,
      //         },
      //         // data : newNotifications
      //       }
      //     )
      //     // .then((response) => response)
      //     .then((data) => {
      //       notificationSettings = data;
      //       console.log(notificationSettings);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      //   return notificationSettings;
      // }
      // notifications = fetchRefreshToken();
      // return notifications;
    });
  return notificationSettings;
}

// applist get call
export async function AppList(accessToken, refreshToken) {
  let appList;
  let appListRefresh;

  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/app-list`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((data) => {
      appList = data.data;
      // console.log();
    })
    .catch((err) => {
      let newAccessToken;
      async function fetchRefreshToken() {
        newAccessToken = await RefreshToken(refreshToken);
        window.localStorage.setItem(
          "Access_Key",
          newAccessToken.data.access_token
        );
        window.localStorage.setItem(
          "Expire_Time",
          newAccessToken.data.expires_in
        );
        window.localStorage.setItem(
          "Refresh_Key",
          newAccessToken.data.refresh_token
        );

        await axios
          .get(`${process.env.REACT_APP_ROOT_URL}/api/app-list`, {
            headers: {
              Authorization: `Bearer ${newAccessToken.data.access_token}`,
            },
          })
          .then((response) => response)
          .then((data) => {
            appList = data.data;
            // console.log(notificationSettings);
          })
          .catch((err) => {
            console.log("Error in fetching data, please reload the page.");
          });
        return appList;
      }
      appListRefresh = fetchRefreshToken();
      return appListRefresh;
    });
  return appList;
}

// tag list get call
export async function TagList(accessToken, refreshToken) {
  let tagList;
  let tagListRefresh;

  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/design-tag-list`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((data) => {
      tagList = data.data;
      // console.log();
    })
    .catch((err) => {
      let newAccessToken;
      async function fetchRefreshToken() {
        newAccessToken = await RefreshToken(refreshToken);
        window.localStorage.setItem(
          "Access_Key",
          newAccessToken.data.access_token
        );
        window.localStorage.setItem(
          "Expire_Time",
          newAccessToken.data.expires_in
        );
        window.localStorage.setItem(
          "Refresh_Key",
          newAccessToken.data.refresh_token
        );

        await axios
          .get(`${process.env.REACT_APP_ROOT_URL}/api/design-tag-list`, {
            headers: {
              Authorization: `Bearer ${newAccessToken.data.access_token}`,
            },
          })
          .then((response) => response)
          .then((data) => {
            tagList = data.data;
            // console.log(notificationSettings);
          })
          .catch((err) => {
            console.log("Error in fetching data, please reload the page.");
          });
        return tagList;
      }
      tagListRefresh = fetchRefreshToken();
      return tagListRefresh;
    });
  return tagList;
}

// upload design post call
export async function UploadDesignAPI(
  accessToken,
  refreshToken,
  uploadDesignData
) {
  let uploadDesign;
  let uploadDesignRefresh;

  await axios
    .post(
      `${process.env.REACT_APP_ROOT_URL}/api/upload-design`,
      uploadDesignData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((data) => {
      uploadDesign = data.data;
      // console.log();
    })
    .catch((err) => {
      let newAccessToken;
      async function fetchRefreshToken() {
        newAccessToken = await RefreshToken(refreshToken);
        window.localStorage.setItem(
          "Access_Key",
          newAccessToken.data.access_token
        );
        window.localStorage.setItem(
          "Expire_Time",
          newAccessToken.data.expires_in
        );
        window.localStorage.setItem(
          "Refresh_Key",
          newAccessToken.data.refresh_token
        );

        await axios
          .post(
            `${process.env.REACT_APP_ROOT_URL}/api/upload-design`,
            uploadDesignData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${newAccessToken.data.access_token}`,
              },
            }
          )
          // .then((response) => response)
          .then((data) => {
            uploadDesign = data.data;
            // console.log(notificationSettings);
          })
          .catch((err) => {
            console.log("Error in fetching data, please reload the page.");
          });
        return uploadDesign;
      }
      uploadDesignRefresh = fetchRefreshToken();
      return uploadDesignRefresh;
    });
  return uploadDesign;
}

// change password put call
export async function changePasswordPut(
  accessToken,
  refreshToken,
  newPassword
) {
  let passwordValue;
  // let password;

  await axios
    .put(
      `${process.env.REACT_APP_ROOT_URL}/api/change-password/`,
      newPassword,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((data) => {
      passwordValue = data;
      console.log(passwordValue);
    })
    .catch((err) => {
      // alert message
      alert("Couldn't change password. Please try again");

      // let newAccessToken;
      // async function fetchRefreshToken() {
      //   newAccessToken = await RefreshToken(refreshToken);
      //   window.localStorage.setItem(
      //     "Access_Key",
      //     newAccessToken.data.access_token
      //   );
      //   window.localStorage.setItem(
      //     "Expire_Time",
      //     newAccessToken.data.expires_in
      //   );
      //   window.localStorage.setItem(
      //     "Refresh_Key",
      //     newAccessToken.data.refresh_token
      //   );

      //   await axios
      //     .put(
      //       `${process.env.REACT_APP_ROOT_URL}/api/change-password/`,
      //       newPassword,
      //       {
      //         headers: {
      //           Authorization: `Bearer ${newAccessToken.data.access_token}`,
      //         },
      //       }
      //     )

      //     .then((data) => {
      //       passwordValue = data;
      //       console.log(passwordValue);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      //   return passwordValue;
      // }
      // password = fetchRefreshToken();
      // return password;
    });
  return passwordValue;
}

// filter list api
export async function filterList(application) {
  let filterListValue;

  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/filter-list/${application}`)
    .then((res) => {
      filterListValue = res.data;
    })
    .catch((err) => {
      console.log("Could not get filter-list:", err);
    });
  return filterListValue;
}

// product list api
export async function productList(application, count) {
  const accessToken = localStorage.getItem("Access_Key");
  let productListValue = [];
  let gotData = false;
  await axios
    .get(
      `${process.env.REACT_APP_ROOT_URL}/api/product-list/${application}?page-size=20&page=${count}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => {
      if (res) {
        gotData = true;
        productListValue = res.data;
      }
    })
    .catch((err) => {
      console.log("Something went wrong:", err);
    });

  if (gotData) {
    return productListValue;
  }
}

// product details api
export async function productDetails(slugName) {
  const accessToken = localStorage.getItem("Access_Key");
  let productDetailsValue;

  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/product-detail/${slugName}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      productDetailsValue = res.data;
    })
    .catch((err) => {
      console.log("Something went wrong:", err);
    });
  return productDetailsValue;
}

export async function materialList(application) {
  const accessToken = localStorage.getItem("Access_Key");
  let MaterialListValue;

  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/material-list/${application}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      MaterialListValue = res.data;
    })
    .catch((err) => {
      console.log("Something went wrong:", err);
    });
  return MaterialListValue;
}

// other colorways api
export async function otherColorways(otherColorway) {
  let otherColorwaysValue;
  const accessToken = localStorage.getItem("Access_Key");

  await axios
    .get(
      `${process.env.REACT_APP_ROOT_URL}/api/other-colorways/${otherColorway}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((data) => {
      otherColorwaysValue = data;
      // console.log(otherColorwaysValue);
    })
    .catch((err) => {
      console.log("Something went wrong:", err);
    });
  return otherColorwaysValue;
}

// other applications api
export async function otherApplications(otherApplication) {
  let otherApplicationsValue;
  const accessToken = localStorage.getItem("Access_Key");

  await axios
    .get(
      `${process.env.REACT_APP_ROOT_URL}/api/other-applications/${otherApplication}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((data) => {
      otherApplicationsValue = data;
      // console.log(otherApplicationsValue);
    })
    .catch((err) => {
      console.log("Something went wrong:", err);
    });
  return otherApplicationsValue;
}

// similar designs api
export async function similarDesigns(similarDesign) {
  let similarDesignsValue;
  const accessToken = localStorage.getItem("Access_Key");

  await axios
    .get(
      `${process.env.REACT_APP_ROOT_URL}/api/similar-designs/${similarDesign}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((data) => {
      similarDesignsValue = data;
      // console.log(similarDesignsValue);
    })
    .catch((err) => {
      console.log("Something went wrong:", err);
    });
  return similarDesignsValue;
}

// latest designs api
export async function LatestDesigns() {
  let latestDesignsValue = [];

  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/latest-design/`)
    .then((res) => {
      if (res) {
        latestDesignsValue = res.data;
      }
      // console.log('latestDesing:', latestDesignsValue);
    })
    .catch((err) => {
      console.log("Something went wrong:", err);
    });
  return latestDesignsValue;
}

// artist snippet get call
export async function ArtistListStatus(accessToken, refreshToken, count) {
  let data_artist_status;
  let artist_status;
  // let gotData

  await axios
    .get(
      `${process.env.REACT_APP_ROOT_URL}/api/artist-list-status/?page-size=${count}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => response)
    .then((data) => {
      data_artist_status = data.data;
    })
    .catch((err) => {
      let newAccessToken;
      async function fetchRefreshToken() {
        newAccessToken = await RefreshToken(refreshToken);
        window.localStorage.setItem(
          "Access_Key",
          newAccessToken.data.access_token
        );
        window.localStorage.setItem(
          "Expire_Time",
          newAccessToken.data.expires_in
        );
        window.localStorage.setItem(
          "Refresh_Key",
          newAccessToken.data.refresh_token
        );

        await axios
          .get(
            `${process.env.REACT_APP_ROOT_URL}/api/artist-list-status/?page-size=${count}&page=1`,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken.data.access_token}`,
              },
            }
          )
          .then((response) => response)
          .then((data) => {
            data_artist_status = data.data;
          })
          .catch((err) => {
            console.log("Error in fetching data, please reload the page.");
          });
        return data_artist_status;
      }
      artist_status = fetchRefreshToken();
      return artist_status;
    });
  return data_artist_status;
}

// artist snippet post call
export async function ArtistListStatusPost(
  accessToken,
  refreshToken,
  followStatus
) {
  let data_artist_status;
  let artist_status;

  await axios
    .post(
      `${process.env.REACT_APP_ROOT_URL}/api/artist-list-status/`,
      followStatus,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => response)
    .then((res) => {
      if (res) {
        data_artist_status = res.data;
      }
    })
    .catch((err) => {
      let newAccessToken;
      async function fetchRefreshToken() {
        newAccessToken = await RefreshToken(refreshToken);
        window.localStorage.setItem(
          "Access_Key",
          newAccessToken.data.access_token
        );
        window.localStorage.setItem(
          "Expire_Time",
          newAccessToken.data.expires_in
        );
        window.localStorage.setItem(
          "Refresh_Key",
          newAccessToken.data.refresh_token
        );

        await axios
          .post(`${process.env.REACT_APP_ROOT_URL}/api/artist-list-status/`, {
            headers: {
              Authorization: `Bearer ${newAccessToken.data.access_token}`,
            },
          })
          .then((response) => response)
          .then((res) => {
            if (res) {
              data_artist_status = res.data;
            }
          })
          .catch((err) => {
            console.log("Error in fetching data, please reload the page.");
          });
        return data_artist_status;
      }
      artist_status = fetchRefreshToken();
      return artist_status;
    });
  return data_artist_status;
}

// Get Decorator Snippet
export const getDecoratorSnippet = async () => {
  const accessToken = localStorage.getItem("Access_Key"); // TODO: Remove this and put in Axios default config

  let response;

  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/decorator-snippet`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log("Error getting data", err));

  return response;
};

// Get Decorator Favourites
export const getDecoratorFavourites = async (count) => {
  const accessToken = localStorage.getItem("Access_Key"); // TODO: Remove this and put in Axios default config
  let response = [];

  await axios
    .get(
      `${process.env.REACT_APP_ROOT_URL}/api/decorator-favourites?page-size=2&page=${count}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log("Error getting data", err));

  return response;
};

// Get Decorator Collection
export const getDecoratorCollection = async () => {
  const accessToken = localStorage.getItem("Access_Key"); // TODO: Remove this and put in Axios default config
  let response = [];

  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/decorator-collections`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log("Error getting data", err));

  return response;
};

// Get Decorator Orders
export const getDecoratorOrders = async (count) => {
  const accessToken = localStorage.getItem("Access_Key"); // TODO: Remove this and put in Axios default config
  let response = [];

  await axios
    .get(
      `${process.env.REACT_APP_ROOT_URL}/api/my-order?page-size=6&page=${count}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log("Error getting data", err));

  return response;
};

// Follow artist
export const followArtist = async (formData) => {
  const accessToken = localStorage.getItem("Access_Key");
  let response;
  await axios
    .post(`${process.env.REACT_APP_ROOT_URL}/api/follow-artist`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => (response = res.data));
  return response;
};

// Unfollow artist
export const unfollowArtist = async (formData) => {
  const accessToken = localStorage.getItem("Access_Key");
  let response;
  await axios
    .put(`${process.env.REACT_APP_ROOT_URL}/api/follow-artist`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => (response = res.data));
  return response;
};

// Get Decorator's Following List
export const getDecoratorFollowing = async () => {
  const accessToken = localStorage.getItem("Access_Key"); // TODO: Remove this and put in Axios default config
  let response = [];

  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/artist-list-status`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      response = res.data;
    })
    .catch((err) => console.log("Error getting data", err));

  return response;
};

// List of Featured Artist on Landing page
export const featuredArtistsList = async () => {
  let artists = [];

  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/featured-artist-list`)
    .then((res) => {
      if (res) {
        artists = res.data;
      }
    })
    .catch((err) => console.log("Error in featuredArtistList API", err));
  return artists;
};

// List of Designs on Landing page
export const designList = async () => {
  let response = [];

  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/Design-list`)
    .then((res) => {
      if (res) {
        response = res.data;
      }
    })
    .catch((err) => console.log("Error in designList API", err));
  return response;
};

// Product Reviews On Landing page
export const productReview = async () => {
  let response = [];

  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/product-review`)
    .then((res) => {
      if (res) {
        response = res.data;
      }
    })
    .catch((err) => console.log("Error in productReview API", err));
  return response;
};

// Add product to favorite
export const addToFavourite = async (id) => {
  const accessToken = localStorage.getItem("Access_Key");
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ROOT_URL}/api/add-to-favourites/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    alert(`Couldn't add to favourite`);
  }
};

// Remove from favourite
export const removeFavourite = async (id) => {
  const accessToken = localStorage.getItem("Access_Key");
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ROOT_URL}/api/remove-from-favourites/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    alert(`Couldn't remove from favourite`);
  }
};

// Get analytics response
export const getAnalytics = async () => {
  const accessToken = localStorage.getItem("Access_Key");
  let response;
  await axios
    .get(`${process.env.REACT_APP_ROOT_URL}/api/business-analytic`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => (response = res.data))
    .catch(() => alert("Couldn't fetch analytics data"));

  return response;
};

// Get Artist Details
export const getArtistDetails = async (artistId) => {
  const accessToken = localStorage.getItem("Access_Key");

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ROOT_URL}/api/artist-details/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    alert("Couldn't fetch Artist Details");
  }
};

export const getArtistDesignList = async (artistId, count) => {
  const accessToken = localStorage.getItem("Access_Key");

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ROOT_URL}/api/artist-design-list/${artistId}?page-size=20&page=${count}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    // alert("Couldn't fetch Artist Design List");
  }
};

export const getUnderReviews = async (count) => {
  const accessToken = localStorage.getItem("Access_Key");

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_ROOT_URL}/api/under-review?page=${count}&page-size=9`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // console.log(response.data)
    return response.data;
  } catch (err) {
    // alert("Couldn't fetch under reviews");
  }
};

export const addProductToCollection = async (formData) => {
  const accessToken = localStorage.getItem("Access_Key");

  try {
    await axios.patch(
      `${process.env.REACT_APP_ROOT_URL}/api/decorator-collections`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    alert("Product added to collection successfully");
  } catch (err) {
    alert("Couldn't add to collection");
  }
};

export const addProductToNewCollection = async (formData) => {
  const accessToken = localStorage.getItem("Access_Key");

  try {
    await axios.post(
      `${process.env.REACT_APP_ROOT_URL}/api/decorator-collections`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    alert("Collection created and add product successfully");
  } catch (err) {
    alert("Couldn't create new collection");
  }
};

export const updateCollection = async (formData) => {
  const accessToken = localStorage.getItem("Access_Key");

  try {
    await axios.put(
      `${process.env.REACT_APP_ROOT_URL}/api/decorator-collections`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    alert("Collection updated successfully");
  } catch (err) {
    alert("Couldn't update that collection");
  }
};

export const deleteCollection = async (formData) => {
  const accessToken = localStorage.getItem("Access_Key");

  try {
    await axios.delete(
      `${process.env.REACT_APP_ROOT_URL}/api/decorator-collections`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: formData,
      }
    );
    alert("Collection delete successfully");
  } catch (err) {
    alert("Couldn't update that collection");
  }
};
