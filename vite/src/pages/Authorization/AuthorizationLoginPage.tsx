import React from "react";
import {AuthorizationLoginForm} from "@components/authorization/AuthorizationLoginForm.tsx";
import {Card} from "antd";
import "@styles/Authorization.css";

export function AuthorizationLoginPage() {
    return (
        <Card className="authorization-form-wrapper">
            <AuthorizationLoginForm/>
        </Card>
    )
}