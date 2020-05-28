import { FC, default as React, useContext, useState } from "react";

interface MapTableI {
    ScaleSizeX?: number;
    ScaleSizeY?: number;
    MaxCellVal?: number;
    MinVellVal?: number;
    MapData?: Array<number>
};

interface SelecetSellI {
    x: number;
    y: number;
};

export const MapTable: FC<MapTableI> = (props): JSX.Element => {
    const [selectedCell, setSelectedCell] = useState<SelecetSellI>();
    
    const cellWidth = 40;
    const cellHeight = 20;

    const maxVal = 500;
    const minVal = 0;
    
    const [data, setData] = useState([[100, 200, 300, 400],[110, 220, 330, 440]]);

    const getFillColor = (value): string => {
        return 'hsl('+ (250 - (value * (250 / (maxVal - minVal)))) +' , 100%, 65%)';
    };

    const onCellEdit = (event: React.ChangeEvent) => {
        data[0][1] = parseInt(event.nativeEvent.target.value);
        setData(data.slice());
    }

    const onCellClick = (e) => {
        console.log(e.nativeEvent)
    }

    const renderCell = (offetX: number, offetY: number, value: number): JSX.Element => {
        return (
            <g  key={offetY + offetX} 
                onClick={onCellClick}>
                <rect
                    x={cellWidth * offetX}
                    y={cellHeight * offetY}
                    width={cellWidth}
                    height={cellHeight}
                    fill={getFillColor(value)}
                    stroke="black"
                />
                <text
                    x={4 + cellWidth * offetX}
                    y={16 + cellHeight * offetY}
                    fontSize="16"
                    fill="black"
                >
                    {value}
                </text>
            </g>
        );
    }

    return (
    <>    
        <input type="text" name="name" onChange={onCellEdit}/>
        <svg>
            {data.map((value, offetY) => {
                return value.map((value, offetX) => {
                    return renderCell(offetX, offetY, value);
                })
            })}
        </svg>
    </>
    );
}
