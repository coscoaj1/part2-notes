import React from 'react';
import Note from './components/Note';
import { useState, useEffect } from 'react';
import noteService from './services/notes';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import './app.css';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const [showAll, setShowAll] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		noteService //
			.getAll()
			.then((initialNotes) => {
				setNotes(initialNotes);
			});
	}, []);

	const noteForm = () => (
		<form onSubmit={addNote}>
			<input value={newNote} onChange={handleNoteChange} />
			<button type="submit">save</button>
		</form>
	);

	const handleLogin = async (event) => {
		event.preventDefault();
		console.log('logging in with', username, password);

		try {
			const user = await loginService.login({
				username,
				password,
			});
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setErrorMessage('Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
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

	const handleNoteChange = (event) => {
		setNewNote(event.target.value);
	};

	const handleNameChange = (event) => {
		setUsername(event.target.value);
		console.log(event.target.value);
	};
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	return (
		<div className="container">
			<h1>Notes</h1>

			<Notification message={errorMessage} />

			{user === null ? (
				<LoginForm
					username={username}
					password={password}
					handleNameChange={handleNameChange}
					handlePasswordChange={handlePasswordChange}
					handleLogin={handleLogin}
				/>
			) : (
				<div>
					<p>{user.name} logged-in</p>
					{noteForm()}
				</div>
			)}

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
