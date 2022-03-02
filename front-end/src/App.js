import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import Navbar from './components/navbar/Navbar';
import Books from './components/pages/books/Books';
import Students from './components/pages/students/Students';
import StudentHistory from './components/pages/studentHistory/StudentHistory';
import BookHistory from './components/pages/bookHistory/BookHistory';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBooks } from './store/slices/books/actions';
import { fetchStudents } from './store/slices/students/actions';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBooks(8, 1))
    dispatch(fetchStudents())
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:studentId" element={<StudentHistory />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<BookHistory />} />
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
