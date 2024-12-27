import BookAppointment from "./Components/BookAppointment";
import CNICPage from "./Components/CNIC";
import LearnMorePage from "./Components/LearnMorePage";
import PoliceLogo from "./Components/PoliceLogo";
import ViewPrisonerDetails from "./Components/ViewPrisonerDetails";
import WelcomePage from "./Components/Welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <PoliceLogo />
      <Router>
        <Routes>
          <Route path="/" element={<CNICPage />} />
          <Route path="/learn-more" element={<LearnMorePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/view-prisoner-details" element={<ViewPrisonerDetails />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
