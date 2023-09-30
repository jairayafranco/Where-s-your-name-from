import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);

  const regionName = new Intl.DisplayNames(['EN'], { type: 'region' });

  const searchName = () => {
    if (!name) return alert('Name cannot be empty');
    fetch(`https://api.nationalize.io/?name=${name}`)
      .then((res) => res.json())
      .then((res) => setResults(res.country));
  };

  return (
    <div className="App">
      <div style={{ borderRadius: '35px' }}>
        <img
          src="https://infotra.files.wordpress.com/2019/02/how-english-became-the-global-language.jpg"
          className="logo"
          alt="Global Languages Logo"
        />
        <h2>Where's your name from?</h2>
      </div>
      <div className="card">
        <input
          name="name"
          label="name"
          placeholder="Write your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={searchName}>Search</button>
        <ol>
          {results.map(({ country_id, probability }, index) => (
            <li key={index}>
              Country: {regionName.of(country_id)} - Probability:{' '}
              {probability.toFixed(3)}%
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
