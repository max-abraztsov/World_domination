import React, { useState } from 'react';

interface TooltipProps {
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', zIndex: "20" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          display: 'inline-block',
          position: "relative",   
          top: "0",
          left: "20px", 

        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#55828B',
            color: '#fff',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '14px', lineHeight: '20px', display: 'block' }}>i</span>
        </div>
      </div>
      {isTooltipVisible && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#55828B',
            color: '#fff',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
