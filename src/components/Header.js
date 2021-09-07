import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import theme from '../utils/theme';

const useStyles = makeStyles({
	root: {
		position: 'relative',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
});

const Header = ({ user, handleLogout }) => {
	const classes = useStyles();
	return (
		<AppBar className={classes.root}>
			<Toolbar>
				<IconButton
					edge="start"
					className={classes.menuButton}
					color="inherit"
					aria-label="menu"
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h5" className={classes.title} color="secondary">
					Notes App
				</Typography>
				{user ? (
					<div>
						<Typography>{user.name} logged in</Typography>
						<button onClick={handleLogout}>logout</button>
					</div>
				) : null}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
