const LoginForm = ({
	username,
	password,
	handleLogin,
	handleUsernameChange,
	handlePasswordChange,
}) => {
	return (
		<div>
			<div>
				<h2>Login</h2>
			</div>
			<div>
				<form onSubmit={handleLogin}>
					<div>
						username:
						<input value={username} onChange={handleUsernameChange} />
					</div>
					<div>
						password
						<input value={password} onChange={handlePasswordChange} />
					</div>
					<button type="submit">login</button>
				</form>
			</div>
		</div>
	);
};
export default LoginForm;
