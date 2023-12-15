import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type DateProps = {
	value?: any;
	setValue: (value: any) => any;
	label: string;
	variant?: string;
	size?: string;
	name: string;
}

export default function DatePickerInput({ value, setValue, name, label, variant, size }: DateProps) {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePicker
				value={value}
				onChange={(newValue) => setValue(newValue)}
				label={label}
				name={name}
			/>
		</LocalizationProvider>
	);
}