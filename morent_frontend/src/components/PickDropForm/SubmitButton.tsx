import { Button } from '../ui/button';
import { searchWhite } from '../../assets/icons';

export default function SubmitButton({ isShow }: { isShow: boolean }) {
  return (
    <div className={`${!isShow ? 'w-full lg:w-[40px]' : 'w-full lg:w-auto'}`}>
      <Button
        type='submit'
        className={`bg-blue-500 mt-1  hover:bg-blue-700 w-full flex items-center gap-2 ${
          isShow ? 'px-10' : 'px-3'
        } rounded-md text-white`}
      >
        <img
          className='pt-0.5'
          src={searchWhite}
          alt='search icon'
          width={15}
        />{' '}
        <span className={isShow ? 'block' : 'lg:hidden'}>Search</span>
      </Button>
    </div>
  );
}
