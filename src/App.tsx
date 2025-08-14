import {useState} from "react";
import HRnetPopup from "./components/popup/HRnetPopup.tsx";

function App() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<button onClick={() => setIsOpen(true)}>Ouvrir la modale</button>

			<HRnetPopup
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Titre de la modale"
				closeOnOverlayClick={true}
				closeOnEsc={true}
				className="ma-personnalisation"
				cancelText={"Fermer"}
			>
				<p>Contenu de la modale</p>
			</HRnetPopup>
		</div>
	);

}

export default App;
