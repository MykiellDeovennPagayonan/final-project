"use client"

import React from 'react';
import HighlightableText from '@/components/textHighlight';

const HomePage: React.FC = () => {
  const handleTextSelect = (selectedText: string) => {
    console.log('Selected Text:', selectedText);
    // You can perform additional actions based on the selected text
  };

  return (
    <div className='w-screen h-screen bg-gray-300'>
      <h1>Text Highlighting Example</h1>
      <HighlightableText onTextSelect={handleTextSelect} />
    </div>
  );
};

export default HomePage;
