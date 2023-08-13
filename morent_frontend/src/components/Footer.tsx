import { Link } from 'react-router-dom';

import { Logo } from './index';
import { footerLinks } from '../constant/index';
import getCurrentYear from '../utils/getCurrentYear';

const Footer = () => {
  return (
    <footer className='bg-white-200 sm:bg-white grid grid-cols-1 sm:grid-cols-5 gap-12 pt-20 pb-6 sm:pb-[3.75rem] px-6 sm:px-[3.75rem]'>
      <div className='col-span-1 sm:col-span-3 flex flex-col items-start gap-4 w-[18.25rem] h-[7.75rem]'>
        <Logo />
        <p className='text-gray-400 small-medium sm:p-medium leading-[200%] tracking-[-0.01rem]'>
          Our vision is to provide convenience and help increase your sales
          business.
        </p>
      </div>

      <div className='col-span-1 sm:col-span-2 flex flex-wrap gap-[3.75rem] shrink-0 '>
        {footerLinks.map((link, i) => (
          <div key={i}>
            <h3 className='text-gray-800 base-semibold leading-[120%] pb-4 sm:pb-6'>
              {link.title}
            </h3>
            <div className='flex flex-col gap-4 text-gray-400 p-medium leading-[120%] h-36'>
              {link.links.map((link, i) => (
                <Link key={i} to={link.linkTitle}>
                  {link.linkTitle}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='hidden sm:block col-span-1 sm:col-span-5 bg-blue-50 w-full h-[0.0625rem]'></div>

      <div className='flex flex-wrap-reverse gap-8 sm:justify-between col-span-1 sm:col-span-5 text-gray-800 p-medium sm:p-semibold leading-[200%] tracking-[-0.01rem]'>
        <p>©{getCurrentYear()} MORENT. All rights reserved</p>
        <div className='flex justify-between w-full sm:w-fit gap-[3.75rem]'>
          <Link to=''>Privacy & Policy</Link>
          <Link to=''>Terms & Condition</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
