import "./Modal.css";

export const Modal = (props: {
	children: React.ReactNode;
	isVisible: boolean;
	onClose: () => void;
}) => {
	if (!props.isVisible) return null;
	return (
		<div className="modalOverlay">
			<div className="modalBackground">
				<button className="modalCloseButton" onClick={props.onClose}>
					Close
				</button>
				{props.children}
			</div>
		</div>
	);
};
