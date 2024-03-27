import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const ShareCart = () => {
  const location = useLocation();
  useEffect(() => {
    const param1 = new URLSearchParams(location.search).get("cart");
    const param2 = new URLSearchParams(location.search).get("client");
  });

  return (
    <>
      <p>hello ShareCart</p>
    </>
  );
};
export default ShareCart;
