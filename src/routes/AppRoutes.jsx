import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loader from "../components/Loader";
import AuthLayout from "../layouts/AuthLayout";
import EditReview from "../pages/EditReview";

// General
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Blog
const BlogManagement = lazy(() => import("../pages/BlogManagement"));
const CreateBlogPost = lazy(() => import("../pages/CreateBlogPost"));
const EditBlogPost = lazy(() => import("../pages/EditBlogPost"));

// Reviews
const Reviews = lazy(() => import("../pages/Reviews"));
const AddReview = lazy(() => import("../pages/AddReview"));

// Contact
const ContactQueries = lazy(() => import("../pages/ContactQueries"));

// Services
const ServicesManagement = lazy(() => import("../pages/ServicesManagement"));
const CreateService = lazy(() => import("../pages/CreateService"));
const EditService = lazy(() => import("../pages/EditService"));

// Careers
const Applications = lazy(() => import("../pages/Careers/Applications"));
const CreateJob = lazy(() => import("../pages/Careers/CreateJob"));

// Newsletter
const NewsletterManagement = lazy(() => import("../pages/NewsletterManagement"));

// Users
const UserManagementPage = lazy(() => import("../pages/UserManagement/UserManagementPage"));
const AddNewUser = lazy(() => import("../pages/UserManagement/AddNewUser"));

// Create campaign 
const CreateCampaign = lazy(() => import("../pages/CreateCampaign"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* 🔐 Protected Routes */}
        <Route element={<AuthLayout authenticationReq={true} />}>
          <Route path="/" element={<Dashboard />} />

          {/* Blog Routes */}
          <Route path="/blog">
            <Route index element={<BlogManagement />} />
            <Route path="create-blog-post" element={<CreateBlogPost />} />
            <Route path="edit-blog-post/:id" element={<EditBlogPost />} />
          </Route>

          {/* Career Routes */}
          <Route path="/careers">
            <Route index element={<Applications />} />
            <Route path="create" element={<CreateJob />} />
          </Route>

          {/* User Routes - UPDATED HERE */}
          <Route path="/users">
            <Route index element={<UserManagementPage />} />
            {/* Changed from 'roles' to 'create' to match your Link */}
            <Route path="create" element={<AddNewUser />} /> 
          </Route>

          {/* Service Routes */}
          <Route path="/services">
            <Route index element={<ServicesManagement />} />
            <Route path="create" element={<CreateService />} />
            <Route path="edit/:id" element={<EditService />} />
          </Route>

          {/* Reviews */}
          <Route path="/reviews">
            <Route index element={<Reviews />} />
            <Route path="add" element={<AddReview />} />
            <Route path="edit/:id" element={<EditReview />} />
          </Route>

          <Route path="/createCampaign" element={<CreateCampaign />} />

          {/* Contact */}
          <Route path="/contact" element={<ContactQueries />} />

          {/* Newsletter */}
          <Route path="/newsletter" element={<NewsletterManagement />} />
        </Route>

        {/* 🪪 Public Routes */}
        <Route path="/login" element={
          <AuthLayout authenticationReq={false}>
            <Login />
          </AuthLayout>
        } />

        <Route path="/sign-up" element={
          <AuthLayout authenticationReq={false}>
            <Signup />
          </AuthLayout>
        } />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;