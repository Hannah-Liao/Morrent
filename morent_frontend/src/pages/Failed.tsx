import { PaymentStatus } from '../components';

export default function Failed() {
  return (
    <div className='w-full h-screen flex justify-center'>
      <PaymentStatus status='fail' />
    </div>
  );
}
