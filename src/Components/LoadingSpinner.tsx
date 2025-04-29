import React from "react";
import "../styles/LoadingSpinner.css";

export interface LoadingSpinnerProps {
  /**
  @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * The variant/color of the spinner
   * @default 'primary'
   */
  variant?: "primary" | "secondary" | "success";

  /**
   */
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  variant = "primary",
  className = "",
}) => {
  return (
    <div
      className={`spinner spinner-${size} spinner-${variant} ${className}`}
      role="status"
      aria-label="Loading"
    ></div>
  );
};
