import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import JSONTree from 'react-json-tree'
import { Grid, Row } from './common/Components';
import { registerIPCChannel } from './ipc/IpcService';
import { JqProcessChannel } from './ipc/JqProcessChannel';
const cp = require('child_process');
const { ipcRenderer } = window.require('electron')


function getParsedJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
}

function updateJSONData (jsonData, jsonQueryPath) {
}
function filterJSON(json, jsonQueryPath = '', searchKeyText = '') {

  Object.keys(json).forEach(key => {

  });
}
const App: React.FC = () => {
  const [jsonInputState, setJsonInputState] = useState('{}');
  const [filteredJSON, setFilteredJSON] = useState('{}');
  const handleOnFilterChange = useCallback(event => {
    
  }, []);
  const [filterValue, setFilterValue] = useState('');
  const handleButtonClick = () => {
    registerIPCChannel(
      new JqProcessChannel(),
      jsonInputState,
      (event, response) => {
        setJsonInputState(response);
      },
    );
  };
  const shouldExpandNode = useCallback((keyNames, data, level) => {
    console.log(keyNames);
    console.log(data);
    console.log(level);
    if (filterValue === '' || (keyNames.some(keyName => keyName.includes('root')) && level === 0)
        || keyNames.some(keyName => keyName.includes(filterValue))) return true;
    return false;
  }, [filterValue]);
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
        <div>
          <input onChange={handleOnFilterChange} value={filterValue} />
        </div>
        <div>
          <JSONTree data={getParsedJSON(filteredJSON)} />
        </div>
      </Row>
    </React.Fragment>
  );
}

export default App;
