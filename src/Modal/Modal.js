import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Modal.css";
export const Modal = (props) => {
    if (!props.isVisible)
        return null;
    return (_jsx("div", { className: "modalOverlay", children: _jsxs("div", { className: `modalBackground + ${props?.largeModal ? "modalLarge" : ""}`, children: [_jsx("button", { className: "modalCloseButton", onClick: props.onClose, children: "Close" }), props.children] }) }));
};
