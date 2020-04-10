import { createContext } from "react";

export interface SerialPortContextI {
    open: (port: string)=>void;
    portList: Array<{}>;
}

export const SerialPortContext = createContext({
    open: (port: string)=>undefined,
    portList: [],
} as SerialPortContextI);
