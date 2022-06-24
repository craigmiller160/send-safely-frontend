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
					rules={{ required: true }}
					render={({ field, formState: { errors } }) => (
						<>
							<TextField label="Username" {...field} />
							{errors.username?.type === 'required' && (
								<span className="error">
									Username is required
								</span>
							)}
						</>
					)}
				/>
				<Controller
					name="password"
					control={control}
					rules={{ required: true }}
					render={({ field, formState: { errors } }) => (
						<>
							<TextField label="Password" {...field} />
							{errors.password?.type === 'required' && (
								<span className="error">
									Password is required
								</span>
							)}
						</>
					)}
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
