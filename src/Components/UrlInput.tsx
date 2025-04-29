import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../styles/UrlInput.css';

interface UrlInputProps {
  url: string;
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const UrlInput: React.FC<UrlInputProps> = ({ url, onUrlChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="url-form">
      <p className="url-input-label">Enter Target ToS URL</p>
      <div className="url-input-container">
        <input
          type="url"
          id="url"
          value={url}
          onChange={onUrlChange}
          placeholder="https://example.com/tos"
          className="url-input"
        />
        <button type="submit" className="url-submit-btn">
          <ArrowRight size={20} />
        </button>
      </div>
    </form>
  );
};