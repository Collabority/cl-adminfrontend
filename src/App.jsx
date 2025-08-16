import "./App.css";
import Loader from "./components/Loader";
import AppRoutes from "./routes/AppRoutes";
import { useAuthCheck } from "./hooks/useAuthCheck";

const App = () => {
  const { loading, error } = useAuthCheck();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center overflow-hidden ">
        <Loader />
      </div>
    );
  }

  return <AppRoutes />;
};

export default App;
