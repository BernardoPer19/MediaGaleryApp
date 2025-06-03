import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";

import NavBar from "./components/Nabvar";

import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import TopicPage from "./pages/TopicPage";
import ImageDetail from "./pages/ImageDetail.tsx";

function App() {
  return (
    <>
      <SearchProvider>
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />
            {/* Captura Nature, Technology, etc */}
            <Route path="/search" element={<SearchPage />} />
            <Route path="/topic/:topicId" element={<TopicPage />} />
            <Route path="/photo/:id" element={<ImageDetail />} />
            <Route path="*" element={<p>404 - Página no encontrada</p>} />
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </>
  );
}

export default App;
