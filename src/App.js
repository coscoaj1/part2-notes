import React from 'react';
import Note from './components/Note';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const [showAll, setShowAll] = useState(false);

	const addNote = (event) => {
		event.preventDefault();
		const noteObject = {
			content: newNote,
			date: new Date(),
			important: Math.random() < 0.5,
		};

		axios.post('http://localhost:3001/notes', noteObject).then((response) => {
			console.log(response.data);
			setNotes(notes.concat(response.data));
			setNewNote('');
		});
	};

	const hook = () => {
		console.log('effect');
		axios.get('http://localhost:3001/notes').then((response) => {
			console.log('promise fulfilled');
			setNotes(response.data);
		});
	};

	useEffect(hook, []);
	console.log('render', notes.length, 'notes');

	const handleNoteChange = (event) => {
		setNewNote(event.target.value);
	};

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	const toggleImportanceOf = (id) => {
		const url = `http://localhost:3001/notes/${id}`;
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		axios.put(url, changedNote).then((response) => {
			setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
		});
	};
	return (
		<div>
			<h1>Notes</h1>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{notesToShow.map((note, i) => (
					<Note
						key={i}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				))}
				<form onSubmit={addNote}>
					<input value={newNote} onChange={handleNoteChange} />
					<button type="submit">save</button>
				</form>
			</ul>
		</div>
	);
};

export default App;
