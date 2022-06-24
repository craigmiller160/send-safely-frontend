import { Box, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

interface LoginForm {
	readonly username: string;
	readonly password: string;
}

export const Login = () => {
	const { handleSubmit, control } = useForm<LoginForm>();
	const onSubmit = (values: LoginForm) => console.log('Values', values);
	return (
		<Box sx={{ flexGrow: 1 }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="username"
					control={control}
					render={({ field }) => (
						<TextField label="Username" {...field} />
					)}
				/>
				<TextField label="Password" name="username" />
			</form>
		</Box>
	);
};
