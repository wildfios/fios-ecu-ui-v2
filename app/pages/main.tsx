import { FC, default as React, useContext } from "react";
import { PortSelector } from "../components/PortSelector";

export const App: FC = (): JSX.Element => {

    return (
        <div>
            <PortSelector></PortSelector>
            main page
        </div>
    );
}