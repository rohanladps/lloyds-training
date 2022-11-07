import {createContext} from "react";

interface AppContextInterface {
    name: string;
    email: string;
    number: string;
}

export default createContext<AppContextInterface>({name: '', email: '', number: ''});;
