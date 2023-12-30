"use client"

import React, { useState, useRef } from 'react';

interface HighlightableTextProps {
  onTextSelect: (selectedText: string) => void;
}

const HighlightableText: React.FC<HighlightableTextProps> = ({ onTextSelect }) => {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const textContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    const newText = window.getSelection()?.toString() || '';
    if (newText) {
      const cursorPosition = {
        top: event.clientY,
        left: event.clientX,
      };
      setPopupPosition(cursorPosition);
      setSelectedText(newText);
      onTextSelect(newText);
    } else {
      setSelectedText(null);
    }
  };

  return (
    <div ref={textContainerRef} className="relative">
      <div
        onMouseUp={handleMouseUp}
        className="cursor-text p-4 text-white relative z-10"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus asperiores voluptate optio! Quas earum placeat animi doloremque iste cum cupiditate aliquid aperiam nemo. Excepturi, accusamus? Porro ab deserunt explicabo. Dolorum.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus nulla, nam earum accusantium reiciendis consectetur quasi iste rem vero? Beatae nam pariatur omnis corporis vitae nobis, laudantium vel aliquid facere?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non nobis, incidunt sunt laudantium qui sint corrupti praesentium obcaecati quisquam dolor ad magnam odio at inventore fugiat hic, modi numquam? Cumque!
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto earum repudiandae assumenda, molestiae debitis deserunt maiores minima fugit doloribus eius quod voluptates hic ducimus laboriosam tempore consectetur consequatur quis! Adipisci.
      </div>
      {selectedText && (
        <div
          className="highlighted-popup w-80 bg-white border p-4 shadow-md absolute"
          style={{ top: `${popupPosition.top}px`, left: `${popupPosition.left}px` }}
        >
          <p>You highlighted: {selectedText}</p>
        </div>
      )}
    </div>
  );
};

export default HighlightableText;


