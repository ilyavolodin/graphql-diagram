import React, { InputHTMLAttributes } from 'react';

export enum InputSize {
    Small,
    Medium,
    Large
}

interface InputProps  extends InputHTMLAttributes<HTMLInputElement> {
    size?: InputSize,
    icon?: string,
}

export const Input: React.FC<InputProps> = ({ size = InputSize.Medium, icon, ...props }) => {
    const commonStyles = 'focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding text-gray-700 placeholder:text-gray-500 transition-all focus:border-fuchsia-300 focus:outline-none min-w-full';
    const inputSizeMap = {
        [InputSize.Small]: 'px-3 py-1',
        [InputSize.Medium]: 'px-3 py-2',
        [InputSize.Large]: 'px-3 py-3'
    };
    const iconInputStyles = `${commonStyles} ${inputSizeMap[size]} relative -ml-px min-w-0 flex-auto focus:transition-shadow pl-9 w-1/100`;
    const spanStyles = `text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent text-center font-normal text-slate-500 transition-all ${inputSizeMap[size]}}`;
    const iconStyles = `fas fa-${icon}`;

    const inputStyles = icon ? iconInputStyles : `${commonStyles} ${inputSizeMap[size]}`;

    return (
        icon ?
            <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                <span className={spanStyles}>
                    <i className={iconStyles} aria-hidden="true"></i>
                </span>
                <input className={inputStyles} {...props} />
            </div>
            :
            <input className={inputStyles} {...props} />
    );
};