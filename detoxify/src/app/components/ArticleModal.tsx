import React from "react";

interface ArticleModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-black dark:bg-gray-900 rounded-lg shadow-lg max-w-3xl w-full mx-4 p-6 overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">Article Details</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition"
          >
            Close
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default ArticleModal;
