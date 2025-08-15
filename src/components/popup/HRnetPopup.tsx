import * as React from "react";
import {memo, useEffect, useRef} from "react";
import "./HRnetPopup.scss";
import {createPortal} from "react-dom";

/**
 * Props for the HRnetPopup component.
 * @interface HRnetPopupProps
 */
export interface HRnetPopupProps {
	/**
	 * Indicates whether the popup is currently displayed.
	 * @type {boolean}
	 */
	isOpen: boolean;

	/**
	 * Callback fired when the popup is requested to close.
	 * @type {() => void}
	 */
	onClose: () => void;

	/**
	 * Optional title shown at the top of the popup.
	 * @type {string}
	 */
	title?: string;

	/**
	 * If true, clicking the overlay will close the popup.
	 * @type {boolean}
	 */
	closeOnOverlayClick?: boolean;

	/**
	 * If true, pressing the Escape key will close the popup.
	 * @type {boolean}
	 */
	closeOnEsc?: boolean;

	/**
	 * Optional CSS class to apply to the popup container.
	 * @type {string}
	 */
	className?: string;

	/**
	 * React nodes to render inside the popup body.
	 * @type {React.ReactNode}
	 */
	children?: React.ReactNode;

	/**
	 * Callback fired when the user confirms an action.
	 * @type {() => void}
	 */
	onConfirm?: () => void;

	/**
	 * Text for the confirm button.
	 * @type {string}
	 */
	confirmText?: string;

	/**
	 * Text for the cancel button.
	 * @type {string}
	 */
	cancelText?: string;
}

/**
 * HRnetPopup – a reusable modal component.
 *
 * The component renders a modal dialog into the document body using a React portal.
 * It supports:
 *   • Keyboard navigation (Escape to close, Tab trapping inside the modal)
 *   • Optional closing on overlay click or Escape key
 *   • Custom titles, button texts and styles
 *
 * @param {HRnetPopupProps} props – props for the modal.
 */
function HRnetPopup({
	                    isOpen,
	                    onClose,
	                    title,
	                    closeOnOverlayClick = true,
	                    closeOnEsc = true,
	                    className = "",
	                    children,
	                    onConfirm,
	                    confirmText = "Confirmer",
	                    cancelText = "Annuler",
                    }: HRnetPopupProps) {
	/* References to the overlay and modal content elements */
	const overlayRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	/* Store the element that had focus before the modal opened */
	const previousFocused = useRef<Element | null>(null);

	/* Handle opening/closing and keyboard interactions */
	useEffect(() => {
		if (!isOpen) return;

		// Remember the element that had focus
		previousFocused.current = document.activeElement;
		// Move focus into the modal
		contentRef.current?.focus();

		// Keyboard event handler
		const handleKeyDown = (e: KeyboardEvent) => {
			// Close on Escape
			if (closeOnEsc && e.key === "Escape") {
				e.stopPropagation();
				onClose();
			}
			// Trap Tab navigation inside the modal
			else if (e.key === "Tab") {
				const focusable = contentRef.current?.querySelectorAll(
					'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
				);
				if (!focusable || focusable.length === 0) return;
				const first = focusable[0] as HTMLElement;
				const last = focusable[focusable.length - 1] as HTMLElement;

				if (e.shiftKey) {
					if (document.activeElement === first) {
						e.preventDefault();
						last.focus();
					}
				} else {
					if (document.activeElement === last) {
						e.preventDefault();
						first.focus();
					}
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			// Restore focus to the element that was focused before the modal opened
			(previousFocused.current as HTMLElement)?.focus();
		};
	}, [isOpen, closeOnEsc, onClose]);

	/* Close modal when clicking on the overlay (outside the content) */
	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (closeOnOverlayClick && e.target === overlayRef.current) {
			onClose();
		}
	};

	if (!isOpen) return null;

	return createPortal(
		<div
			className="modal-overlay"
			ref={overlayRef}
			onClick={handleOverlayClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<div
				className={`modal-content ${className}`}
				ref={contentRef}
				tabIndex={-1}
			>
				<header className="modal-header">
					{title && (
						<h2 id="modal-title" className="modal-title">
							{title}
						</h2>
					)}
					<button
						className="modal-close"
						aria-label="Fermer la modale"
						onClick={onClose}
					>
						×
					</button>
				</header>

				<div className="modal-body">{children}</div>

				<footer className="modal-footer">
					<button className="modal-btn cancel" onClick={onClose}>
						{cancelText}
					</button>
					{onConfirm && (
						<button className="modal-btn confirm" onClick={onConfirm}>
							{confirmText}
						</button>
					)}
				</footer>
			</div>
		</div>,
		document.body
	);
}


export default memo(HRnetPopup);
