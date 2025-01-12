import React from 'react';
import Note from './components/Note';
import { useState, useEffect, useRef } from 'react';
import noteService from './services/notes';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import './app.css';
import Notification from './components/Notification';
import Footer from './components/Footer';
import Togglable from './components/Togglable';
import NoteForm from './components/NoteForm';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header';

const useStyles = makeStyles((theme) => ({
	main: {
		marginBottom: '25px',
	},
	root: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
}));
const App = () => {
	const [notes, setNotes] = useState([]);
	const [showAll, setShowAll] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	const classes = useStyles();
	const noteFormRef = useRef();

	useEffect(() => {
		noteService //
			.getAll()
			.then((initialNotes) => {
				setNotes(initialNotes);
			});
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			noteService.setToken(user.token);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();
		console.log('logging in with', username, password);

		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));

			noteService.setToken(user.token);
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
	const addNote = (noteObject) => {
		noteFormRef.current.toggleVisibility();
		noteService //
			.create(noteObject)
			.then((returnedNote) => {
				setNotes(notes.concat(returnedNote));
			});
	};

	const loginForm = () => (
		<Togglable buttonLabel="log in">
			<LoginForm
				username={username}
				password={password}
				handleUsernameChange={({ target }) => setUsername(target.value)}
				handlePasswordChange={({ target }) => setPassword(target.value)}
				handleLogin={handleLogin}
			/>
		</Togglable>
	);

	const noteForm = () => (
		<Togglable buttonLabel="new note" ref={noteFormRef}>
			<NoteForm createNote={addNote} />
		</Togglable>
	);

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	const handleLogout = () => {
		window.window.localStorage.removeItem('loggedNoteappUser');
		setUser(null);
	};

	return (
		<div className="container">
			<Header user={user} handleLogout={handleLogout} />
			<div className={classes.main}>
				<Notification message={errorMessage} />
				{user === null ? (
					loginForm()
				) : (
					<div>
						{/* <p>{user.name} logged in</p>
						<button onClick={handleLogout}>logout</button> */}
						{noteForm()}
					</div>
				)}
				<div>
					<button onClick={() => setShowAll(!showAll)}>
						show {showAll ? 'important' : 'all'}
					</button>
				</div>
			</div>

			<div className={classes.root}>
				<Grid container spacing={6}>
					{notesToShow.map((note, i) => (
						<Note
							key={i}
							note={note}
							toggleImportance={() => toggleImportanceOf(note.id)}
						/>
					))}
				</Grid>
			</div>

			<Footer />
		</div>
	);
};

export default App;
