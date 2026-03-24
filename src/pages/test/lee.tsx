import { SignUpForm } from '@/features/auth/ui/SignUpForm';
import logoLg from '@/shared/assets/images/logo-lg.png';
import Image from 'next/image';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <main className="bg-background-secondary flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-120">
        <header className="mb-8 flex justify-center">
          <Link href="/">
            <Image src={logoLg} alt="Coworkers Logo" className="object-contain" priority />
          </Link>
        </header>
        <SignUpForm />
      </div>
    </main>
  );
}
