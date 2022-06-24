import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import './Login.scss';
import { RequiredFormTextField } from '../ui/RequiredFormTextField';
import { useQuery } from 'react-query';
import * as SendSafelyService from '../../services/SendSafelyService';

interface LoginForm {
	readonly username: string;
	readonly password: string;
}

export const Login = () => {
	const { handleSubmit, control } = useForm<LoginForm>();
	const { refetch, error, isLoading } = useQuery(
		['authenticate', { username: '', password: '' }],
		SendSafelyService.authenticate,
		{
			enabled: false
		}
	);
	const onSubmit = (values: LoginForm) => console.log('Values', values);
	return (
		<Box className="Login" sx={{ flexGrow: 1 }}>
			<>
				{isLoading && <CircularProgress />}
				{!isLoading && error && (
					<Typography style={{ color: 'red' }} variant="h4">
						Error logging in
					</Typography>
				)}
				{!isLoading && (
					<>
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
					</>
				)}
			</>
		</Box>
	);
};
