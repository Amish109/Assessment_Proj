
const LoginButton = ({onClick,type}) => {
	if(type=='logout'){
		return (
			<button
			onClick={onClick}
			className="px-4 py-2 bg-red-500 text-white rounded"
		>
			Logout
		</button>
		)
	}
	return (
		<button
			onClick={onClick}
			className="px-4 py-2 bg-blue-500 text-white rounded"
		>
			Sign in with Google
		</button>
	)
}

export default LoginButton