import * as React from "react";
import {IUser} from "./IUser";
import {IMovie} from "./IMovie";

export interface IContext {
    store: IStore,
    setStore: (store: IStore) => void,
}

export interface IStore {
    isDark : boolean,
    movies: IMovie[]|null;
    ri7movies: IMovie[]|null;
    user: IUser|null
}

interface Props {
    children: any
}

const defaultValue: IStore = {
    isDark : false,
    movies: null,
    ri7movies: null,
    user: null
}

export const GlobalContext = React.createContext<IContext|null>(null);

const ContextProvider:React.FC<Props> = ({children}) => {

    const [store, setStore] = React.useState<IStore>(defaultValue)

    return(
        <GlobalContext.Provider value={{store, setStore}}>
            <div>{children}</div>
        </GlobalContext.Provider>

    )
}

export default ContextProvider;