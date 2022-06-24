import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import './Login.scss';
import { RequiredFormTextField } from '../ui/RequiredFormTextField';
import { useMutation } from 'react-query';
import * as SendSafelyService from '../../services/SendSafelyService';
import { SuccessAuthResponse } from '../../types/sendSafely/BaseAuthResponse';
import { AuthenticateParams } from '../../services/SendSafelyService';
import { useContext } from 'react';
import { AuthenticationContext } from '../Authentication';

interface LoginForm {
	readonly username: string;
	readonly password: string;
}

export const Login = () => {
	const authentication = useContext(AuthenticationContext);
	const { handleSubmit, control } = useForm<LoginForm>();
	const { isLoading, error, mutate } = useMutation<
		SuccessAuthResponse,
		Error,
		AuthenticateParams
	>(SendSafelyService.authenticate);
	const onSubmit = (values: LoginForm) =>
		mutate(values, {
			onSuccess: (data) =>
				authentication.updateAuthentication(
					data.email,
					data.apiKey,
					data.apiSecret
				),
			onError: (error) => console.error(error)
		});
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
