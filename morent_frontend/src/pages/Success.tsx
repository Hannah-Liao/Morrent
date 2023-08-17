import { PaymentStatus } from '../components';

export default function Success() {
  return (
    <div className='w-full h-screen flex justify-center'>
      <PaymentStatus status='success' />
    </div>
  );
}
