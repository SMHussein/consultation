import { Suspense } from 'react';
import SpinnerBig from './SpinnerBig';

export default function SuspenseComponent({ element }) {
  return <Suspense fallback={<SpinnerBig />}>{element}</Suspense>;
}
