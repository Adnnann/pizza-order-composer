import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/core/Header'
import Home from './components/cart/Home';
import Orders from './components/cart/Orders';
import Order from './components/order/Order'
import Signin from './components/user/Signin';
import Signup from './components/user/Signup';

const MainRouter = () => {
    return(
        <Router>
        <Header />
        <Signin />
        <Signup />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/orders' element={<Orders />}></Route>
                <Route path='/order' element={<Order />}></Route>
            </Routes>
        </Router>
    )
}

export default MainRouter