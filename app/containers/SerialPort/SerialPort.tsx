import { default as React } from "react";
import { SerialPortPropsI, SerialPortStateI } from "./SerialPortProps"; 
import { SerialPortContext, SerialPortContextI } from "./SerialPortContext";
import * as SerialPort from "serialport";
import * as Delimiter from "@serialport/parser-delimiter";

class SerialPortProvider extends React.Component<SerialPortPropsI["OwnProps"], SerialPortStateI> {
    public readonly state: SerialPortStateI = {
        opened: false,
        error: '',
        data: '',
        blocked: false,
        portList: [],
        port: {}
    };

    public static async getInitialProps(): Promise<{}> {
        return {};
    }

    public async componentDidMount(): Promise<any> {
        try {
            const list = await SerialPort.list();
            this.setState({portList: list});
        } catch (e) {
            this.setState({error: 'Cannot get port list'});
        }
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
            error: this.state.error,
            portList: this.state.portList,
            data: this.state.data,
            open: this.openPort,
            write: this.writeData,
        };
    }

    protected writeData = (data: string) => {
        this.state.port.write(data)
    }

    protected openPort = (path) => {
        if (this.state.opened) {
            return;
        }
        this.setState({error: ''});
        try {
            const port = new SerialPort(path, { baudRate: 115200 }, err => {
                if (err) {
                    this.setState({error: err});
                    return;
                }
            });
            
            this.setState({port: port})
            this.setState({opened: true});
            const parser = port.pipe(new Delimiter({ delimiter: '\n' }));
            parser.on('data', buffer => this.setState({data: buffer}));
        } catch (e) {
            this.setState({error: 'Error while opening port'});
        }
    }
}

export default SerialPortProvider;
