chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("history", (result) => {
    if (!result.history) {
      chrome.storage.sync.set({ history: [], urls: [] }, () => {
        console.log("History storage initialized.", result.history, result);
      });
    }
  });
});
