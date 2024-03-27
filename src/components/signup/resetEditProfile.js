import {
  setProfilePic,
  setFullName,
  setUserName,
  setEmail_AboutYou,
  setPhoneNumber_AboutYou,
  setAddress_Street_AboutYou,
  setAddress_Apartment_AboutYou,
  setState_AboutYou,
  setCity_AboutYou,
  setPincode_AboutYou,
  setBio,
  setOrganization,
  setPan,
  setGst,
  setEmail_Business,
  setPhoneNumber_Business,
  setAddress_Street_Business,
  setAddress_Apartment_Business,
  setState_Business,
  setCity_Business,
  setPincode,
  setAccountNumber,
  setIFSCCode,
  setBankName,
  setBankBranch,
  setSwiftCode,
  setAccountType,
  setEmailNumber,
  setPassword,
} from "../../redux/Slices/userSignUpSlice/userSignUpSlice";

export const resetProfileData = (dispatch) => {
  dispatch(
    setAccountType({
      account_type: "",
    })
  );
  dispatch(
    setEmailNumber({
      email_Number: "",
    })
  );
  dispatch(
    setPassword({
      password: "",
    })
  );
  dispatch(
    setProfilePic({
      profilePic: "",
    })
  );
  dispatch(
    setEmail_AboutYou({
      email_aboutyou: "",
    })
  );
  dispatch(
    setFullName({
      fullName: "",
    })
  );
  dispatch(
    setUserName({
      userName: "",
    })
  );
  dispatch(
    setPhoneNumber_AboutYou({
      phoneNumber_aboutyou: "",
    })
  );
  dispatch(
    setBio({
      bio: "",
    })
  );
  dispatch(
    setAddress_Street_AboutYou({
      address_street_aboutyou: "",
    })
  );
  dispatch(
    setAddress_Apartment_AboutYou({
      address_apartment_aboutyou: "",
    })
  );
  dispatch(
    setCity_AboutYou({
      city_aboutyou: "",
    })
  );
  dispatch(
    setPincode_AboutYou({
      pincode_aboutyou: "",
    })
  );
  dispatch(
    setState_AboutYou({
      state_aboutyou: "",
    })
  );
  dispatch(
    setOrganization({
      organization: "",
    })
  );
  dispatch(
    setPan({
      pan: "",
    })
  );
  dispatch(
    setGst({
      gst: "",
    })
  );
  dispatch(
    setEmail_Business({
      email_business: "",
    })
  );
  dispatch(
    setPhoneNumber_Business({
      phoneNumber_business: "",
    })
  );
  dispatch(
    setAddress_Street_Business({
      address_street_business: "",
    })
  );
  dispatch(
    setAddress_Apartment_Business({
      address_apartment_business: "",
    })
  );
  dispatch(
    setCity_Business({
      city_business: "",
    })
  );
  dispatch(
    setPincode({
      pincode: "",
    })
  );
  dispatch(
    setState_Business({
      state_business: "",
    })
  );
  dispatch(
    setAccountNumber({
      accountNumber: "",
    })
  );
  dispatch(
    setIFSCCode({
      ifscCode: "",
    })
  );
  dispatch(
    setBankName({
      bankName: "",
    })
  );
  dispatch(
    setBankBranch({
      bankBranch: "",
    })
  );
  dispatch(
    setSwiftCode({
      swiftCode: "",
    })
  );
};
