import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export type DialogProps = {
  title?: string;
  visible?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  onOpen?: () => void;
};


export const Dialog: React.FC<DialogProps> = ({ title, visible = false, children, onClose = () => {}, onOpen = () => {}, ...props}) => {
  const [visibility, setVisible] = useState(visible);

  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  const overlayClasses = `fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto transition-opacity ease-linear z-sticky outline-0 bg-black/50 justify-center items-center ${!visibility ? 'hidden opacity-0' : 'flex' }`;
  const dialogClasses = `relative flex-0 m-2 transition-transform duration-300 pointer-events-none sm:m-7 md:min-w-[40%] min-w-full min-h-full md:min-h-[1px] ease-soft-out trnsform-gpu ${!visibility ? 'scale-50' : 'transform-scale-100' }`;

  return (
    <div className={overlayClasses} aria-hidden={!visibility}>
      <div className={dialogClasses}>
        <div className="relative flex flex-col bg-white border border-solid pointer-events-auto dark:bg-gray-950 bg-clip-padding border-black/20 rounded-xl outline-0 sm:h-[100vh] md:h-auto">
          <div className="flex items-center justify-between p-4 border-b border-solid shrink-0 border-slate-100 rounded-t-xl">
            <h5 className="mb-0 leading-normal dark:text-white">{title}</h5>
            <FontAwesomeIcon icon={faXmark} className="text-gray-700 p-2 hover:text-red-400" onClick={() => { setVisible(false); onClose(); }} />
          </div>
          <div className="relative flex-auto p-4">
            {children}
          </div>
          <div className="flex flex-wrap items-center justify-end p-3 border-t border-solid shrink-0 border-slate-100 rounded-b-xl">
            <button type="button" data-toggle="modal" data-target="#import" className="inline-block px-8 py-2 m-1 mb-4 text-xs font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ease-soft-in leading-pro tracking-tight-soft bg-gradient-to-tl from-slate-600 to-slate-300 shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85">Close</button>
            <button type="button" data-toggle="modal" data-target="#import" className="inline-block px-8 py-2 m-1 mb-4 text-xs font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ease-soft-in leading-pro tracking-tight-soft bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85">Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
};
