import React from "react";
import { Link } from "lucide-react";
import { LoadingSpinner } from "./Components/LoadingSpinner";
import type { ScrapedLink } from "./types";
import { getCurrentTabUrl } from "./utils/chrome";

interface LegalLinkSelector {
  links: ScrapedLink[];
  selectedUrl: string;
  handleResult: (url: string) => void;
}

type LegalLinkSelectorProps = {
  backToHome: () => void;
} & LegalLinkSelector;

const LegalLinkSelector: React.FC<LegalLinkSelectorProps> = ({
  links,
  handleResult,
  backToHome,
  selectedUrl,
}) => {
  const [loading, setLoading] = React.useState<boolean>(true);

  const handletoplevel = () => {
    getCurrentTabUrl().then((url) => {
      let tld = new URL(url).hostname;
      let protocol = new URL(url).protocol;
      handleResult(`${protocol}//${tld}`);
    });
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner size="lg" variant="primary" />
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="no-links">
        No legal links found on this page
        <button onClick={handletoplevel} className="top-level">
          Use Top Level Domain Instead
        </button>
        <button onClick={backToHome} className="back-to-home">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="link-selector">
      <div className="link-summary">
        Found {links.length} potential legal link{links.length !== 1 ? "s" : ""}
        :
      </div>
      <div className="link-list">
        {links.map((link, index) => (
          <button
            key={index}
            onClick={() => handleResult(link.url)}
            className={`link-item ${
              selectedUrl === link.url ? "selected" : ""
            }`}
          >
            <Link className="link-icon" />
            <div className="link-content">
              <div className="link-url">{link.url}</div>
            </div>
            <div className="link-confidence">
              {Math.round(link.confidence * 100)}% match
            </div>
          </button>
        ))}
      </div>
      <button onClick={backToHome} className="back-to-home">
        Back to Home
      </button>
    </div>
  );
};

export default LegalLinkSelector;
