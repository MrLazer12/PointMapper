import HomePage from "./pages/HomePage.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import InfoPage from "./pages/cardInfo.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/info" element={<InfoPage />} />
            </Routes>
        </Router>
    );
};

export default App;
