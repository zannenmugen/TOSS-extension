import React from "react";
import { LoadingSpinner } from "./Components/LoadingSpinner";

type Props = {
  url?: string;
  backToHome: () => void;
  fromHistory: boolean;
  fromHistoryData: ResultData;
  setFromHistory: (value: boolean) => void;
};

export interface ResultData {
  url: string;
  summary: string[];
  alerts: string[];
  time: string;
}

const Result = ({
  url,
  backToHome,
  fromHistory,
  fromHistoryData,
  setFromHistory,
}: Props) => {
  const [summary, setSummary] = React.useState<string[]>([]);
  const [alerts, setAlerts] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const addToHistory = (res: ResultData) => {
    chrome.storage.sync.get("history", function (result) {
      let temp_history = result.history || [];
      let exists = false;

      temp_history = temp_history.filter((item: ResultData) => {
        if (item.url === res.url) {
          exists = true;
          return false;
        }
        return true;
      });

      temp_history.push(res);
      chrome.storage.sync.set({ history: temp_history });
    });
  };
  React.useEffect(() => {
    if (fromHistory) {
      setSummary(fromHistoryData.summary || []);
      setAlerts(fromHistoryData.alerts || []);
      url = fromHistoryData.url;
      const result: ResultData = {
        url: url,
        summary: fromHistoryData.summary,
        alerts: fromHistoryData.alerts,
        time: new Date().toLocaleString(),
      };
      addToHistory(result);
      setFromHistory(false);
      fromHistory = false;
      setTimeout(() => setLoading(false), 500);
      return;
    }
    const fetchData = async () => {
      setLoading(true); // Set loading to true when URL changes
      if (!url) return;
      try {
        const tld = new URL(url);

        const response = await fetch(
          `${process.env.BACKEND_URL}/api/scan?query=${tld}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok && !fromHistory) {
          const data = await response.json();
          data.summary = data.summary.filter((item: string) => /\S/.test(item));
          data.alerts = data.alerts.filter((item: string) => /\S/.test(item));
          setSummary(data.summary || []);
          setAlerts(data.alerts || []);
          const result: ResultData = {
            url: url,
            summary: data.summary,
            alerts: data.alerts,
            time: new Date().toLocaleString(),
          };
          addToHistory(result);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchData();
  }, [url]);

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner size="lg" variant="primary" />
      </div>
    );
  } else if (fromHistory) {
    return (
      <div className="result-container">
        <h3>Scan Results</h3>
        <p id="url-result">{url}</p>
        <p>Summary</p>
        <div className="summary-container">
          <ul>
            {summary.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <p>Alerts</p>
        <div className="alert-container">
          <ul>
            {alerts.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <button onClick={backToHome} className="back-to-home">
          Back to Home
        </button>
      </div>
    );
  }
  return (
    <div className="result-container">
      <h3>Scan Results</h3>
      <p id="url-result">{url}</p>
      <p>Summary</p>
      <div className="summary-container">
        <ul>
          {summary.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <p>Alerts</p>
      <div className="alert-container">
        <ul>
          {alerts.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <button onClick={backToHome} className="back-to-home">
        Back to Home
      </button>
    </div>
  );
};

export default Result;
