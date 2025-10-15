import { BiLoaderAlt } from 'react-icons/bi';

const SpinnerMini = () => {
  return (
    <BiLoaderAlt
      aria-label="Loading"
      className="w-6 h-6 animate-spin"
      style={{ animationDuration: '1.5s' }}
    />
  );
};

export default SpinnerMini;
