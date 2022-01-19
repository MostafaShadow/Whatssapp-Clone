import "../styles/globals.css";
import { auth} from "../features/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Login";
import Loading from "./Loading";
import Layout from "../components/Layout";
import { AuthProvider } from "../features/Auth";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return <Loading />;
  if (!user) return <Login />;

  return (
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
  );
}

export default MyApp;
