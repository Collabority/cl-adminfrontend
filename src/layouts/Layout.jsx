import { useDispatch } from "react-redux";
import instance from "../lib/axios";
import { logout , loginSuccess} from "../redux/authSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAuthStatus() {
      try {
        const response = await instance.get("/seller/getSeller");
        if (!response) {
          dispatch(logout());
          throw new Error("Seller Not authenticated");
        }
        console.log(response.data);
        dispatch(loginSuccess({ seller: response.data.data }));
      } catch (error) {
        console.log("failed to maintain state: ", error.message);
      } finally {
        setLoading(false);
      }
    }

    getAuthStatus();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center overflow-hidden">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="" aria-label="Main content">
        <Outlet />
      </main>
      <div className="fixed top-10 right-4">
        <ModeToggle />
      </div>
    </>
  );
};

export default Layout;
