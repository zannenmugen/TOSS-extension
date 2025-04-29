import React from 'react';
import { Scan } from 'lucide-react';
import '../styles/Scanner.css';

interface ScannerProps {
  onScan: () => void;
}

export const Scanner: React.FC<ScannerProps> = ({ onScan }) => {
  return (
    <>
      <div className="divider">
        <span className="divider-text">OR</span>
      </div>
      
      <div className="scanner">
        <p className="scanner-text">Or scan current page</p>
        <button onClick={onScan} className="scan-button">
          <Scan size={20} />
        </button>
      </div>
    </>
  );
};