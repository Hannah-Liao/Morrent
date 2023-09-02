import { PaymentStatus } from '../components';

export default function Failed() {
  return (
    <div className='w-full h-full flex justify-center'>
      <PaymentStatus status='fail' />
    </div>
  );
}
