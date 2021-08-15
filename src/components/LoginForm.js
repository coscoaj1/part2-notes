const LoginForm = ({
	username,
	password,
	handleLogin,
	handleNameChange,
	handlePasswordChange,
}) => (
	<form onSubmit={handleLogin}>
		<div>
			username:
			<input
				type="text"
				value={username}
				onChange={handleNameChange}
				name="Username"
			/>
		</div>
		<div>
			password
			<input
				type="password"
				value={password}
				name="Password"
				onChange={handlePasswordChange}
			/>
		</div>
		<button type="submit">login</button>
	</form>
);

export default LoginForm;
