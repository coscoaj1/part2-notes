import React from 'react';
import Button from '@material-ui/core/Button';
import '../app.css';

const Note = ({ note, toggleImportance }) => {
	const label = note.important ? 'make not important' : 'make important';

	return (
		<li className="note">
			<span>{note.content}</span>
			<span className="makeImportant">
				<Button
					size="small"
					variant="contained"
					color="primary"
					onClick={toggleImportance}
				>
					{label}
				</Button>
			</span>
		</li>
	);
};

export default Note;
