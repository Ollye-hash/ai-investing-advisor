import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [stocks, setStocks] = useState([]);
  const [goal, setGoal] = useState('');
  const [horizon, setHorizon] = useState('short-term');
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/stocks')
      .then(res => setStocks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleRecommend = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/recommend', { goal, horizon });
      setRecommendations(res.data.recommendations);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">AI Investing Advisor</h1>

      <h2 className="text-xl mb-2">Available Stocks</h2>
      <ul className="mb-6">
        {stocks.map((s, i) => (
          <li key={i}>{s.symbol} - {s.name} @ Ksh {s.price}</li>
        ))}
      </ul>

      <h2 className="text-xl mb-2">Get Recommendations</h2>
      <input
        className="border p-2 mr-2"
        type="text"
        placeholder="Your goal (e.g. buy a car)"
        value={goal}
        onChange={e => setGoal(e.target.value)}
      />
      <select
        className="border p-2 mr-2"
        value={horizon}
        onChange={e => setHorizon(e.target.value)}
      >
        <option value="short-term">Short-term</option>
        <option value="long-term">Long-term</option>
      </select>
      <button onClick={handleRecommend} className="bg-blue-500 text-white px-4 py-2 rounded">
        Recommend
      </button>

      {recommendations.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Recommended Stocks:</h3>
          <ul>
            {recommendations.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;