import * as React from "react";
import {memo, useEffect, useRef} from "react";
import "./HRnetPopup.scss";
import {createPortal} from "react-dom";

export interface HRnetPopupProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	closeOnOverlayClick?: boolean;
	closeOnEsc?: boolean;
	className?: string;
	children?: React.ReactNode;
	onConfirm?: () => void;
	confirmText?: string;
	cancelText?: string;
}

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
	                    cancelText = "Annuler"
                    }: HRnetPopupProps) {
	const overlayRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const previousFocused = useRef<Element | null>(null);

	useEffect(() => {
		if (!isOpen) return;

		previousFocused.current = document.activeElement;
		contentRef.current?.focus();

		const handleKeyDown = (e: KeyboardEvent) => {
			if (closeOnEsc && e.key === "Escape") {
				e.stopPropagation();
				onClose();
			} else if (e.key === "Tab") {
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
			(previousFocused.current as HTMLElement)?.focus();
		};
	}, [isOpen, closeOnEsc, onClose]);

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
		</div>
		, document.body);
}

export default memo(HRnetPopup);
