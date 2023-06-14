import AuthLayout from '@/components/auth/Layout';

export default function Home() {
  return (
    <main className="flex w-full h-screen items-center justify-center">
      <AuthLayout>
        <h1>Hello World</h1>
      </AuthLayout>
    </main>
  );
}
