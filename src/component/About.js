import React from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarReact from "./Navbar";
import "../style/about.css"


function About() {
  let navigate = useNavigate();
  return (
    <div>
      <NavbarReact />
    <div className="about">
      <Row className="justify-content-md-center mt-4">
        <Col md="8">
          <div className="border p-4">
            <h1 className="mb-4">Welcome to Blend With Nature App</h1>
            <p>
              Thank you for using our awesome app. Follow the instructions below
              to get started.
            </p>
            <h2 className="instruction">Instructions:</h2>
            <ol>
              <li>
                Step 1: Begin by adding the colors collection for Dress, Hand Bag, 
                watch, and Shoe in the Profile section
              </li>
              <li>
                Step 2: Press the Suggest Color button to receive today's Dress color 
                suggestion on the Home page
              </li>
              <li>
                Step 3: Press the Suggest Color button to receive today's Dress color 
                suggestion on the Home page
              </li>
            </ol>
            <p>Get the Suggestion and enjoy the app!</p>
            <button className="btn2" onClick={() => navigate("/home")}>
              Get Started
            </button>
          </div>
        </Col>
      </Row>
    </div>
    </div>
  );
};

export default About;