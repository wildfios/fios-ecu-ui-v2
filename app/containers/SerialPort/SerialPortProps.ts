import * as SerialPort from "serialport";

export interface SerialPortStateI {
    opened: boolean;
    blocked: boolean;
    error: string;
    data: string;
    portList: Array<string>;
    port: SerialPort;
}

export interface SerialPortPropsI {
    readonly OwnProps: {
    };
    readonly InjectedProps: {
    };
    readonly ComposedProps: SerialPortPropsI["OwnProps"] & SerialPortPropsI["InjectedProps"];
}
