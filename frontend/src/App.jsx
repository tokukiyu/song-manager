// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import store from './app/store';
import SongList from './components/SongList';
import './App.css'

const theme = {
  // Define your theme here
};

const AppWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  // Add more global styles as needed
`;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <Normalize />
          <AppWrapper>
            <h1>Song List App</h1>
            <SongList />
          </AppWrapper>
        </StyledThemeProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
