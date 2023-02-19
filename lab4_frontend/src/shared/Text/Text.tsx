import React from "react";
import "./Text.css";

type TextProps = {
    text: string,
    isError?: boolean
}

export const Text = (props: TextProps) => {

    return (
        <div className={props.isError ? 'errorText' : 'text'}>
            {props.text}
        </div>
    );
}