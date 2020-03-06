import React from "react";
import { Button, Container } from "@material-ui/core";
import { signInWithGoogle } from "../utils/FirebaseAuthUtils";

const Startup = () => {
  return (
    <Container
      style={{
        height: "100%",
        background: "linear-gradient(153deg, #67A6FC 50%, #D4FFE8 90%)",
        position: "absolute"
      }}
    >
      <div style={{ marginTop: "25%", textAlign: "center" }}>
        <div
          style={{
            fontSize: "40px",
            display: "inline-block",
            fontFamily: "Gill Sans Nova",
            fontWeight: "bolder",
            color: "white",
            letterSpacing: "4px"
          }}
        >
          THRIFT
        </div>
        <div
          style={{
            display: "inline-block",
            fontFamily: "Gill Sans Nova",
            fontStyle: "italic",
            color: "white",
            letterSpacing: "4px",
            fontSize: "40px",
            fontWeight: "100"
          }}
        >
          SHIFT
        </div>
      </div>
      <img src="logo.png" style={{ mixBlendMode: "multiply" }}></img>
      <div style={{ color: "white", marginTop: "10%", fontSize: "19px" }}>
        Welcome! Are you interested in selling your items to local thrift
        stores, or are you a local store owner looking to buy?
      </div>
      <Button
        variant="contained"
        type="submit"
        style={{
          background: "#67A6FC",
          marginTop: "10%",
          color: "white",
          width: "30%",
          marginLeft: "35%"
        }}
        onClick={signInWithGoogle}
      >
        Sign In
      </Button>
    </Container>
  );
};

export { Startup };
