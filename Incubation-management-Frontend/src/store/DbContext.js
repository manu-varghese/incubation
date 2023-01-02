import {createContext ,useState} from 'react'

export const UserData = createContext(null)

function DbContext({children}) {
    const [application, setApplication] = useState([])
    return(
        <UserData.Provider value={{application, setApplication}}>
            {children}
        </UserData.Provider>
    )
}

export default  DbContext;
