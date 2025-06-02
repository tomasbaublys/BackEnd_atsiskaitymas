import { Route, Routes } from "react-router";
import MainOutlet from "./components/outlets/MainOutlet";
import Home from "./components/pages/Home";
import AllBooks from "./components/pages/AllBooks";
import BookDetails from "./components/pages/BookDetails";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<MainOutlet />}>
          <Route index element={<Home />} />
          <Route path="books" element={<AllBooks />} />
          <Route path="books/:_id" element={<BookDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
