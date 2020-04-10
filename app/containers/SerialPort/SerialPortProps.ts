export interface SerialPortStateI {
    opened: boolean;
    blocked: boolean;
    port: {};
    parser: {};
    portList: Array<any>;
}

export interface SerialPortPropsI {
    readonly OwnProps: {
    };
    readonly InjectedProps: {
        // open: (port: string)=>undefined;
        // portList: [],
    };
    readonly ComposedProps: SerialPortPropsI["OwnProps"] & SerialPortPropsI["InjectedProps"];
}
