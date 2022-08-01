import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.less'
import Menu from "./components/menu";
import GuidelineList from "./views/guideline/list";
import ModifyGuideline from "./views/guideline/modify";

const App = () => {
  return (
    <Router>
      <section className="app-container">
        <section className="menu-container">
          <Menu></Menu>
        </section>
        <section className="content-container">
          <Routes>
            <Route path="/guideline/list" element={<GuidelineList />} />
            <Route path="/guideline/:type" element={<ModifyGuideline />} />
          </Routes>
        </section>
      </section>
    </Router >
  )
}

export default App
