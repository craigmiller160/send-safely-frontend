import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import './Login.scss';

interface LoginForm {
	readonly username: string;
	readonly password: string;
}

export const Login = () => {
	const { handleSubmit, control } = useForm<LoginForm>();
	const onSubmit = (values: LoginForm) => console.log('Values', values);
	return (
		<Box className="Login" sx={{ flexGrow: 1 }}>
			<Typography variant="h6">
				Login With SendSafely Credentials
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="username"
					control={control}
					render={({ field }) => (
						<TextField label="Username" {...field} />
					)}
				/>
				<TextField label="Password" name="username" />
				<Button className="LoginButton" variant="contained">
					Login
				</Button>
			</form>
		</Box>
	);
};
