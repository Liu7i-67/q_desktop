import { useState } from 'react';
import './App.css';

const App = () => {
  const [state, setState] = useState<number>(0);
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <div>
        {state}
        <button
          onClick={() => {
            setState(state + 1);
          }}
        >
          +1
        </button>
        <button
          onClick={() => {
            localStorage.setItem('test', `${state}`);
            alert(`${state}已保存到本地`);
          }}
        >
          保存到本地
        </button>
        <button
          onClick={() => {
            const info = localStorage.getItem('test');
            if (!info) {
              alert('本地没有数据');
            } else {
              alert(`已读取到本地数据${info}`);
            }
          }}
        >
          从本地读取
        </button>
      </div>
    </div>
  );
};

export default App;
