import { createContext } from "react";

export interface SerialPortContextI {
    onDataRcvd: () => void;
    portList: Array<{}>;
}

export const SerialPortContext = createContext({
    onDataRcvd: () => undefined,
    portList: [],
} as SerialPortContextI);
