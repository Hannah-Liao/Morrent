import { Button } from '../ui/button';
import { spinner } from '../../assets/icons';

interface ButtonWithSpinnerProps {
  isLoading: boolean;
  loadingText: string;
  text: string;
}

const ButtonWithSpinner: React.FC<ButtonWithSpinnerProps> = ({
  isLoading,
  loadingText,
  text,
}) => {
  // Scroll To Top Function
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Button type='submit' className='signInButton' onClick={goToTop}>
        {isLoading && (
          <img
            src={spinner}
            alt='spinner'
            className='inline w-6 h-6 mr-3 text-white animate-spin'
            aria-hidden='true'
          />
        )}
        {isLoading ? loadingText : text}
      </Button>
    </>
  );
};

export default ButtonWithSpinner;
