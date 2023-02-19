import React from "react";
import './Input.css';

type InputProps = {
    onChange: (text:  string | number ) => void;
    type: "text" | "number";

    bounds?: {min: number, max: number};

    value: string | number,
}

export const Input = (props: InputProps) => {
    const {type, onChange, bounds, value} = props;

    const onValueChange = (event:  React.ChangeEvent<HTMLInputElement> | undefined) => {
         if (type==="number" && bounds) {
             if (event?.target.value && (Number(event?.target.value) < bounds.min || Number(event?.target.value) > bounds.max)) return;
         }
         // changeValue(event?.target.value ?? "");
         onChange(event?.target.value ?? "");
    }

    return (
        <input
            type={type}
            value={value}
            onChange={onValueChange}
            className={'input'}
        />
    );
}