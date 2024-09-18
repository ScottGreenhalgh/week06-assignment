export default async function fetchUpgrades() {
  try {
    const response = await fetch(
      `https://cookie-upgrade-api.vercel.app/api/upgrades`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    const fallbackResponse = (await fetch("../assets/upgrades.json")).json();
    const fallbackData = await fallbackResponse.json();
    console.log(fallbackData);
    return fallbackData;
  }
}
