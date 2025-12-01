import React from "react";
import {AuthorizationSingupForm} from "@components/authorization/AuthorizationSingupForm.tsx";
import {Card} from "antd";

export function AuthorizationSingupPage() {
    return (
        <Card className="authorization-form-wrapper">
            <AuthorizationSingupForm/>
        </Card>
    )
}