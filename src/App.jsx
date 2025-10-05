import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import GlobalStyles from './styles/GlobalStyles';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));
const Post = lazy(() => import('./pages/Post'));
const CreatePost = lazy(() => import('./pages/CreatePost'));
const EditPost = lazy(() => import('./pages/EditPost'));
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));

const App = () => {
    return (
        <ErrorBoundary fallbackMessage="Erro na aplicação. Recarregue a página.">
            <AuthProvider>
                <PostProvider>
                    <Router>
                        <GlobalStyles />
                        <Suspense fallback={<LoadingSpinner message="Carregando página..." />}>
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route path="/post/:id" component={Post} />
                                <Route path="/create" component={CreatePost} />
                                <Route path="/edit/:id" component={EditPost} />
                                <Route path="/admin" component={Admin} />
                                <Route path="/login" component={Login} />
                            </Switch>
                        </Suspense>
                    </Router>
                </PostProvider>
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default App;