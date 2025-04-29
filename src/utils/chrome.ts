export const getCurrentTabUrl = async (): Promise<string> => {
  if (typeof chrome === "undefined" || !chrome.tabs) {
    return "https://example.com"; // Default URL for development
  }

  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs[0]?.url || "";
  } catch (error) {
    console.error("Error getting current tab:", error);
    return "";
  }
};
