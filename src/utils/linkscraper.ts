/**
 * Link scraping utilities for finding Terms of Service links
 */
import type { ScrapedLink } from "../types";

const TOS_KEYWORDS = [
  "terms of service",
  "terms-of-service",
  "terms-of-use",
  "terms of use",
];

// Calculate confidence score for a link
function calculateConfidence(link: string): number {
  const href = link.toLowerCase();

  const LEGAL_TERMS = [
    "tos",
    "terms",
    "tos",
    "legal",
    "policy",
    "privacy",
    "agreement",
    "disclaimer",
    "service",
  ];

  const LEGAL_PATTERNS = LEGAL_TERMS.map((term) => new RegExp(`${term}`, "i")); // Create RegExp for each term with optional slashes

  const BETTER_PATTERNS = LEGAL_TERMS.map(
    (term) => new RegExp(`\/${term}`, "i")
  )
    .concat(LEGAL_TERMS.map((term) => new RegExp(`${term}\/`, "i")))
    .concat(LEGAL_TERMS.map((term) => new RegExp(`\/${term}\/`, "i")));

  // Check if link text matches any ToS keywords
  const hasKeyword = TOS_KEYWORDS.some((keyword) => href.includes(keyword));
  if (hasKeyword) return 1;

  const matchesPattern = LEGAL_PATTERNS.some((pattern) => pattern.test(href));
  const matchesBetter = BETTER_PATTERNS.some((pattern) => pattern.test(href));

  let score = 0.45;

  if (matchesBetter) score += 0.45;
  else if (matchesPattern) score += 0.15;

  return Math.min(score, 1); // Cap at 1
}

// Main scraping function that runs in the context of the active tab
export async function scrapeLegalLinks(): Promise<ScrapedLink[]> {
  try {
    // Development mode check
    if (typeof chrome === "undefined" || !chrome.tabs) {
      alert("No active tabs found");
      return [];
    }

    // Get active tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab.id) throw new Error("No active tab found");

    // Execute scraping in the context of the active tab
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // This function runs in the context of the web page
        let footerLinks = Array.from(
          document.querySelectorAll('a[href*="terms"], a[href*="tos"]')
        ) as HTMLAnchorElement[];

        // Use a Set to eliminate duplicates based on href
        const uniqueLinks = Array.from(
          new Set(footerLinks.map((link) => link.href))
        ).map((href) => {
          const tempLink = document.createElement("a");
          tempLink.href = href;
          return tempLink;
        });

        // Return unique links (only href needed)
        return uniqueLinks.map((link) => link.href);
      },
    });

    // Process and filter results

    const links: string[] = results[0]?.result ?? [];
    if (links.length === 0) throw new Error("No links found");
    const scrapedLegalLinks: ScrapedLink[] = links
      .map((url) => ({
        url: url,
        confidence: calculateConfidence(url),
      }))
      .filter((link) => link.confidence > 0) // Only keep links with positive confidence
      .sort((a, b) => b.confidence - a.confidence); // Sort by confidence
    return scrapedLegalLinks.slice(0, 10);
  } catch (error) {
    console.error("Error scraping legal links:", error);
    return [];
  }
}
