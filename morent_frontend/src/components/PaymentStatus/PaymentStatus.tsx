import { Link } from 'react-router-dom';
import { statusData } from '../../constant';
import { Button } from '../ui/button';

export default function PaymentStatus({
  status,
}: {
  status: 'success' | 'fail' | 'canceled';
}) {
  const {
    text: paymentStatusText,
    img: paymentStatusImg,
    title: paymentStatusTitle,
    path: paymentStatusPath,
    button: paymentStatusButton,
  } = statusData[status];

  return (
    <div className='w-full h-full max-w-[500px] p-[50px] rounded-md max-h-[537px] bg-white dark:bg-gray-850'>
      <div className=' text-center w-full'>
        <p className='text-gray-400 pb-10 text-base md:text-lg capitalize'>
          {paymentStatusText}
        </p>
        <img
          className='mx-auto'
          src={paymentStatusImg}
          alt='payment status logo'
        />
        <div>
          <h1 className='heading-2-bold md:heading-1-bold pt-10 text-gray-870 dark:text-white'>
            {paymentStatusTitle}
          </h1>
          <Button className='w-full bg-blue-500 hover:bg-blue-700 mt-10 text-white-100 p-bold'>
            <Link to={paymentStatusPath}>{paymentStatusButton}</Link>
          </Button>
          <p className='text-gray-400 pt-[50px] p-medium'>
            {status !== 'success' ? 'Go Back' : 'Generate receipt'}
          </p>
        </div>
      </div>
    </div>
  );
}
