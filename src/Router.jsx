import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Create from './Create';
import Table from './Table';

function AppRouter() {
    return (
        <Router>
            <div>
                <header className="d-flex py-2 bg-body-tertiary border-bottom sticky-top justify-content-center">
                    <Link to="/" className="navbar-brand fs-2 fw-bold" >
                        Eventi<span className="text-primary">fy</span>
                    </Link>
                </header>

                <section className="container">
                    <Routes>
                        <Route path='/' element={<Table/>}/>
                        <Route path='/create' element={<Create/>} />
                    </Routes>
                </section>
            </div>
        </Router>
    );
}

export default AppRouter;
