'use client';

import Masonry from 'react-masonry-css';

const breakpoints = {
  default: 3,
  768: 2,
  480: 1,
};

export function MasonryGrid({ children }: { children: React.ReactNode }) {
  return (
    <Masonry
      breakpointCols={breakpoints}
      className="masonry-grid"
      columnClassName="masonry-grid__col"
    >
      {children}
    </Masonry>
  );
}
