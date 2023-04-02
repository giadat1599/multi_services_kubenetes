import React from 'react';
import axios from 'axios';

export default function Fibonacci() {
  const [seenIndexes, setSeenIndexes] = React.useState([]);
  const [values, setValues] = React.useState([]);
  const [index, setIndex] = React.useState('');

  React.useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = async () => {
    const { data } = await axios.get('/api/values/current');
    setValues(data);
  };

  const fetchIndexes = async () => {
    const { data } = await axios.get('/api/values/all');
    setSeenIndexes(data);
  };

  const onSubmitIndex = async (e) => {
    e.preventDefault();
    await axios.post('/api/values', {
      index,
    });
    setIndex('');
  };

  return (
    <div>
      <form onSubmit={onSubmitIndex}>
        <label>Enter your index</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen: </h3>
      {seenIndexes.map((seenIndex) => seenIndex.number).join(', ')}
      <h3>Calculated Values</h3>
      {Object.keys(values).map((key) => (
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      ))}
    </div>
  );
}
