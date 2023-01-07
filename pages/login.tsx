import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

const Login: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    return (
      <>
        Signed in <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <button
      onClick={async () => {
        await signIn("github");
        router.push("/");
      }}
    >
      Log in with GitHub
    </button>
  );
};

export default Login;
