import React from 'react';
import Note from './components/Note';
import { useState, useEffect } from 'react';
import noteService from './services/notes';
import './app.css';
import { Notification } from './components/Notification';
import Footer from './components/Footer';

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const [showAll, setShowAll] = useState(false);
	const [errorMessage, setErrorMessage] = useState('some error happened');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		noteService //
			.getAll()
			.then((initialNotes) => {
				setNotes(initialNotes);
			});
	}, []);

	const handleLogin = (event) => {
		event.preventDefault();
		console.log('logging in with', username, password);
	};

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

	// const hook = () => {
	// 	console.log('effect');
	// 	axios.get('http://localhost:3001/notes').then((response) => {
	// 		console.log('promise fulfilled');
	// 		setNotes(response.data);
	// 	});
	// };

	// useEffect(hook, []);
	// console.log('render', notes.length, 'notes');

	const handleNoteChange = (event) => {
		setNewNote(event.target.value);
	};

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	return (
		<div className="container">
			<h1>Notes</h1>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
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
