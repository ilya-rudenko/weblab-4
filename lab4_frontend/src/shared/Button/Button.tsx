import React from 'react';
import "./Button.css";

type ButtonProps = {
    onClick: () => void;
    text: string;
}

export const Button = (props: ButtonProps) => {
    const {onClick, text} = props;

    return <button className="button" onClick={onClick}>{text}</button>
}
