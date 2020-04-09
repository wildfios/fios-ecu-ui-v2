export interface SerialPortStateI {
    opened: boolean;
    portList: Array<any>;
}

export interface SerialPortPropsI {
    readonly OwnProps: {
    };
    readonly InjectedProps: {
        onDataRcvd: () => undefined,
        portList: [],
    };
    readonly ComposedProps: SerialPortPropsI["OwnProps"] & SerialPortPropsI["InjectedProps"];
}
