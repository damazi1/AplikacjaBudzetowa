import axios from "axios";
import React from "react";
import {useEffect, useState} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";

export function AuthorizationRequest() {
    const [state, setState] = useState<"ok" | "no"|"checking">("checking");
    const location = useLocation();

    useEffect(() =>{
        axios.get("http://localhost:8080/user/me", {
            withCredentials: true,
            headers: {"Content-Type": "application/json"},
        }).then(() => {
            setState("ok")
        }).catch(() => {
            setState("no")
        })
        return () => {
        };
    },[]);
    if (state === "checking") return <div>Checking authentication...</div>
    if (state === "ok") return <Outlet />
    return <Navigate to="/auth/login" replace state={{from: location}}/>

}