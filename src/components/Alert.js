import React, { useEffect } from 'react';
import '../styles/Alert.css'

const Alert = ({ type, msg, removeAlert, newRecipe }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert();
        }, 3000);
        return () => clearTimeout(timeout);
    }, [newRecipe]);
    return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;