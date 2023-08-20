import {React} from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
// import Register from './compnents/register'
import PartnerDashBoard from './compnents/partner-dashboard.jsx'
// import MemberDashBoard from './compnents/member-dashboard.jsx'
import HomeF from './compnents/home.jsx'
import Header from './compnents/flipkartHeader/headerF.jsx'
// import Cart from './compnents/cart';
import Cart from './compnents/flipkartCart/cartF.jsx';
import './App.css';
import Register from './compnents/flipkartRegistor/registerF.jsx';
import Home from './compnents/Dashboard/Home/Home.jsx';

function App() {
    return (
        <div>
        <Router>
        <Header /> 
            <Routes>
            <Route path="/" element={<HomeF />} />
            </Routes><Routes>
            <Route path="/register" element={<Register/>} />
            </Routes><Routes>
            <Route path="/cart" element={<Cart/>} />
            </Routes>
            <Routes>
            <Route path="/member-dashboard" element={<Home />} />
            </Routes>
            <Routes>
            <Route path="/partner-dashboard" element={<PartnerDashBoard/>} />
            </Routes>
        </Router>
        {/* <footer /> */}
        </div>
    );

}
  



export default App
