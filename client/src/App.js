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
import ManageUser from "./pages/User/ManageUser";
import EditUser from "./pages/User/Edit";
import CreateUser from "./pages/User/CreateUser";

function App() {
  const currentUser = useSelector((state) => state.auth.currentUser);

  const PrivateRoute = ({ children }) => {
    return currentUser && currentUser.isAdmin ? children : <ErrorPage />;
  };
  const LoginRoute = ({ children }) => {
    return !currentUser ? children : <ErrorPage />;
  };
  const ProtectedRoute = ({ children }) => {
    return !currentUser || !currentUser.isAdmin ? children : <ErrorPage />;
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
              <LoginRoute>
                <Register />
              </LoginRoute>
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
          <Route
            path="/admin/user"
            element={
              <PrivateRoute>
                <ManageUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/user/edit/:id"
            element={
              <PrivateRoute>
                <EditUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/user/create"
            element={
              <PrivateRoute>
                <CreateUser />
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
