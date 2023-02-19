import React, {useState} from 'react';
import { format } from 'date-fns';
import "./Header.css";

type HeaderProps = {
    username?: string
}

export const Header = (props: HeaderProps) => {
    const {username} = props;

    const [time, setTime] = useState(new Date());

    React.useEffect(()=>{
        const interval = setInterval(()=>{
            setTime(new Date());
        },1000)
    },[])


    return (
        <div className={'header'}>
            <div>{username ? username : "Guest "}</div>
            <div>lab 4/V3210166</div>
            <div>{format(time, 'dd/MM/yyyy kk:mm:ss')}</div>
        </div>
    );

}
