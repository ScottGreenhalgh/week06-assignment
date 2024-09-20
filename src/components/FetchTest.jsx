import { useEffect, useState } from "react";
import fetchUpgrades from "../utils/api";

export default function FetchTest() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function testFetch() {
      try {
        const result = await fetchUpgrades();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    testFetch();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Fetched Upgrades:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
