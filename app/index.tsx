import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { App } from './pages/main';

import SerialPortContext from "./containers/SerialPort/SerialPort";

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', async () => {
  render(
    <AppContainer>
      <SerialPortContext>
        <App></App>
      </SerialPortContext>
    </AppContainer>,
    document.getElementById('root')
  )
});
