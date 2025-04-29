import React from "react";
import "./styles/Button.css";

interface ButtonImageProps {
  image: string; 
  altText?: string; 
  name?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonImage: React.FC<ButtonImageProps> = ({ image, altText = "Button image",name="button", onClick }) => {
  return (
    <button className="button-with-image" onClick={onClick}>
      <img src={image} alt={altText} className="button-image" id={name} />
    </button>
  );
};

export default ButtonImage;
