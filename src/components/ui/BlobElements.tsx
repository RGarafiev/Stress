import React from 'react';

export const BlobLeft: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    width="94" 
    height="499" 
    viewBox="0 0 94 499" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M-304.536 377.921C-240.03 512.501 -164.198 512.255 -68.1316 482.424C27.9353 452.593 25.8312 380.508 65.9516 327.156C106.072 273.805 117.803 120.649 -3.89819 37.2137C-186.355 -87.8736 -227.761 141.901 -239.822 187.621C-251.883 233.34 -385.169 209.697 -304.536 377.921Z" 
      fill="#ECFDFF"
    />
  </svg>
);

export const BlobRight: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    width="172" 
    height="499" 
    viewBox="0 0 172 499" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M25.8556 377.744C90.3615 512.323 166.193 512.078 262.26 482.246C358.327 452.415 356.223 380.33 396.343 326.978C436.464 273.627 448.195 120.471 326.494 37.0359C144.037 -88.0513 102.63 141.724 90.5697 187.443C78.509 233.162 -54.7768 209.519 25.8556 377.744Z" 
      fill="#ECFDFF"
    />
  </svg>
);

export const BlobCenter: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    width="941" 
    height="863" 
    viewBox="0 0 941 863" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M620.477 851.141C909.138 797.072 947.293 652.807 939.518 455.011C931.744 257.215 793.654 224.501 712.678 121.068C631.702 17.6351 346.561 -82.6678 125.985 106.166C-204.707 389.269 210.957 585 291.716 631.21C372.476 677.421 259.652 918.727 620.477 851.141Z" 
      fill="#22D4EA"
    />
  </svg>
);

export const BlobBehindPerson: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <svg 
    width="292" 
    height="360" 
    viewBox="0 0 292 360" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path 
      d="M166.195 13.019C67.6002 -22.5477 34.98 18.925 9.17151 86.9799C-16.637 155.035 22.1607 191.776 32.8763 241.691C43.5919 291.606 119.027 378.501 215.44 356.003C359.985 322.274 257.094 178.929 238.272 148.323C219.45 117.718 289.439 57.4773 166.195 13.019Z" 
      fill="#22D4EA"
    />
  </svg>
);

// Mobile-specific smaller blob behind the person
export const BlobBehindPersonMobile: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <svg
    width="194"
    height="239"
    viewBox="0 0 194 239"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path d="M110.794 8.6446C45.3272 -14.9717 23.6675 12.5662 6.5306 57.7547C-10.6063 102.943 15.1554 127.339 22.2706 160.483C29.3857 193.627 79.4744 251.325 143.493 236.386C239.471 213.99 171.151 118.809 158.654 98.4868C146.156 78.1647 192.628 38.1649 110.794 8.6446Z" fill="#22D4EA"/>
  </svg>
);

export const PersonOutline: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <svg
    width="418"
    height="449"
    viewBox="0 0 418 449"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M400.754 339.675C397.751 406.6 352.486 417.071 331.264 422.48C310.043 427.889 239.804 440.706 231.815 442.037C221.828 443.702 194.781 453.272 116.553 431.218C67.0365 406.668 30.0029 400.01 11.2781 298.896C-7.44669 197.782 8.36546 115.809 47.8957 64.628C57.3101 52.4389 94.4995 4.29226 258.03 3.46005C388.854 2.79428 416.844 112.48 414.486 167.406C400.754 306.386 403.667 274.762 400.754 339.675Z"
      stroke="#1EE3FB"
      strokeWidth="5.8255"
    />
  </svg>
);

export const AboutLightBlob: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <svg
    width="750"
    height="509"
    viewBox="0 0 750 509"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M5.71089 252.727C-26.0604 422.358 78.0181 469.585 236.217 501.063C394.415 532.54 455.873 461.99 558.44 435.86C661.008 409.731 813.773 269.976 721.561 113.668C583.314 -120.671 321.52 74.0979 264.195 110.46C206.87 146.821 45.425 40.6896 5.71089 252.727Z"
      fill="#ECFDFF"
    />
  </svg>
);

export const PageBlobs: React.FC = () => {
  return (
    <div className="page-blobs">
      <BlobLeft className="blob-left" />
      <BlobRight className="blob-right" />
    </div>
  );
};
