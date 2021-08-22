import PropTypes from 'prop-types';

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
						<input
							id="username"
							value={username}
							onChange={handleUsernameChange}
						/>
					</div>
					<div>
						password
						<input
							id="password"
							value={password}
							onChange={handlePasswordChange}
						/>
					</div>
					<button id="login-button" type="submit">
						login
					</button>
				</form>
			</div>
		</div>
	);
};

LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
};
export default LoginForm;
