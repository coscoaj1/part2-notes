import React from 'react';
import Button from '@material-ui/core/Button';
import '../app.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}));

const Note = ({ note, toggleImportance }) => {
	const classes = useStyles();
	const label = note.important ? 'make not important' : 'make important';

	return (
		<Grid item xs={6} sm={4}>
			<Paper className={classes.paper}>{note.content}</Paper>
			<span className="makeImportant">
				<Button size="small" color="secondary" onClick={toggleImportance}>
					{label}
				</Button>
			</span>
		</Grid>
	);
};

export default Note;
