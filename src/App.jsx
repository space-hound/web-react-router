import React, { Component } from 'react';

import { Router, Route, Link } from './router';

import Home from './pages/Home';
import Error from './pages/Error';
import Search from './pages/Search';
import Player from './pages/Player';
import Settings from './pages/Settings';
import Favourites from './pages/Favourites';

export default class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/player/1">Player</Link>
                    <Link to="/search/searchterm">Search</Link>
                    <Link to="/settings">Settings</Link>
                    <Link to="/favourites">Favourites - Redirect</Link>
                    <Link to="/pamparam">Not Match</Link>
                </div>

                <Router>
                    <Route
                        path="/"
                        component={Home}
                    />
                    <Route
                        path="/player/:id"
                        component={Player}
                    />
                    <Route
                        path="/search/:term/:subterm?"
                        component={Search}
                    />
                    <Route
                        path="/settings"
                        component={Settings}
                    />
                    <Route
                        path="/favourites"
                        redirect="/player/1000"
                        component={Favourites}
                    />
                    <Route
                        path="*"
                        component={Error}
                    />
                </Router>
            </div>
        );
    }
}