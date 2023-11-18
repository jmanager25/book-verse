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
import ReviewCreateForm from "./pages/reviews/ReviewCreateForm";
import ReviewEditForm from "./pages/reviews/ReviewEditForm";
import { useCurrentUser } from "./context/currentUserContext";
import ProfilesPage from "./pages/profiles/ProfilesPage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./errors/NotFound";


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <AlertPopup />
        <Switch>
          <Route exact path="/" render={() => <Book />} />
          <Route
            exact 
            path="/mybooks" 
            render={() => (
              <Book
                message="No books saved"
                filter={`saved__owner__profile=${profile_id}`}
              />
            )} />
          <Route exact path="/signin" render={() => <SignInForm /> } />
          <Route exact path="/signup" render={() => <SignUpForm /> } />
          <Route exact path="/books/create" render={() => <BookCreateForm />} />
          <Route exact path="/books/:id" render={() => <BookPage /> } />
          <Route exact path="/books/:id/edit" render={() => <BookEditForm /> } />
          <Route exact path="/books/:id/reviews" render={() => <ReviewCreateForm /> } />
          <Route exact path="/books/:bookId/reviews/:reviewId/edit" render={() => <ReviewEditForm/> } />
          <Route exact path="/profiles/:id" render={() => <ProfilesPage /> } />
          <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />}/>
          <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />}/>
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />
          <Route render={()=> <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;