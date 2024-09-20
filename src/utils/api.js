// src/utils/api.js
export default async function fetchUpgrades() {
  try {
    const response = await fetch(
      `https://cookie-upgrade-api.vercel.app/api/upgrades`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched upgrades from API:", data);
    return data;
  } catch (error) {
    console.error("Primary API fetch failed:", error);

    try {
      // Adjust the path based on where your 'upgrades.json' is located.
      // If using Create React App or Vite, assets in the 'public' folder can be accessed via '/assets/upgrades.json'
      const fallbackResponse = await fetch("./src/assets/upgrades.json");

      if (!fallbackResponse.ok) {
        throw new Error(
          `Fallback fetch failed with status ${fallbackResponse.status}`
        );
      }

      const fallbackData = await fallbackResponse.json();
      console.log("Fetched upgrades from fallback:", fallbackData);
      return fallbackData;
    } catch (fallbackError) {
      console.error("Failed to fetch fallback data:", fallbackError);
      throw fallbackError; // Rethrow the error after logging
    }
  }
}
