import {Redirect } from "react-router-dom";


export default function Profile({authorized}){
    if(!authorized) {
        return <Redirect to="/login"/>
    }

    return (
        <h1>Welcome to your  Profile</h1>
    );
}