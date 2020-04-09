import * as SerialPort from 'serialport';

export class serialComm {
    static portList: Array<any>
    static port: any;

    static async fetchPortList(): Promise<Array<any>> {
        this.portList = await SerialPort.list();
        return this.portList;
    }

    static getPortList(): Array<any> {
        return this.portList;
    }

    static async open(port: string) {
        this.port = new SerialPort(port, {baudRate: 115200}, res => {
        }) 
        this.port.on('data', console.log)
    }
}


//serial = new SerialPort('/dev/ttySTest0');
// SerialPort.list().then(res => {
//     console.log(res)
//   })  

//   const port = 
//   port.on('data', (data) => {
//     console.log(data);
//   })