import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [count, setCount] = useState(3);

  return (
    <div className="content">
      <h1 className="text-red-500">Rsbuild with React 666</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <p>{count}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => setCount(2000000)}
      >
        点击我直接卡死
      </button>
      <div>
        <p>当前计数: {count}</p>
        {new Array(count).fill(0).map((item, index) => (
          <p key={index}>{index}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
