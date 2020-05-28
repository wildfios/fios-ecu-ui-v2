import { createContext } from "react";

export interface SerialPortContextI {
    open: (port: string)=>void;
    write: (data: string)=>void;
    error: string;
    data: string;
    portList: Array<{}>;
}

export const SerialPortContext = createContext({
    open: (port: string) => undefined,
    write: (data: string) => undefined,
    error: '',
    data: '',
    portList: [],
} as SerialPortContextI);
