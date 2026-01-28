import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import { useEffect } from 'react';
import { socketService } from './services/socket'

function App() {

  useEffect(() => {
    socketService.connect();

    const handleConnect = () => {
      console.log('WS: Connected');
    }

    socketService.onConnect(handleConnect)

    return() => {
      socketService.disconnect();
    };
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;