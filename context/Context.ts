import { createContext } from "react";
import { ListContext as ListContextProps } from "../config/type";

export const ListContext = createContext<ListContextProps | null>(null);
export const LoginStatusContext = createContext<any | null>(null);
