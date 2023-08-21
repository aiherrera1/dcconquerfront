import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import About from './components/About';
import Rules from './components/Rules';
import Ranking from './components/Ranking';
import Documentation from './components/Documentation';
import Registration from './components/Registration';
import Profile from './components/Profile';
import CreateMatch from './components/CreateMatch';
import Match from './components/Match';
import WaitingRoom from './components/WaitingRoom';
import WaitingRoomHost from './components/WaitingRoomHost';
import AvailableMatches from './components/AvailableMatches';
import Login from './components/Login';
import AdminPlayer from './components/AdminPlayer';
import Error from './components/Error';
import CookieAuthProvider from './contexts/cookieAuth';
import AdminGameMatch from './components/AdminGameMatch.jsx';
import AdminPlayersMatch from './components/AdminPlayersMatch';
import AdminRequests from './components/AdminRequests';
import TokenAuthProvider from './contexts/tokenAuth';

function Routing() {
  return (
    <BrowserRouter>
      <CookieAuthProvider>
        <TokenAuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/match/:id" element={<Match />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/create_match" element={<CreateMatch />} />
            <Route path="/waiting_room/:id" element={<WaitingRoom />} />
            <Route
              path="/waiting_room_host/:id"
              element={<WaitingRoomHost />}
            />
            <Route path="/available_matches" element={<AvailableMatches />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin_player" element={<AdminPlayer />} />
            <Route path="/admin_requests" element={<AdminRequests />} />
            <Route path="/admin_game_match" element={<AdminGameMatch />} />
            <Route
              path="/admin_players_match"
              element={<AdminPlayersMatch />}
            />
            <Route path={'/*'} element={<Error />} />
          </Routes>
        </TokenAuthProvider>
      </CookieAuthProvider>
    </BrowserRouter>
  );
}

export default Routing;
