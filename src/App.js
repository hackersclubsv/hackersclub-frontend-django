import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const fetchData = () => {
    fetch('http://localhost:4000')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

  return (
    <div className='App'>
      <h1> Welcome to Hackers Club Silicon Valley! </h1>{' '}
      <button onClick={fetchData}> Click to Get Data </button>{' '}
      <div>
        {' '}
        {data.map((singleData, index) => (
          <ul key={index}>
            <li> Title: {singleData.title} </li>{' '}
            <li> User: {singleData.user} </li>{' '}
            <li> Content: {singleData.content} </li>{' '}
          </ul>
        ))}{' '}
      </div>{' '}
    </div>
  );
}

export default App;
