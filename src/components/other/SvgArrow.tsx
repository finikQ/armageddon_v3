import React from "react";

interface SvgArrowProps {
  width: number;
}

export const SvgArrow: React.FC<SvgArrowProps> = ({ width }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`${width}`}
        height="6"
        viewBox={`0 0 ${width} 6`}
        fill="none"
      >
        <path
          d={`M0 3L5 5.88675L5 0.113249L0 3ZM${width} 3.00001L${
            width - 5
          } 0.113255L${width - 5} 5.88676L${width} 3.00001ZM4.5 3.5L${
            width - 4.5
          } 3.50001L${width - 4.5} 2.50001L4.5 2.5L4.5 3.5Z`}
          fill="white"
          fillOpacity="0.5"
        />
      </svg>
    </>
  );
};
