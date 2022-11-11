import { object } from "prop-types";
import React, { PropsWithChildren, useState } from "react";


export const AplicationContext = React.createContext<any>({});

export const AplicationProvider = (props: PropsWithChildren) => {

    const [aplication, setAplication] = useState({
        loader: false,
        pageTitle: ""
    });

    return (
        <AplicationContext.Provider value={{ aplication, setAplication }}>
            {props.children}
        </AplicationContext.Provider>
    );

};

export const useAplication = () => React.useContext(AplicationContext);
