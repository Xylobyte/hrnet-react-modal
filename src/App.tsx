import './App.css';
import {useState} from "react";
import Modal from "./components/popup/HRnetPopup.tsx";

function App() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<button onClick={() => setIsOpen(true)}>Ouvrir la modale</button>

			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Titre de la modale"
				closeOnOverlayClick={true}
				closeOnEsc={true}
				className="ma-personnalisation"
				cancelText={"Fermer"}
			>
				<p>Contenu de la modale</p>
			</Modal>
		</div>
	);

}

export default App;
