import React, { useState } from 'react'

import './Logo.scss'

const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const ImageLogo = ({ color, rotation }) => (
  <svg xmlns="http://www.w3.org/2000/svg"
       className={rotation ? 'rotating' : 'normal'}
       width="50px"
       height="50px"
       viewBox="0 0 32 32"
       version="1.1"
  >
    <g>
      <path
        style={{
          stroke: 'none',
          fillRule: 'nonzero',
          fill: color,
          fillOpacity: 1,
        }}
        d="M 16 3.71875 L 15.375 4.21875 L 7.125 10.625 L 6.875 10.84375 L 6.78125 11.15625 L 4.03125 21.25 L 3.8125 22.03125 L 16 28.125 L 28.1875 22.03125 L 27.96875 21.25 L 25.21875 11.15625 L 25.125 10.84375 L 24.875 10.625 L 16.625 4.21875 Z M 15 7.0625 L 15 10 L 11.21875 10 Z M 17 7.0625 L 20.78125 10 L 17 10 Z M 9.0625 12 L 14 12 L 10.40625 16.78125 Z M 18 12 L 22.9375 12 L 21.59375 16.78125 Z M 16 12.6875 L 20 18 L 12 18 Z M 7.8125 15 L 8.8125 18.5 L 6.5625 19.625 Z M 24.1875 15 L 25.4375 19.625 L 23.1875 18.5 Z M 12 20 L 20 20 L 16 25.3125 Z M 9.6875 20.28125 L 12.625 24.1875 L 7.25 21.5 Z M 22.3125 20.28125 L 24.75 21.5 L 19.375 24.1875 Z M 22.3125 20.28125 "
      />
    </g>
  </svg>
)

export const Logo = () => {
  let [color, changeColor] = useState('#000')
  let [rotation, setRotation] = useState(false)
  return (
    <div id="logo"
       onMouseEnter={() => changeColor(randomColor())}
       onClick={() => {
         setRotation(true)
         setTimeout(() => {
           setRotation(false)
           changeColor(randomColor())
         }, 500)
       }}
    >
      <ImageLogo color={color} rotation={rotation}/>
      <div className="caption" style={{ color }}>Quenta</div>
    </div>
  )
}