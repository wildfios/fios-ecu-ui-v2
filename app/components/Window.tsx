import { FC, default as React, useState } from "react";
import styles from './Window.scss';

interface WindowPropsI {
    header?: string;
    children?: React.ReactNode;
}

export const Window: FC<WindowPropsI> = (props): JSX.Element => {
    const [leftPos, setLeftPos] = useState(0);
    const [topPos, setTopPos] = useState(0);
    let offsetX = 0;
    let offsetY = 0;

    const onDrag = (event: MouseEvent): void => {
        event.preventDefault();
        setLeftPos(event.clientX - offsetX);
        setTopPos(event.clientY - offsetY);
    }

    const onDragStop = (): void => {
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', onDragStop);
    }

    const onDragStart = (event: React.MouseEvent): void => {
        event.preventDefault();
        offsetX = event.nativeEvent.offsetX;
        offsetY = event.nativeEvent.offsetY;
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', onDragStop);
    }

    const getWindowPos = () => {
        return {'left': leftPos + 'px', 'top': topPos + 'px', 'zIndex': 100};
    }

    return (
        <div className={styles.window} style={getWindowPos()}>
            <div className={styles.header} onMouseDown={onDragStart}>
                {props.header}
            </div>
            {props.children}
        </div>
    );
}
