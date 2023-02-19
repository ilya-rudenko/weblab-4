import React, {useState} from 'react';
import {HStack} from "../HStack/HStack";
import "./RadioButtons.css";

type RadioButtonsProps = {
    onChange: (value: string) => void;
    items: string[];

    id: string;

    defaultChecked?: string;
}


export const RadioButtons = (props: RadioButtonsProps) => {
    const {items, onChange, id, defaultChecked} = props;

    const [checkedValue, setCheckedValue] = useState(defaultChecked);

    const onClick = (event:  React.MouseEvent<HTMLButtonElement> | undefined) => {
        onChange(event?.currentTarget.value ?? "");
        setCheckedValue(event?.currentTarget.value ?? "");
    }


    return (
        <HStack>
            {items.map(el => {

            return (
                    <button onClick={onClick} className={el===checkedValue? "checked_button" :"default_button"} value={el} key={id+"_"+el}>
                        {el}
                    </button>
            )
            })}
        </HStack>
    );
}

// <div className={'form_radio_btn'} key={el}>
//     <input id={id + "_radio-"+ el} type={'radio'} name={'radio'} value={el} onChange={onClick} defaultChecked={el===checkedValue}/>
//     <label htmlFor={id + "_radio-"+ el}>{el}</label>
// </div>