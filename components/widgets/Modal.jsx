import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children, footer }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-3xl text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>

        {/* Modal Title */}
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        {/* Modal Body */}
        <div className="text-gray-700 max-h-[80vh] overflow-y-auto">
          {children}
        </div>

        {/* Modal Footer */}
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  );
}
