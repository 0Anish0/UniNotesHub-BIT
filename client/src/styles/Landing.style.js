import styled from "styled-components";
import img from "../assets/landing.jpg";

export const LandingStyle = styled.div`
  height: 100vh;
  background: url(${img}) no-repeat center center/cover;
  color: #ffffff;
  .dark-overlay {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
  }
  .landing-inner {
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  h1 {
    span {
      color: yellow;  // Change this to the desired color for "Hub"
    }
  }
  .landing-inner form {
    width: 30%;
  }
`;

