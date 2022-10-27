import React from 'react';
import RootLayout from '@/layouts/root/RootLayout';

export default function Layout(props: any) {
  return (
    <>
      <RootLayout {...props}>{props.children}</RootLayout>
    </>
  );
}
