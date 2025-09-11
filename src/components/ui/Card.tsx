import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  padding?: number;
};

export const Card: React.FC<Props> = ({ padding = 24, style, ...props }) => {
  return <div {...props} className={`card ${props.className ?? ''}`} style={{ padding, ...style }} />;
};


