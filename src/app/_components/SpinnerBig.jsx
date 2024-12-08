import { BiLoaderAlt } from 'react-icons/bi';

const SpinnerBig = () => {
    return (
        <div className='absolute left-1/2  transform -translate-x-1/2 '>
            <BiLoaderAlt className='w-12 h-12 animate-spin' style={{ animationDuration: '1.5s' }} />
        </div>
    );
};

export default SpinnerBig;
