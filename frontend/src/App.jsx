import { Routes, Route, Navigate } from "react-router-dom";
import Chat from './pages/Chat';
import Register from "./pages/register";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <ChatContextProvider user={user}>   {/* pass props down to all other components */}
      <NavBar />
      <Container>
        <Routes>
          <Route path='/' element={user ? <Chat /> : <Login />} />                    {/* Conditionals redirects based on user state */}
          <Route path='/register' element={user ? <Chat /> : <Register />} />
          <Route path='/login' element={user ? <Chat /> : <Login />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Container>
    </ChatContextProvider>
  );
}

export default App
