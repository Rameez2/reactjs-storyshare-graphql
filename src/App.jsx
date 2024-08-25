import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Nav from './components/Nav';
import Login from './pages/Login';
import Profile from './pages/Profile';
import StoryPage from './pages/StoryPage';
import CreateStory from './pages/CreateStory';
import MyStories from './pages/MyStories';
import MyFavStories from './pages/MyFavStories';
import { AnimatePresence, motion } from 'framer-motion';
import Register from './pages/Register';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Nav />
      <AnimatedRoutes />
      <Footer/>
    </Router>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<PageWrapper><Home /></PageWrapper>} />
        <Route path='/login' element={<PageWrapper><Login /></PageWrapper>} />
        <Route path='/register' element={<PageWrapper><Register /></PageWrapper>} />
        <Route path='/profile/:id' element={<PageWrapper><Profile /></PageWrapper>} />
        {/* <Route path='/profile' element={<PageWrapper><Profile /></PageWrapper>} /> */}
        <Route path='/profile/my-stories' element={<PageWrapper><MyStories /></PageWrapper>} />
        <Route path='/profile/my-favorites-stories' element={<PageWrapper><MyFavStories /></PageWrapper>} />
        <Route path='/stories/:id' element={<PageWrapper><StoryPage /></PageWrapper>} />
        <Route path='/create-story' element={<PageWrapper><CreateStory /></PageWrapper>} />
        <Route path='*' element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

const PageWrapper = ({ children }) => {
  return (
    <motion.div 
      initial={{ opacity:0, scale:0.01, rotate: -180 }}
      animate={{ opacity:1, scale: 1, rotate: -0 }}
      exit={{ opacity: 0, scale: 0.01, rotate: -180 }}
      transition={{ duration: 0.4}}
    >
      {children}
    </motion.div>
  );
};

export default App;