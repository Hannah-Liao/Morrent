import { Link } from 'react-router-dom';

import { Logo } from './index';
import { footerLinks } from '../constant/index';
import getCurrentYear from '../utils/getCurrentYear';

const Footer = () => {
  return (
    <footer className='bg-[#F6F7F9] sm:bg-white sm:h-[30rem] grid grid-cols-1 sm:grid-cols-5 gap-[3rem] pt-[5rem] pb-[1.5rem] sm:pb-[3.75rem] px-[1.5rem] sm:px-[3.75rem]'>
      <div className='col-span-1 sm:col-span-3 flex flex-col items-start gap-[1rem] w-[18.25rem] h-[7.75rem]'>
        <Logo />
        <p className='text-[#13131399] text-[0.75rem] sm:text-[1rem] font-[500] leading-[200%] tracking-[-0.01rem]'>
          Our vision is to provide convenience and help increase your sales
          business.
        </p>
      </div>

      <div className='col-span-1 sm:col-span-2 flex flex-wrap gap-[3.75rem] shrink-0 '>
        {footerLinks.map((link, i) => (
          <div key={i}>
            <h3 className='text-[#424B5C] text-[1.25rem] font-[600] leading-[120%] pb-[1rem] sm:pb-[1.5rem]'>
              {link.title}
            </h3>
            <div className='flex flex-col gap-4 text-[#13131399] text-[1rem] font-[500] leading-[120%] h-[9rem]'>
              {link.links.map((link, i) => (
                <Link key={i} to={link.linkTitle}>
                  {link.linkTitle}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='hidden sm:block col-span-1 sm:col-span-5 bg-[#C3D4E9] w-[82.5rem] h-[0.0625rem]'></div>

      <div className='flex flex-wrap-reverse gap-[2rem] sm:justify-between col-span-1 sm:col-span-5 text-[#424B5C] text-[0.75rem] sm:text-[1rem] font-[600] leading-[200%] tracking-[-0.01rem]'>
        <p>©{getCurrentYear()} MORENT. All rights reserved</p>
        <div className='flex gap-[3.75rem]'>
          <Link to=''>Privacy & Policy</Link>
          <Link to=''>Terms & Condition</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
