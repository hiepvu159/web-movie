import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeUser from "./pages/HomeUser";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import MoviePage from "./pages/MoviePage";
import Layout from "./layout/LayoutUser/Layout";
import Admin from "./layout/LayoutAdmin/Admin";
import AllMovie from "./pages/AllMovie";
import Register from "./pages/Register";
import SearchResult from "./pages/SearchResult";
import CreateMovie from "./pages/ManageMovie/CreateMovie";
import Manage from "./pages/ManageMovie/Manage";
import EditMovie from "./pages/ManageMovie/EditMovie/EditMovie";
import ErrorPage from "./pages/ErrorPage";
import "./App.css";

function App() {
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth);
  const PrivateRoute = ({ children }) => {
    return currentUser.isAdmin ? children : <ErrorPage />;
  };

  const LoginRoute = ({ children }) => {
    return !isLoggedIn ? children : <ErrorPage />;
  };
  const ProtectedRoute = ({ children }) => {
    return !isLoggedIn || !currentUser.isAdmin ? children : <ErrorPage />;
  };
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomeUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <AllMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <LoginRoute>
                <Login />
              </LoginRoute>
            }
          />
          <Route
            path="/movies/:id/watch"
            element={
              <ProtectedRoute>
                <MoviePage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route element={<Admin />}>
          <Route
            path="/admin/movie/create"
            element={
              <PrivateRoute>
                <CreateMovie />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/movie/edit/:id"
            element={
              <PrivateRoute>
                <EditMovie />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/movie"
            element={
              <PrivateRoute>
                <Manage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
