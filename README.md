# HRnet React Modal

Un composant Modal simple et léger pour React, sans dépendances externes.

## Fonctionnalités

- 💡 Aucune dépendance externe
- 🎨 Style personnalisable via CSS
- ♿ Accessibilité de base (focus trap, fermeture avec Echap)
- 📱 Réactif et adaptatif
- 🎭 Animation de fondu à l'ouverture/fermeture

## Installation

1. Copiez le composant `Modal.jsx` dans votre projet React
2. Importez et utilisez-le comme n'importe quel autre composant React

## Utilisation

```jsx
import { useState } from 'react';
import Modal from './components/Modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Ouvrir la modale</button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Titre de la modale"
      >
        <p>Contenu de la modale</p>
      </Modal>
    </div>
  );
}
```

## Props

| Prop | Type | Requis | Description |
|------|------|--------|-------------|
| `isOpen` | boolean | Oui | Contrôle l'affichage de la modale |
| `onClose` | function | Oui | Fonction appelée lors de la fermeture |
| `title` | string | Non | Titre de la modale |
| `closeOnOverlayClick` | boolean | Non | Fermer en cliquant en dehors (défaut: true) |
| `closeOnEsc` | boolean | Non | Fermer avec la touche Echap (défaut: true) |
| `className` | string | Non | Classe CSS personnalisée pour la modale |

## Personnalisation

Le composant utilise des classes CSS pour le style. Vous pouvez les surcharger dans votre propre CSS :

```css
.modal-overlay {
  /* Styles pour l'arrière-plan */
}

.modal-content {
  /* Styles pour le contenu de la modale */
}

.modal-close {
  /* Styles pour le bouton de fermeture */
}

/* Animation de fondu */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

## Licence

MIT
