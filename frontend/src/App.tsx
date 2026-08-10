import './App.css'
import SignupPage from '@/pages/signup/SignupPage'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SigninPage from "@/pages/signin/SigninPage";
import Dashboard from "@/pages/dashboard/Dashboard";
import Home from "@/pages/home/Home";
import Posts from '@/pages/posts/Posts';
import CreatePost from '@/pages/create_post/CreatePost';
import CreateSite from '@/pages/create_site/CreateSite'
import EditSite from '@/pages/edit_site/EditSite';
import SiteDetails from '@/pages/site_details/SiteDetails';
import PostDetails from '@/pages/post_details/PostDetails';
import Layout from '@/pages/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SigninPage />} />
        <Route index element={<Home />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/create" element={<CreatePost />} />
          <Route path="posts/:postId" element={<PostDetails />} />
          <Route path="sites/create" element={<CreateSite />} />
          <Route path="sites/:siteId" element={<SiteDetails />} />
          <Route path="sites/:siteId/edit" element={<EditSite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
