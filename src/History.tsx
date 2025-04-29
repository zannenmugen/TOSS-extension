import React from "react";
import { LoadingSpinner } from "./Components/LoadingSpinner";
import { Link } from "lucide-react";
import { ResultData } from "./Result";
import { Trash } from "lucide-react";

type Props = {
  backToHome: () => void;
  handleHistoryToResult: (data: ResultData) => void;
};

const History = ({ backToHome, handleHistoryToResult }: Props) => {
  const [res, setRes] = React.useState<ResultData[]>([]);

  chrome.storage.sync.get("history", function (result) {
    setRes(result.history || []);
  });

  function handleClearHistory() {
    chrome.storage.sync.set({ history: [] });
  }

  function handleClearItem(item: ResultData) {
    chrome.storage.sync.get("history", function (result) {
      let temp_history = result.history;
      temp_history = temp_history.filter(
        (cur_item: ResultData) => cur_item.url !== item.url
      );
      chrome.storage.sync.set({ history: temp_history });
    });
  }
  const [loading, setLoading] = React.useState<boolean>(true);

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
  } else if (res.length == 0) {
    return (
      <div className="history-container">
        <h1 className="h1history">History</h1>
        <h1>No history found</h1>
        <button className="back-to-home" onClick={backToHome}>
          Back To Home
        </button>
      </div>
    );
  }
  return (
    <div className="history-container">
      <div className="history-container">
        <h3 className="h1history">History</h3>
        <div className="link-list">
          {res.reverse().map((link, index) => (
            <div className="history-unit">
              <button
                key={index}
                onClick={() => handleHistoryToResult(link)}
                className={`link-item`}
              >
                <Link className="link-icon" />
                <div className="link-content">
                  <div className="link-url">{link.url}</div>
                </div>
                <div className="time-confidence">{link.time}</div>
              </button>
              <button id="delete-button" onClick={() => handleClearItem(link)}>
                <Trash />
              </button>
            </div>
          ))}
        </div>
        <button className="back-to-home" onClick={backToHome}>
          Back To Home
        </button>
      </div>
      <button id="clear-history" onClick={handleClearHistory}>
        Clear History
      </button>
    </div>
  );
};

export default History;
