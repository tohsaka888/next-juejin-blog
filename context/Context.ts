import { createContext } from "react";
import { ArticleBriefInfo } from "../config/type";

export const ListContext = createContext<ArticleBriefInfo[] | null>(null);
