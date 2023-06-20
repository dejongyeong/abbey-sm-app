import DshLayout from '@/components/dashboard/Layout';
import { checkUserSessionSsr } from '@/services/auth/check-session-ssr';
import { getLoginUser } from '@/services/user/get-login-user';
import { GetServerSidePropsContext } from 'next';
import { ReactNode } from 'react';

export default function Home() {
  return (
    <main className="w-full h-screen p-8">
      <h1>Dashboard</h1>
    </main>
  );
}

Home.getLayout = function getLayout(page: ReactNode, pageProps: any) {
  return (
    <DshLayout pageProps={pageProps} pageTitle="Dashboard">
      {page}
    </DshLayout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await checkUserSessionSsr(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  // get current user
  const user = await getLoginUser(session.user.id);

  return {
    props: {
      initialSession: session,
      uid: session.user.id,
      user: user,
    },
  };
};

// import ErrorFallback from '@/components/error/ErrorFallback';
// import { useRouter } from 'next/router';

// const CustomErrorComponent = () => {
//   const router = useRouter();

//   const onRetry = () => {
//     router.reload();
//   };

//   const onGoHome = () => {
//     router.push('/');
//   };

//   return <ErrorFallback onRetry={onRetry} onGoHome={onGoHome} />;
// };

// export default CustomErrorComponent;
