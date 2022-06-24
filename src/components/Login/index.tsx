import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import './Login.scss';
import { RequiredFormTextField } from '../ui/RequiredFormTextField';

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
				<RequiredFormTextField
					name="username"
					label="Username"
					control={control}
				/>
				<RequiredFormTextField
					name="password"
					label="Password"
					control={control}
				/>
				<Button
					className="LoginButton"
					variant="contained"
					type="submit"
				>
					Login
				</Button>
			</form>
		</Box>
	);
};
