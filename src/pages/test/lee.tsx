import { LoginForm } from '@/features/auth/ui/LoginForm';
import logoLg from '@/shared/assets/images/logo-lg.png';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <>
      <main className="bg-background-secondary flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-120">
          <header className="mb-8 flex justify-center">
            <Image src={logoLg} alt="Coworkers Logo" className="object-contain" priority />
          </header>

          <LoginForm />
        </div>
      </main>
    </>
  );
}
