import { PaymentStatus } from '../components';

export default function Canceled() {
  return (
    <div className='w-full h-full flex justify-center'>
      <PaymentStatus status='canceled' />
    </div>
  );
}
