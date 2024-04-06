import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Page',
  description: 'This is the Pricing Page of my service',
  keywords: 'Pricing Page',
};

export default function PricingPage() {
  return (
    <>
      <span className='text-7xl'>Pricing Page</span>
    </>
  );
}
