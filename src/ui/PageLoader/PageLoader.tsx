import React from 'react';
import Spinner from '@/ui/Spinner';

// Стили
import './PageLoader.scss';

const PageLoader: React.FC = () => {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <Spinner size="lg" />
    </div>
  );
};

export default PageLoader;
