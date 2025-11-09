import React from "react";
import LegacyApp from "../../App";
import LegacyAuth from "../../components/Auth";
import LegacyRegister from "../../components/Signup";
import LegacyWallet from "../../components/Wallet";

export function LegacyHome() {
    return <LegacyApp />;
}

export function AuthForm(){
    return <LegacyAuth/>;
}

export function RegisterForm(){
    return <LegacyRegister/>;
}

export function WalletDetails(){
    return <LegacyWallet/>;
}