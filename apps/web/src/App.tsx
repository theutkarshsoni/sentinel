import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [health, setHealth] = useState<any>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios.get('http://localhost:3000/health')
      .then(res => setHealth(res.data))
      .catch(err => setError(String(err)));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4">Sentinel — Hello, World!!</h1>
      {error && <div className="text-red-600">Error: {error}</div>}
      {health ? (
        <pre className="bg-white p-4 rounded-lg shadow">{JSON.stringify(health, null, 2)}</pre>
      ) : (
        <div>Loading…</div>
      )}
    </div>
  );
}
