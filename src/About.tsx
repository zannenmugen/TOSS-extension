import React from "react";

type Props = {
  backToHome: () => void;
};

const About = ({ backToHome }: Props) => {
  return (
    <div className="about-container">
      <h1 className="h1about">About Us</h1>
      <p>
        Terms of Service Scanner or ToSS is a tool that scans the Terms of
        Service of a website and provides a summary of the important points.
      </p>
      <p>
        Simply enter the URL of the Terms of Service page or scan the current
        page to get a summary of the key points.
      </p>
      <p>
        This is developed by{" "}
        <a
          href="https://www.linkedin.com/in/sachinpandit140"
          target="_blank"
          rel="noopener noreferrer"
          id="hyperlink-name"
        >
          Sachin Pandit
        </a>{" "}
        and{" "}
        <a
          href="https://www.linkedin.com/in/bibhavadhikari"
          target="_blank"
          rel="noopener noreferrer"
          id="hyperlink-name"
        >
          Bibhav Adhikari
        </a>{" "}
        in collaboration.
      </p>

      <p>©2024 - Present. All rights reserved </p>
      <button className="back-to-home-legacy" onClick={backToHome}>
        Back To Home
      </button>
    </div>
  );
};

export default About;
