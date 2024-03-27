const Page404 = () => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        margin: "1rem",
        marginTop: "180px",
        textAlign: "center",
      }}
    >
      <div>
        <h1
          style={{
            fontWeight: "700",
            fontSize: "64px",
            lineHeight: "72px",
            color: "#F47A32",
            margin: 0,
            padding: 0,
          }}
        >
          404
        </h1>
        <h3
          style={{
            fontWeight: "500",
            fontSize: "32px",
            lineHeight: "40px",
            color: "#6D747A",
            margin: 0,
            padding: 0,
          }}
        >
          Error!
        </h3>
        <h2
          style={{
            fontWeight: "600",
            fontSize: "40px",
            lineHeight: "48px",
            color: "#000000",
            margin: 0,
            padding: "1.5rem 0",
          }}
        >
          Ooops! You weren’t supposed to see this
        </h2>
        <p
          style={{
            fontWeight: "500",
            fontSize: "18px",
            lineHeight: "24px",
            color: "#6D747A",
            maxWidth: "500px",
            margin: "0 auto",
            padding: 0,
          }}
        >
          The page you are looking for no longer exists. Return to{" "}
          <a
            href="/"
            style={{
              fontWeight: "500",
              fontSize: "18px",
              lineHeight: "24px",
              color: "#6D747A",
              textDecoration: "underline",
            }}
          >
            homepage
          </a>{" "}
          and remember you haven’t seen anything.
        </p>
      </div>
    </div>
  );
};

export default Page404;
