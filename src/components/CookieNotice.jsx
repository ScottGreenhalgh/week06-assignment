import { useEffect, useState } from "react";

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (
      document.cookie.includes("cookiesAccepted=true") ||
      document.cookie.includes("cookiesAccepted=false")
    ) {
      setIsVisible(false);
    }
  }, []);

  function cookieAccepted() {
    document.cookie = "cookiesAccepted=true";
    console.log("accept cookies button pressed");
    setIsVisible(false);
  }

  function cookieDeclined() {
    document.cookie = "cookiesAccepted=false";
    console.log("decline cookies button pressed");
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <div id="cookie-notice" className="cookie-notice">
      <p>Do you accept cookies?</p>
      <button
        id="button-accept"
        className="cookie-button"
        aria-label="accept tracking cookies button"
        onClick={cookieDeclined}
      >
        Yes
      </button>
      <button
        id="button-decline"
        className="cookie-button"
        aria-label="decline tracking cookies button"
        onClick={cookieAccepted}
      >
        No
      </button>
    </div>
  );
}
