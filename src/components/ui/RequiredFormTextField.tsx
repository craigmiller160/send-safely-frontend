import { Control, Controller, Path } from 'react-hook-form';
import { TextField } from '@mui/material';
import './FieldStyles.scss';

interface Props<T> {
	readonly name: Path<T>;
	readonly label: string;
	readonly control: Control<T, object>;
}

export const RequiredFormTextField = <T extends object>(props: Props<T>) => (
	<Controller
		name={props.name}
		control={props.control}
		rules={{ required: true }}
		render={({ field, formState: { errors } }) => (
			<>
				<TextField label={props.label} {...field} />
				{errors[props.name]?.type === 'required' && (
					<span className="FieldError">
						{props.label} is required
					</span>
				)}
			</>
		)}
	/>
);
