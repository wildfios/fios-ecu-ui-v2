import { default as React } from "react";
import { SerialPortPropsI, SerialPortStateI } from "./SerialPortProps"; 
import { SerialPortContext, SerialPortContextI } from "./SerialPortContext";
import * as SerialPort from "serialport";
import * as Delimiter from "serialport/lib/parsers";

class SerialPortProvider extends React.Component<SerialPortPropsI["OwnProps"], SerialPortStateI> {
    public readonly state: SerialPortStateI = {
        opened: false,
        blocked: false,
        parser: {},
        port: {},
        portList: []
    }

    async componentWillMount(){
        try {
            const list = await SerialPort.list();
            this.setState({portList: list});
        } catch (e) {
            console.log(e);
        }
    }

    public static async getInitialProps(): Promise<{}> {
        return {};
    }

    public async componentDidMount(): Promise<any> {

    }

    public render(): React.ReactNode {
        return (
            <SerialPortContext.Provider value={this.childrenProps}>
                {this.props.children}
            </SerialPortContext.Provider>
        );
    }

    protected get injectedProps(): SerialPortPropsI["InjectedProps"] {
        return this.props as any;
    }

    protected get childrenProps(): SerialPortContextI {
        return {
            portList: this.state.portList,
            open: this.openPort
        };
    }

    protected openPort = async (path) => {
        return new Promise(resolve => {
            const port = new SerialPort(path, { baudRate: 115200 }, err => {
                if (err) {
                    resolve({open: false, msg: err});
                } else {
                    const parser = port.pipe(new Delimiter({ delimiter: '\n' }));
                    resolve({open: port.isOpen});
                    this.setState({parser: parser});
                }
            });
            this.setState({port: port});
        })
    }
    
    
    
    
    (portPath: string)=> {
        const port = new SerialPort(portPath);
        this.setState({port: port});
        
    }


    // protected onDataRcvd = async (profile: ProfileAction.ActionCreateI["RequestData"]): Promise<void> => {
    //     await awaitAction((promiseBase) => this.injectedProps.onCreate(profile, promiseBase));
    // }
}

export default SerialPortProvider;
