import React from "react";
import { Coffee, Clock } from "lucide-react";
import "../styles/Navigation.css";

interface NavigationProps {
  onHomeClick: () => void;
  onAboutClick: () => void;
  onHistoryClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onHomeClick,
  onAboutClick,
  onHistoryClick,
}) => {
  const coffeeurl = [
    "https://buymeacoffee.com/sachinpandit",
    "https://buymeacoffee.com/bibhav48",
  ];

  const getRandomCoffeeUrl = () => {
    return coffeeurl[Math.floor(Math.random() * 2)];
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <button className="nav-brand" onClick={onHomeClick}>
          <img src="../images/Group 1.png" id="nav-logo" />
        </button>

        <div className="nav-links">
          <button className="nav-link" onClick={onAboutClick}>
            About Us
          </button>

          <a
            href={getRandomCoffeeUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            <Coffee />
          </a>

          <button className="nav-link" onClick={onHistoryClick}>
            <Clock />
          </button>
        </div>
      </div>
    </nav>
  );
};
