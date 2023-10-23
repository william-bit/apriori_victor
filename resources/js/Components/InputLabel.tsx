import { LabelHTMLAttributes } from 'react';

export default function InputLabel({ value, className = '', children, ...props }: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <label {...props} className={`block text-sm text-gray-700 font-bold mt-2 uppercase opacity-70` + className}>
            {value ? value : children}
        </label>
    );
}
