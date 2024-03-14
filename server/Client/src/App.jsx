import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import Cart from "./pages/Cart/Cart";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";
import SingleItem from "./pages/SingleItem/SingleItem";
import CustomDrawer from "./components/CustomDrawer/CustomDrawer";
import NavigationButtons from "./components/NavigationButtons/NavigationButtons";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  
  return (
    <>
    <CustomDrawer>
        <ul className="drawerCustomExmaple">
        
          <Cart/>
        </ul>
      </CustomDrawer>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="cart" element={<Cart />} />
      <Route path="about" element={<About />} />
      <Route path="items/:itemID" element={<SingleItem />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/adminPage" element={<AdminPage />} />
    </Routes>
    </>
  );
}

export default App;