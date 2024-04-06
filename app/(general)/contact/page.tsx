import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Page',
  description: 'This is the Contact Page of the enterprise',
  keywords: ['contact page'],
};

export default function ContactPage() {
  return (
    <>
      <span className='text-7xl'>Contact Page</span>
    </>
  );
}
