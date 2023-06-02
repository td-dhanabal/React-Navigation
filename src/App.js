// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Userlist from './components/userlist';
import Profile from './components/profile';
import Post from './components/post';
import Gallery from './components/gallery';
import Todo from './components/todo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Userlist />} />
        <Route path='/:id/profile' element={<Profile />} />
        <Route path='/:id/post' element={<Post />} />
        <Route path='/:id/gallery' element={<Gallery />} />
        <Route path='/:id/todo' element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
