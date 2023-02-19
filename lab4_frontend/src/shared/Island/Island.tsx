import React from "react";
import "./Island.css";

type IslandProps = {
    children: React.ReactNode
}

export const Island = (props: IslandProps) => {

    return(
        <div className={'island'}>
            {props.children}
        </div>
    )
}