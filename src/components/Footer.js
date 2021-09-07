const Footer = () => {
	const footerStyle = {
		color: 'green',
		fontStyle: 'italic',
		fontSize: 16,
		bottom: 0,
		position: 'absolute',
		textAlign: 'center',
		width: '100%',
	};
	return (
		<div style={footerStyle}>
			<br />
			<em>
				<p>
					Note app, Department of Computer Science, University of Helsinki 2021
				</p>
			</em>
		</div>
	);
};

export default Footer;
