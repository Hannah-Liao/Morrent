import { PaymentStatus } from '../components';

export default function Success() {
  return (
    <div className='w-full h-full flex justify-center'>
      <PaymentStatus status='success' />
    </div>
  );
}
