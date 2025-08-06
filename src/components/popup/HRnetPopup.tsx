import "./HRnetPopup.scss";

export type HRnetPopupProps = { text: string };

function HRnetPopup(props: HRnetPopupProps) {
	return <div className="my-custom-c">
		<p className="text">{props.text}</p>
	</div>;
}

export default HRnetPopup;