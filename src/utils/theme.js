import { createTheme } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

const theme = createTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#242f3d',
		},
		secondary: {
			main: '#688EFF',
		},
	},
});

export default theme;
