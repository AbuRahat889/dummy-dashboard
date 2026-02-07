import React from "react";

// react icons
import { RxCross1 } from "react-icons/rx";

interface ModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isModalOpen,
  setIsModalOpen,
  className,
}) => {
  return (
    <div
      className={`${
        isModalOpen ? " visible" : " invisible"
      } w-full h-screen fixed top-0 left-0 z-[200] dark:bg-black/40 bg-[#0000002a] flex items-center justify-center transition-all duration-300`}
    >
      <div
        className={`${
          isModalOpen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
        } w-[90%] sm:w-[80%] md:w-[60%] ${
          className ? className : "lg:w-[30%] bg-white"
        }  dark:bg-slate-800  rounded-lg p-4 transition-all duration-300`}
      >
        <div className="w-full flex items-end justify-end">
          <RxCross1
            className="p-2 text-[2.5rem] dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
