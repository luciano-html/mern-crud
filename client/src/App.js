import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AuthProvider } from "./context/auth.context";

function App() {
  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Hola</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tareas" element={<h1>Tareas</h1>} />
          <Route path="/crear-tareas/" element={<h1>Crear tarea</h1>} />
          <Route path="/tareas/:id" element={<h1>Actualizar tarea</h1>} />
          <Route path="/profile" element={<h1>Perfil</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;