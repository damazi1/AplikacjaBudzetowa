import {Button, Result} from "antd";
import React from "react";


export function NotFound() {
    return <div style ={{display: "grid", placeItems: "center", minHeight: "60vh"}}>
        <Result
            status="404"
            title="404"
            subTitle="Page Not Found"
            extra={
            <Button type="primary" onClick={() => window.location.href = '/'}>Go Home</Button>
            }
            />
    </div>
}