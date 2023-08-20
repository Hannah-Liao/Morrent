import { PaymentStatus } from '../components';

export default function Canceled() {
  return (
    <div className='w-full h-screen flex justify-center'>
      <PaymentStatus status='canceled' />
    </div>
  );
}
