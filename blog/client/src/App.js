import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import HomePage from "./pages/HomePage/HomePage";
import Register from "./pages/Auth/Register.jsx";
import AddPostPage from "./pages/AddPostPage/AddPostPage.jsx";
import { ArticlePage } from "./pages/DetailPage/DetailPage.jsx";
function App() {
  return (
      <div className="App">
        <Header />
        <main>
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/registr" element={<Register />} />
              <Route path="/addPost" element={<AddPostPage />} />
              <Route path="/post/:id" element={<ArticlePage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </main>
      </div>
  );
}

export default App;