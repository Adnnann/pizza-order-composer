import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/core/Header'
import Home from './components/Home';
import Orders from './components/Orders';

const MainRouter = () => {
    return(
        <Router>
        <Header />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/orders' element={<Orders />}></Route>
            </Routes>
        </Router>
    )
}

export default MainRouter