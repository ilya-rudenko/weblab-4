import React from "react";
import "./Table.css";

type TableProps = {
    dots: {
        date: string,
        executionTime: string,
        x: string,
        y: string,
        r: string,
        result: boolean,
        id: number
    }[];
}

export const Table = (props: TableProps) => {


    return (
        <table>
            <thead>
                <tr>
                    <th scope="col" className={'left'}>Время</th>
                    <th scope="col">Затрачено</th>
                    <th scope="col">X</th>
                    <th scope="col">Y</th>
                    <th scope="col">R</th>
                    <th scope="col" className={'right'}>Результат</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.dots.map(el=>{
                        return (
                            <tr key={el.id}>
                                <th scope={'row'}>{el.date}</th>
                                <td>{el.executionTime}</td>
                                <td>{el.x}</td>
                                <td>{el.y}</td>
                                <td>{el.r}</td>
                                <td>{el.result ? "Попадание" : "Промах"}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}