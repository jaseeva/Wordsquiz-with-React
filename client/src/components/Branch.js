import React from "react";

const Branch = ({condition, Component, Alt, ...rest}) => 
    condition
    ? <Component {...rest} />
    : <Alt />

export default Branch;