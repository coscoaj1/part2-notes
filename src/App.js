import React from 'react';
import Note from './components/Note';
import { useState, useEffect } from 'react';
import axios from 'axios';
import noteService from './services/notes';
import './app.css';
import { Notification } from './components/Notification';
import Footer from './components/Footer';

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const [showAll, setShowAll] = useState(false);
	const [errorMessage, setErrorMessage] = useState('some error happened');

	useEffect(() => {
		noteService //
			.getAll()
			.then((initialNotes) => {
				setNotes(initialNotes);
			});
	}, []);

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService //
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
			})
			.catch((error) => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			});
	};

	const addNote = (event) => {
		event.preventDefault();
		const noteObject = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() < 0.5,
		};

		noteService //
			.create(noteObject)
			.then((returnedNote) => {
				setNotes(notes.concat(returnedNote));
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

	return (
		<div className="container">
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
			<Footer />
		</div>
	);
};

export default App;
