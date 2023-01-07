import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

const Login: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    return (
      <>
        Signed in! <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <div className="grid h-screen place-items-center">
      <button
        onClick={async () => {
          await signIn("auth0");
        }}
        className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Sign In with Auth0
      </button>
    </div>
  );
};

export default Login;
