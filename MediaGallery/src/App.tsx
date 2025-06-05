import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";

import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import TopicPage from "./pages/TopicPage";
import ImageDetail from "./pages/ImageDetail.tsx";
import NavBar from "./components/UI/Nabvar.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <NavBar />

            <Routes>
              <Route path="/" element={<Home />} />
              {/* Captura Nature, Technology, etc */}
              <Route path="/search" element={<SearchPage />} />
              <Route path="/topic/:topicId" element={<TopicPage />} />
              <Route path="/photo/:id" element={<ImageDetail />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<p>404 - Página no encontrada</p>} />

              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
