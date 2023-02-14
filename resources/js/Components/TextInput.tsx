import React, { forwardRef, useEffect, useRef } from 'react';

interface Props {
    type?: string;
    name?: string;
    id: string | undefined;
    value: string;
    className?: string;
    autoComplete?: string | undefined;
    required?: boolean;
    isFocused?: boolean;
    placeHolder?: string;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default forwardRef(function TextInput(
    {
        type = 'text',
        name,
        id,
        value,
        className,
        autoComplete,
        required,
        isFocused,
        placeHolder,
        handleChange }: Props,
) {
    const input = useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                placeholder={placeHolder}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
});
