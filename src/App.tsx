import React, { useState } from 'react';
// import cp from 'child_process';
// import { ipcRenderer } from 'electron';
import logo from './logo.svg';
import './App.css';
import { Grid, Row } from './common/Components';
const cp = require('child_process');
const { ipcRenderer } = window.require('electron')


const App: React.FC = () => {
  const [jsonInputState, setJsonInputState] = useState('{}');
  const handleButtonClick = () => {
    ipcRenderer.send('asynchronous-message', `${jsonInputState}`)
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      setJsonInputState(arg);
    });
  };
  return (
    <React.Fragment>
      <Row>
        <div>
          <textarea
            className='json-input'
            value={jsonInputState}
            onChange={(val) => setJsonInputState(val.target.value)}
          />
        </div>
        <div>
          <button onClick={handleButtonClick}>
            Format
          </button>
        </div>
      </Row>
    </React.Fragment>
  );
}

export default App;
