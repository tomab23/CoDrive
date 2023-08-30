import React from "react";

const ImportFileButton = () => {
  return (
    <div className="ImportFileButton">
      <button
        type="button"
        className="w-[290px] text-center inline-flex items-center px-6 py-2 rounded-lg font-bold text-xl bg-primary"
      >
        Importer des photos
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor"
          className="w-6 h-6 font-bold ml-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </button>
      <div className="mt-4 ml-16 text-lg font-semiBold italic">
        3 photos maximum
      </div>
    </div>
  );
};

export default ImportFileButton;
