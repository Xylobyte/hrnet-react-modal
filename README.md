# HRnet React Modal

A simple and lightweight Modal component for React, with no external dependencies.

## Features

-  💡 No external dependencies
-  🎨 Customizable styling via SCSS
-  ♿ Basic accessibility (focus trap, close with Escape)
-  📱 Responsive and adaptive
-  🎭 Fade‑in animation on open
-  ✨ Customizable buttons

## Installation

```shell
npm install @xylobyte/hrnet-react-modal
```

## Usage

```tsx
import { useState } from "react";
import Modal from "./components/Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    console.log("Action confirmed!");
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open modal</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
        onConfirm={handleConfirm}
        confirmText="Confirm"
        cancelText="Cancel"
      >
        <p>Modal content</p>
      </Modal>
    </div>
  );
}
```

## Props

| Prop                | Type    | Required | Description |
|---------------------|---------|----------|-------------|
| `isOpen`            | boolean | Yes      | Controls the visibility of the modal |
| `onClose`           | function| Yes      | Function called when the modal is closed |
| `title`             | string  | No       | Title displayed in the modal header |
| `closeOnOverlayClick` | boolean | No       | Close when clicking outside (default = true) |
| `closeOnEsc`        | boolean | No       | Close with Escape key (default = true) |
| `className`         | string  | No       | Custom CSS class for the modal |
| `onConfirm`         | function| No       | Function called when the user clicks **Confirm** |
| `confirmText`       | string  | No       | Text for the **Confirm** button (default = "Confirm") |
| `cancelText`        | string  | No       | Text for the **Cancel** button (default = "Cancel") |

## Customization

The component uses SCSS classes for styling. You can override them in your own SCSS:

```scss
.modal-overlay { /* styles for the backdrop */ }

.modal-content { /* styles for the modal content */ }

.modal-close { /* styles for the close button */ }

.modal-footer .modal-btn.confirm { /* styles for the confirm button */ }

.modal-footer .modal-btn.cancel { /* styles for the cancel button */ }
```

## License

MIT
