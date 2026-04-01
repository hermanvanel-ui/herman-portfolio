"use client";

import dynamic from 'next/dynamic';
import Footer from '@/components/shared/Footer';

const HandTrackingDemo = dynamic(
  () => import('@/components/contact/HandTrackingDemo'),
  { ssr: false }
);

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden pt-[70px]">
      <HandTrackingDemo />
      <Footer />
    </main>
  );
}
