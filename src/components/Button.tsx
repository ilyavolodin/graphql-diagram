import React from 'react';

export enum ButtonType {
    Primary,
    Secondary,
    Tetriary,
    Simple,
    Gradient
}

export enum ButtonSize {
    Small,
    Medium,
    Large
}

export enum ButtonColor {
    Purple,
    Gray,
    Blue,
    Green,
    Red,
    Yellow
}

type ButtonProps = {
    type?: ButtonType,
    color?: ButtonColor,
    size?: ButtonSize,
    disabled?: boolean,
    children: React.ReactNode
} & React.HTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ type = ButtonType.Primary, color = ButtonColor.Gray, size = ButtonSize.Medium, disabled = false, children, ...props }) => {
    const commonStyles = 'inline-block font-bold text-center uppercase align-middle transition-all rounded-lg cursor-pointer ease-soft-in leading-pro text-xs tracking-tight-soft bg-150 bg-x-25 hover:scale-102';
    const buttonSizeMap = {
        [ButtonSize.Small]: 'py-1.5 px-4',
        [ButtonSize.Medium]: 'py-3 px-6',
        [ButtonSize.Large]: 'py-4 px-7'
    };
    const buttonTypeMap: { [key in ButtonType]: string } = {
        [ButtonType.Primary]: 'bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-md active:opacity-85 hover:shadow-soft-xs text-white',
        [ButtonType.Secondary]: 'bg-transparent border border-fuchsia-500 shadow-soft-md active:opacity-85 hover:shadow-soft-xs text-fuchsia-500 mr-3',
        [ButtonType.Tetriary]: 'bg-fuchsia-500/0 hover:bg-fuchsia-500/25 active:bg-fuchsia/45 text-fuchsia-500 mr-3',
        [ButtonType.Simple]: 'active:opacity-85 hover:shadow-soft-xs shadow-soft-md text-white',
        [ButtonType.Gradient]: 'active:opacity-85 hover:shadow-soft-xs shadow-soft-md text-white bg-gradient-to-tl'
    };
    const buttonColorMap: { [key in ButtonColor]: { [key in Extract<ButtonType, ButtonType.Simple | ButtonType.Gradient>]: string } } = {
        [ButtonColor.Purple]: { [ButtonType.Simple]: 'bg-fuchsia-500', [ButtonType.Gradient]: 'from-purple-700 to-pink-500' },
        [ButtonColor.Gray]: { [ButtonType.Simple]: 'bg-slate-500', [ButtonType.Gradient]: 'from-slate-600 to-slate-300' },
        [ButtonColor.Blue]: { [ButtonType.Simple]: 'bg-cyan-500', [ButtonType.Gradient]: 'from-blue-600 to-cyan-400' },
        [ButtonColor.Green]: { [ButtonType.Simple]: 'bg-lime-500', [ButtonType.Gradient]: 'from-green-600 to-lime-400' },
        [ButtonColor.Red]: { [ButtonType.Simple]: 'bg-red-500', [ButtonType.Gradient]: 'from-red-600 to-rose-400' },
        [ButtonColor.Yellow]: { [ButtonType.Simple]: 'bg-orange-500', [ButtonType.Gradient]: 'from-red-500 to-yellow-400' }
    };
    const buttonDisabled = disabled ? 'opacity-50 cursor-not-allowed' : '';

    const buttonStyles = type === ButtonType.Simple || type === ButtonType.Gradient
        ? `${commonStyles} ${buttonSizeMap[size]} ${buttonTypeMap[type]} ${buttonColorMap[color][type]} ${buttonDisabled}`
        : `${commonStyles} ${buttonSizeMap[size]} ${buttonTypeMap[type]} ${buttonDisabled}`;

    return (
        <button type="button" className={buttonStyles} {...props}>
            {children}
        </button>
    );
};
