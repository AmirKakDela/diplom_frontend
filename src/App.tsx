import React, {useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import Signup from "./components/Auth/SignUp/Signup";
import MainPage from "./components/Layout/MainPage/MainPage";
import Login from "./components/Auth/LogIn/Login";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound/NotFound";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux/Reducers/rootReducer";
import {auth} from "./redux/Actions/thunkUserActions";
import RequireAuth from "./components/HOC/RequireAuth";
import SearchPage from "./components/Layout/SearchPage/SearchPage";
import ArtistPage from "./components/Layout/ArtistPage/ArtistPage";
import WelcomePage from "./components/Layout/WelcomePage/WelcomePage";
import GuestRoute from "./components/HOC/GuestRoute";
import AppLoading from "./components/AppLoading/AppLoading";
import AdminLayout from "./components/AdminPage/AdminLayout/AdminLayout";
import AdminRoute from "./components/HOC/AdminRoute";
import MyLibraryPage from "./components/Layout/MyLibraryPage/MyLibraryPage";
import LibrarySong from "./components/Layout/MyLibraryPage/LibrarySong";
import PlaylistPage from './components/Layout/PlaylistPage/PlaylistPage';
import GenrePage from "./components/Layout/GenrePage/GenrePage";
import {AlbumPage} from "./components/Layout/AlbumPage/AlbumPage";
import ErrorAlert from "./components/Alert/ErrorAlert/ErrorAlert";
import AdminSongs from "./components/AdminPage/AdminSongs/AdminSongs";
import AdminSongForm from "./components/AdminPage/AdminSongForm/AdminSongForm";
import LibraryPlaylists from "./components/Layout/MyLibraryPage/LibraryPlaylists";
import AdminPlaylists from "./components/AdminPage/AdminPlaylists/AdminPlaylists";
import {darkTheme, lightTheme, ThemeContext} from "./components/Layout/theme-context/constants";
import {SharedActionsType} from "./redux/Actions/sharedActions";
import AdminAlbums from "./components/AdminPage/AdminAlbums/AdminAlbums";
import { AdminAlbumForm } from './components/AdminPage/AdminAlbumForm/AdminAlbumForm';
import LibraryAlbums from "./components/Layout/MyLibraryPage/LibraryAlbums";
import AdminArtists from "./components/AdminPage/AdminArtists/AdminArtists";
import AdminArtistForm from "./components/AdminPage/AdminArtistForm/AdminArtistForm";
import AdminGenres from "./components/AdminPage/AdminGenres/AdminGenres";
import AdminGenreForm from "./components/AdminPage/AdminGenreForm/AdminGenreForm";
import AdminMain from "./components/AdminPage/AdminMain/AdminMain";

function App() {
    const isAuth = useSelector((state: RootState) => state.user.isAuth);
    const isAdmin = useSelector((state: RootState) => state.user.currentUser.isAdmin);
    const userLoading = useSelector((state: RootState) => state.user.isLoading);
    const error = useSelector((state: RootState) => state.error.errorText);
    const dispatch = useDispatch();

    const currentTheme = useSelector((state: RootState) => state.shared.appTheme);
    const changeTheme = (value: boolean) => {
        dispatch({
            type: SharedActionsType.SET_APP_THEME,
            payload: {
                appTheme: value ? darkTheme : lightTheme
            }
        });
    };

    useEffect(() => {
        dispatch(auth());
    }, [dispatch])

    return <>
        {userLoading ? <AppLoading/> :
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path='/auth'>
                            <Route index element={
                                <GuestRoute isAuth={isAuth}>
                                    <Login/>
                                </GuestRoute>
                            }/>
                            <Route path='signup' element={<Signup/>}/>
                        </Route>

                        <Route path='welcome' element={<WelcomePage/>}/>

                        <Route path='/' element={
                            <RequireAuth isAuth={isAuth}>
                                <ThemeContext.Provider value={currentTheme}>
                                    <Layout changeTheme={changeTheme}/>
                                </ThemeContext.Provider>
                            </RequireAuth>}>
                            <Route index element={<MainPage/>}/>
                            <Route path='loved' element={<LibrarySong/>}/>
                            <Route path='my-library' element={<MyLibraryPage/>}>
                                <Route index element={<Navigate to='songs'/>}/>
                                <Route path='songs' element={<LibrarySong/>}/>
                                <Route path='albums' element={<LibraryAlbums/>}/>
                                <Route path='playlists' element={<LibraryPlaylists/>}/>
                            </Route>
                            <Route path='create-playlist' element={<PlaylistPage/>}/>
                            <Route path='my-playlists' element={<h1>My playlists</h1>}/>
                            <Route path='search' element={<SearchPage/>}/>
                            <Route path='artist/:id' element={<ArtistPage/>}/>
                            <Route path='playlist/:id' element={<PlaylistPage/>}/>
                            <Route path='album/:id' element={<AlbumPage/>}/>
                            <Route path='genre/:id' element={<GenrePage/>}/>
                            <Route path='*' element={<NotFound/>}/>
                        </Route>

                        <Route path='/admin' element={
                            <AdminRoute isAdmin={isAdmin} isAuth={isAuth}>
                                <AdminLayout/>
                            </AdminRoute>}>
                            <Route index element={<AdminMain/>}/>
                            <Route path="songs" element={<AdminSongs/>}/>
                            <Route path="song/:id" element={<AdminSongForm/>}/>
                            <Route path="song/create" element={<AdminSongForm/>}/>
                            <Route path="genres" element={<AdminGenres/>}/>
                            <Route path="genre/:id" element={<AdminGenreForm/>}/>
                            <Route path="genre/create" element={<AdminGenreForm/>}/>
                            <Route path="artists" element={<AdminArtists/>}/>
                            <Route path="artist/:id" element={<AdminArtistForm/>}/>
                            <Route path="artist/create" element={<AdminArtistForm/>}/>
                            <Route path="playlists" element={<AdminPlaylists/>}/>
                            <Route path='playlist/:id' element={<PlaylistPage/>}/>
                            <Route path="albums" element={<AdminAlbums/>}/>
                            <Route path='album/:id' element={<AlbumPage/>}/>
                            <Route path="album/update/:id" element={<AdminAlbumForm/>}/>
                            <Route path="album/create" element={<AdminAlbumForm/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
                {error !== null ? <ErrorAlert error={error}/> : null}
            </>
        }
    </>
        ;
}

export default App;
