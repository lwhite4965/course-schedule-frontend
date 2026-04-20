import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./LoggedOut.css";
import { SignUpButton, SignInButton } from "@clerk/clerk-react";
export const LoggedOut = () => {
    return (_jsxs("div", { className: "vertParent", children: [_jsx("p", { className: "helperText", children: "Returning?" }), _jsx(SignInButton, { mode: "modal", children: _jsx("button", { className: "authBtn", children: "Log In" }) }), _jsx("p", { className: "helperText", children: "New User?" }), _jsx(SignUpButton, { children: _jsx("button", { className: "authBtn", children: "Sign Up" }) })] }));
};
export default LoggedOut;
