import { addCarSchema } from '../components/CarSchema';
// import { z } from 'zod';

// const carName = z.array(addCarSchema);

// type carArray = z.infer<typeof carName>;

console.log(addCarSchema);
const AddCar = () => {
  return (
    <div className='w-full max-w-[852px] p-[24px] mx-auto bg-white borderRadius-lg'>
      <p className='text-gray-900 base-bold pb-[10px]'>Add a Car for Rent</p>
      <p className='text-gray-400 body-regular pb-[35px]'>
        Please enter your car info
      </p>
      <p className='heading-3-bold text-blue-500 pb-[35px]'>CAR INFO</p>

      <form>
        <div className='grid gap-6 mb-6 md:grid-cols-2'>
          <div>
            <label
              htmlFor='carTitle'
              className='block p-semibold mb-[16px] text-gray-900 dark:text-white'
            >
              Car Title
            </label>
            <input
              type='text'
              id='carTitle'
              className='bg-white-200 border-0 rounded-[7px]  border-gray-300 text-gray-900 text-sm   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Car Title'
              required
            />
          </div>
          <div>
            <label
              htmlFor='carType'
              className='block p-semibold mb-[16px] text-gray-900 dark:text-white'
            >
              Car Type
            </label>
            <input
              type='text'
              id='carType'
              className='bg-white-200 border-0 rounded-[7px]  border-gray-300 text-gray-900 text-sm   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Brand Name'
              required
            />
          </div>
          <div>
            <label
              htmlFor='rentPrice'
              className='block p-semibold mb-[16px] text-gray-900 dark:text-white'
            >
              Rent Price
            </label>
            <input
              type='number'
              id='rentPrice'
              className='bg-white-200 border-0 rounded-[7px]  border-gray-300 text-gray-900 text-sm   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Price in dollars'
              required
            />
          </div>
          <div>
            <label
              htmlFor='capacity'
              className='block p-semibold mb-[16px] text-gray-900 dark:text-white'
            >
              Capacity
            </label>
            <input
              type='number'
              id='capacity'
              className='bg-white-200 border-0 rounded-[7px]  border-gray-300 text-gray-900 text-sm   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Capacity in person'
              pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
              required
            />
          </div>
          <div>
            <label
              htmlFor='transmission'
              className='block p-semibold mb-[16px] text-gray-900 dark:text-white'
            >
              Transmission
            </label>
            <input
              type='url'
              id='transmission'
              className='bg-white-200 border-0 rounded-[7px]  border-gray-300 text-gray-900 text-sm   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Car Type'
              required
            />
          </div>
          <div>
            <label
              htmlFor='location'
              className='block p-semibold mb-[16px] text-gray-900 dark:text-white'
            >
              Location
            </label>
            <input
              type='text'
              id='location'
              className='bg-white-200 border-0 rounded-[7px]  border-gray-300 text-gray-900 text-sm   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Select your city'
              required
            />
          </div>

          <div>
            <label
              htmlFor='fuelCapicity'
              className='block p-semibold mb-[16px] text-gray-900 dark:text-white'
            >
              Fuel Capicity
            </label>
            <input
              type='number'
              id='fuelCapicity'
              className='bg-white-200 border-0 rounded-[7px]  border-gray-300 text-gray-900 text-sm   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Fuel Capicity in liters'
              required
            />
          </div>

          <div>
            <label
              htmlFor='shortDesc'
              className='block p-semibold mb-[16px] text-gray-900 dark:text-white'
            >
              Short Description
            </label>
            <input
              type='number'
              id='shortDesc'
              className='bg-white-200 border-0 rounded-[7px]  border-gray-300 text-gray-900 text-sm   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Enter short description'
              required
            />
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            className='text-white p-bold p-[20px] rounded-[10px] bg-blue-500 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300   w-full md:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-300 lg:justify-end'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
