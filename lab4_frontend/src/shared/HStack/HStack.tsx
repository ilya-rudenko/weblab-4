import React from 'react';
import './HStack.css'
import {useWindowDimensions} from "../UseWindowDimensions/useWindowDimensions";

type HStackProps = {
    children: React.ReactNode
}


export const HStack = (props: HStackProps) => {
    const {width} = useWindowDimensions();

    return <div className={width<713? 'HStackMobile':'HStack'}>
        {props.children}
    </div>
}