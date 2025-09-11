import React from 'react';

type GridProps = React.HTMLAttributes<HTMLDivElement> & { gap?: number };
export const Grid: React.FC<GridProps> = ({ gap, style, ...props }) => (
  <div {...props} className={`grid ${props.className ?? ''}`} style={{ gap, ...style }} />
);

type Span12 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Span4 = 1 | 2 | 3 | 4;
type ColProps = React.HTMLAttributes<HTMLDivElement> & { span: Span12; smSpan?: Span4 };
export const Col: React.FC<ColProps> = ({ span, smSpan, className, style, ...props }) => {
  const smClass = smSpan ? ` sm:col-span-${smSpan}` : '';
  return (
    <div
      {...props}
      className={`${smClass} ${className ?? ''}`}
      style={{ gridColumn: `span ${span}`, ...style }}
    />
  );
};


