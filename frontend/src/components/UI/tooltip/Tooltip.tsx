import React, { useState } from 'react';
import cl from './Tooltip.module.css'; // Подключение файла с отделенными стилями

interface TooltipProps {
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleButtonClick = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div className={cl.tooltip_button} onClick={handleButtonClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 7 7" fill="none">
            <circle cx="3.5" cy="3.5" r="3.5" fill="#343333"/>
            <rect x="3" y="3" width="1" height="3" rx="0.5" fill="white"/>
            <rect x="3" y="1" width="1" height="1" rx="0.5" fill="white"/>
        </svg>
      </div>
      {isTooltipVisible && (
        <div className={cl.tooltip__content}>
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;