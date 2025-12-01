import React from "react";
import LegacyApp from "../../App";
import LegacyAuth from "@components/legacy/Auth.tsx";
import LegacyRegister from "@components/legacy/Signup.tsx";
import LegacyAccount from "@components/legacy/Account.tsx";
import LegacyDetails from "@components/legacy/Details.tsx";

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