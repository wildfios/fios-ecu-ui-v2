import { FC, default as React, useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";

import { SerialPortContext } from "../containers/SerialPort/SerialPortContext";

export const PortSelector: FC = (): JSX.Element => {
    const portCtx = useContext(SerialPortContext);
    const [selectedPort, setSelectedPort] = useState("");

    portCtx.onDataRcvd();

    const onCheck = (event: React.SyntheticEvent) => {
        setSelectedPort(event.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Port select</Form.Label>
                    <Form.Control 
                        required 
                        as="select" 
                        value={selectedPort} 
                        custom onChange={onCheck}>
                        {portCtx.portList.map((value, index) => {    
                            return (
                                <option key={index}>{value['path']}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>
                <Button type="submit">Connect</Button>
            </Form>
    );
}
