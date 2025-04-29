import React, { useState, useEffect } from "react";
import { Navigation } from "./Components/Navigation";
import { UrlInput } from "./Components/UrlInput";
import { Scanner } from "./Components/Scanner";
import { Page } from "./types";
import "./styles/App.css";
import About from "./About";
import Result from "./Result";
import History from "./History";
import ScannedPage from "./LegalLinkSelector";
import { scrapeLegalLinks } from "./utils/linkscraper";
import type { ScrapedLink } from "./types";
import { ResultData } from "./Result";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [url, setUrl] = useState<string>("");
  const [urls, setUrls] = useState<ScrapedLink[]>([]);
  const [fromhistory, setFromHistory] = useState<boolean>(false);
  const [historydata, setHistoryData] = useState<ResultData>({
    url: "",
    summary: [],
    alerts: [],
    time: "",
  });

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleResult = (url: string) => {
    setUrl(url);
    setCurrentPage("result");
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      setCurrentPage("result");
    } else {
      alert("Please enter a URL");
    }
  };

  const handleScan = async () => {
    const links = await scrapeLegalLinks();
    setUrls(links);
    setCurrentPage("select");
  };

  const handleHistoryToResult = (data: ResultData) => {
    setHistoryData(data);
    console.log(data, "handling history to result");
    setFromHistory(true);
    setCurrentPage("result");
  };

  useEffect(() => {
    if (currentPage === "home") {
      setUrl("");
    }
  }, [currentPage]);

  return (
    <>
      <Navigation
        onHomeClick={() => setCurrentPage("home")}
        onAboutClick={() => setCurrentPage("about")}
        onHistoryClick={() => setCurrentPage("history")}
      />

      <main className="main-content">
        {currentPage === "home" && (
          <>
            <UrlInput
              url={url}
              onUrlChange={handleUrlChange}
              onSubmit={handleUrlSubmit}
            />
            <Scanner onScan={handleScan} />
          </>
        )}

        {currentPage === "about" && (
          <About backToHome={() => setCurrentPage("home")} />
        )}
        {currentPage === "result" && (
          <Result
            url={url}
            backToHome={() => setCurrentPage("home")}
            fromHistory={fromhistory}
            fromHistoryData={historydata}
            setFromHistory={() => setFromHistory(false)}
          />
        )}
        {currentPage === "history" && (
          <History
            backToHome={() => setCurrentPage("home")}
            handleHistoryToResult={handleHistoryToResult}
          />
        )}
        {currentPage === "select" && (
          <ScannedPage
            backToHome={() => setCurrentPage("home")}
            links={urls}
            selectedUrl={url}
            handleResult={handleResult}
          />
        )}
      </main>
    </>
  );
}

export default App;
