import styles from "./App.module.css";
import NavBar from './components/NavBar';
import {Route, Switch} from 'react-router-dom';
import {Container} from "react-bootstrap";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import './api/axiosDefaults'
import AlertPopup from "./components/AlertPopup";
import BookCreateForm from "./pages/books/BookCreateForm";
import BookPage from "./pages/books/BookPage";
import Book from "./pages/books/Book";
import BookEditForm from "./pages/books/BookEditForm";


function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <AlertPopup />
        <Switch>
          <Route exact path="/" render={() => <Book />} />
          <Route exact path="/mybooks" render={() => <h1>My Books</h1>} />
          <Route exact path="/signin" render={() => <SignInForm /> } />
          <Route exact path="/signup" render={() => <SignUpForm /> } />
          <Route exact path="/books/create" render={() => <BookCreateForm />} />
          <Route exact path="/books/:id" render={() => <BookPage /> } />
          <Route exact path="/books/:id/edit" render={() => <BookEditForm /> } />
          <Route render={()=><p>404 Page not found</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;