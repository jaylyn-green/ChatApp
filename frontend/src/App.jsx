import { Routes, Route, Navigate } from "react-router-dom";
import Chat from './pages/Chat';
import Register from "./pages/register";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path='/' element={user ? <Chat /> : <Login />} />                    {/* Conditional redirects if user isn't logged in */}
          <Route path='/register' element={user ? <Chat /> : <Register />} />
          <Route path='/login' element={user ? <Chat /> : <Login />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Container>
    </>
  );
}

export default App
