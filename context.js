import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
    trackingList: [],
    trackedCount: 0, // New state to hold the tracked count
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_TRACKING_LIST':
            return {
                ...state,
                trackingList: [...state.trackingList, action.payload],
                trackedCount: state.trackedCount + 1, // Increment tracked count
            };
        case 'REMOVE_FROM_TRACKING_LIST':
            return {
                ...state,
                trackingList: state.trackingList.filter((code) => code !== action.payload),
                trackedCount: state.trackedCount - 1, // Decrement tracked count
            };
        default:
            return state;
    }
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
    );
};

const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export { AppProvider, useAppContext }; // Corrected export statements
