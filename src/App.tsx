import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

let add;

function App() {
  let [App, setzkApp] = useState();
  let [isLoading, setLoading] = useState(false);
  let [isDeployed, setDeployed] = useState(false);
  let [num, setNum] = useState('0');

  async function deploy() {
    if (isLoading) return;
    setLoading(true);
    add = await import('../build/src/Add');
    let App = await add.deploy();
    setLoading(false);
    setDeployed(true);
    setzkApp(App);
    let state = await App.getzkAppState();
    setNum(state.num.toString());
  }

  async function handleClick() {
    await App.update();
    let state = await App.getzkAppState();
    setNum(state.num.toString());
  }

  return (
    <Container fixed>
      <Stack direction="column" spacing={2}>
        <Chip
          label={num}
          variant="outlined"
          onClick={handleClick}
          disabled={!isDeployed}
        />
        <Button variant="contained" onClick={deploy} disabled={isDeployed}>
          Deploy
        </Button>
      </Stack>
    </Container>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
