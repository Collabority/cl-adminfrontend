import "./App.css";

import { Suspense, lazy, useContext } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Loader from "./components/Loader";
import { AppContext } from "./context/AppContext";


// Lazy loaded components
const Navbar = lazy(() => import("./components/Navbar"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const BlogManagement = lazy(() => import("./pages/BlogManagement"));
const CreateBlogPost = lazy(() => import("./pages/CreateBlogPost"));
const EditBlogPost = lazy(()=> import("./pages/EditBlogPost"))
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"))
const Reviews = lazy(() => import("./pages/Reviews"));
const AddReview = lazy(() => import("./pages/AddReview"));
const ContactQueries = lazy(() => import("./pages/ContactQueries"));
const ServicesManagement = lazy(() => import("./pages/ServicesManagement"));
const CreateService = lazy(() => import("./pages/CreateService"));
const EditService = lazy(() => import("./pages/EditService"));
const Applications = lazy(() => import("./pages/Careers/Applications"));
const CreateJob = lazy(() => import("./pages/Careers/CreateJob"));
const NewsletterManagement = lazy(() => import("./pages/NewsletterManagement"));
const AddNewUser = lazy(() => import("./pages/UserManagement/AddNewUser"));
const UserManagementPage = lazy(() => import("./pages/UserManagement/UserManagementPage"));
const Signup = lazy(()=> import("./pages/Signup"))


const App = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const {darkMode} = useContext(AppContext)

   // Check if current route is "/login"
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/sign-up"

  return (
    <div className={`h-screen flex flex-col ${darkMode && "dark"}`}>
      {!isLoginPage && !isSignupPage && <Navbar />}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with fixed height and no scroll */}

         {!isLoginPage && !isSignupPage && <Sidebar />}

        {/* Content area that scrolls if it overflows */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/blog">
                  <Route index element={<BlogManagement />} />
                   <Route path="create-blog-post" element={<CreateBlogPost />} />
                   <Route path="edit-blog-post/:id" element={<EditBlogPost/>}/>
              </Route>
              <Route path="/careers">
              <Route index element={<Applications />} />
              <Route path="/careers/create" element={<CreateJob />} />
              </Route>
              <Route path="/users">
              <Route index element={<UserManagementPage />} />
              <Route path="/users/roles" element={<AddNewUser />} />       
            </Route>
              <Route path="/services" element={<ServicesManagement />} />
              <Route path="/services/create" element={<CreateService />} />  
              <Route path="/services/edit/:id" element={<EditService />} />
              <Route path="/newsletter" element={<NewsletterManagement />} />

              <Route path="/login" element={<Login/>} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/reviews/add" element={<AddReview />} />
              <Route path="/contact" element={<ContactQueries />} />
              
             
              <Route path="/sign-up" element={<Signup/>} />
              <Route path="*" element={<NotFound />} />
            
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};


export default App;


