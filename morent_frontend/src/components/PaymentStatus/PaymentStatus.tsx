import { Link } from 'react-router-dom';

import { success, fail, cancel } from '../../assets/images';
import { Button } from '../ui/button';

export default function PaymentStatus({
  status,
}: {
  status: 'success' | 'fail' | 'canceled';
}) {
  const paymentStatusText =
    status === 'success'
      ? 'Thank You For Your Purchase'
      : status === 'canceled'
      ? 'You cancelled the payment'
      : 'There was an error making payment ';

  const paymentStatusImg =
    status === 'success' ? success : status === 'canceled' ? cancel : fail;

  const paymentStatusTitle =
    status === 'success'
      ? 'Payment Successful'
      : status === 'canceled'
      ? 'Payment Canceled '
      : 'Payment Failed';

  const paymentStatusPath =
    status === 'success' ? '/rented-car' : status === 'canceled' ? '/' : '';

  const paymentStatusButton =
    status === 'success'
      ? 'View Rented Car'
      : status === 'canceled'
      ? 'Back to Homepage '
      : 'Try Again';

  return (
    <div className='w-full h-full max-w-[500px] p-[50px] rounded-md max-h-[537px] bg-white dark:bg-gray-850'>
      <div className=' text-center w-full'>
        <p className='text-gray-400 pb-10 text-base md:text-lg'>
          {paymentStatusText}
        </p>
        <img
          className='mx-auto'
          src={paymentStatusImg}
          alt='payment status logo'
        />
        <div>
          <h1 className='heading-2-bold  md:heading-1-bold pt-10 text-gray-870 dark:text-white'>
            {paymentStatusTitle}
          </h1>
          <Button className='w-full bg-blue-500 hover:bg-blue-700 mt-10 text-white-100 p-bold'>
            <Link to={paymentStatusPath}>{paymentStatusButton}</Link>
          </Button>
          <p className='text-gray-400 pt-[50px] p-medium'>Generate Receipt</p>
        </div>
      </div>
    </div>
  );
}
