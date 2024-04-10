import React, { createContext, useState } from 'react'
export const CentralizedData = createContext(null);

// This component is for context api
const CentralData = (props) => {
    const [state, setState] = useState(true)

    return (
        <CentralizedData.Provider value={[state, setState]} >
            {props.children}
        </CentralizedData.Provider>
    )
}

export default CentralData