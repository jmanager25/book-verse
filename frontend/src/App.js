import styles from "./App.module.css";
import NavBar from './components/NavBar';
import {Route, Switch} from 'react-router-dom';
import {Container} from "react-bootstrap";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import './api/axiosDefaults'
import AlertPopup from "./components/AlertPopup";
import BookCreateForms from "./pages/books/BookCreateForm";
import BookPage from "./pages/books/BookPage";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <AlertPopup />
        <Switch>
          <Route exact path="/" render={() => <h1>Home Page</h1>} />
          <Route exact path="/mybooks" render={() => <h1>My Books</h1>} />
          <Route exact path="/signin" render={() => <SignInForm /> } />
          <Route exact path="/signup" render={() => <SignUpForm /> } />
          <Route exact path="/books/create" render={() => <BookCreateForms />} />
          <Route exact path="/books/:id" render={() => <BookPage /> } />
          <Route render={()=><p>404 Page not found</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;