import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrincipalLayout } from "./layout/PrincipalLayout";
import { Home } from "./pages/Home";
import { DrugDetails } from "./components/DrugDetails";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrincipalLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/drug/:id" element={<DrugDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
