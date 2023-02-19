import React, {createRef, useEffect} from "react";
import "./Graph.css";

type GraphProps = {
    r: number,
    entries: {x:number, y: number, r: number, result: boolean}[];

    onClick: (coordinates: {x: number, y: number}) => void;
}

export const Graph = (props: GraphProps) => {

    const canvasRef = createRef<HTMLCanvasElement>();

    const {r, entries, onClick} = props;


    const onClickGraph = (event: React.MouseEvent) => {
        let {x,y} = getCursorPosition(canvasRef.current,event);

        onClick({
            x: (x-230)/40,
            y: (230-y)/40,
        })

    }

    const redrawGraph = () => {
        const ctx = canvasRef.current?.getContext('2d');

        if(ctx) {
            drawGraph(ctx, r);
            drawDots(ctx, r, entries);
        }
    }

    useEffect(()=>{
        redrawGraph();
    },[r, entries]);


    return <canvas ref={canvasRef} width={460} height={460} className={'canvas'} onClick={onClickGraph} />
}

const drawCanvasArrow = (context: CanvasRenderingContext2D , fromx: number, fromy: number, tox: number, toy: number) => {
    let headlen = 10; // length of head in pixels
    let dx = tox - fromx;
    let dy = toy - fromy;
    let angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

const drawGraph = (ctx: CanvasRenderingContext2D, r: number) => {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, 460, 460);


    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.fillStyle = "rgba(0, 0, 0, 1)";

    ctx.beginPath();
    // Y
    drawCanvasArrow(ctx,230,460,230,0);

    // X
    drawCanvasArrow(ctx,0,230,460,230);
    ctx.stroke();

    ctx.font = "25px Yandex Sans";

    ctx.fillText("x", 440, 215);
    ctx.fillText("y", 205, 20);


    ctx.fillText("5",245,37);
    ctx.beginPath();
    ctx.moveTo(220,30);
    ctx.lineTo(240, 30);
    ctx.stroke();

    ctx.fillText("5",425,265);
    ctx.beginPath();
    ctx.moveTo(430,220);
    ctx.lineTo(430, 240);
    ctx.stroke();


    ctx.fillText("-5",195,437);
    ctx.beginPath();
    ctx.moveTo(220,430);
    ctx.lineTo(240, 430);
    ctx.stroke();


    ctx.fillText("-5",17,210);
    ctx.beginPath();
    ctx.moveTo(30,220);
    ctx.lineTo(30, 240);
    ctx.stroke();


    ctx.fillText("2.5",245,137);
    ctx.beginPath();
    ctx.moveTo(220,130);
    ctx.lineTo(240, 130);
    ctx.stroke();

    ctx.fillText("2.5",315,265);
    ctx.beginPath();
    ctx.moveTo(330,220);
    ctx.lineTo(330, 240);
    ctx.stroke();


    ctx.fillText("-2.5",175,337);
    ctx.beginPath();
    ctx.moveTo(220,330);
    ctx.lineTo(240, 330);
    ctx.stroke();


    ctx.fillText("-2.5",107,210);
    ctx.beginPath();
    ctx.moveTo(130,220);
    ctx.lineTo(130, 240);
    ctx.stroke();



    // GRAPH
    // center 230,230
    // 0-5: 200, 1=40;
    // r=5 - 1,

    ctx.fillStyle = "rgba(50, 63, 179, 0.5)";

    // RECTANGLE
    ctx.fillRect(230,230,-40*r/2,-40*r);    // x*r = 100

    // CIRCLE
    ctx.beginPath();
    ctx.strokeStyle = "rgba(50, 63, 179, 0.5)";
    ctx.moveTo(230,230);
    ctx.arc(230,230,40*r/2,Math.PI*3/2,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // TRIANGLE
    ctx.beginPath();
    ctx.strokeStyle = "rgba(50, 63, 179, 0.5)";
    ctx.moveTo(230-40*r/2,230);
    ctx.lineTo(230,230);
    ctx.lineTo(230,230+40*r/2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
}

const drawDots = (ctx: CanvasRenderingContext2D, r: number, dots: {x:number, y: number, r: number, result: boolean}[]) => {

    dots.forEach(dot => {
        ctx.fillStyle = dot.result ? 'green' : 'red';
        ctx.beginPath();
        ctx.arc(
            230 + dot.x*40,
            -dot.y*40 + 230,
            6, 0, 2 * Math.PI);
        ctx.fill();

    })

}

function getCursorPosition(canvas: HTMLCanvasElement | null, event: React.MouseEvent) {
    if (canvas){
        const rect = canvas.getBoundingClientRect();
        const x = Math.round(event.clientX - rect.left);
        const y = Math.round(event.clientY - rect.top);
        return {x,y};
    }

    return {x: 0, y: 0};
}
