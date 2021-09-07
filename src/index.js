import ReactDOM from 'react-dom';
import App from './App.js';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './utils/theme';

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>,
	document.getElementById('root')
);
