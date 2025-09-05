import {useContext, createContext, useState} from 'react';

export const FilterContext = createContext()

export const FilterContextProvider = ({children}) => {
    const [filter, setFilter] = useState(false)

    const onClick = () => {
        filter ? setFilter(false):setFilter(true)
    }

    return (
        <FilterContext.Provider value = {{filter, setFilter,onClick}}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    return useContext(FilterContext)
}