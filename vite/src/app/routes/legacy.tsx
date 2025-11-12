import React from "react";
import LegacyApp from "../../App";
import LegacyAuth from "@components/Auth";
import LegacyRegister from "@components/Signup";
import LegacyAccount from "@components/Account";
import LegacyDetails from "@components/Details";

export function LegacyHome() {
    return <LegacyApp />;
}

export function AuthForm(){
    return <LegacyAuth/>;
}

export function RegisterForm(){
    return <LegacyRegister/>;
}



export function AccountDetails(){
    return <LegacyAccount/>
}

export function UserDetails(){
    return <LegacyDetails/>
}