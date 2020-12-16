import React, { useState, useEffect } from 'react';

import {
    currentRoute,
    watchRouter,
    matchRouteFrom,
    pushState,
    extractRouteParams
} from './utils';

const Router = ({ children }) => {

    const [currentLocation, setCurrentLocation] = useState(currentRoute());
    
    useEffect(() => {
        return watchRouter(event => {
            setCurrentLocation(currentRoute());
        });
    }, []);

    const routes = children.map(child => child.props);
    const matched = matchRouteFrom(routes, currentLocation);

    if(!matched) {
        return null;
    }

    const {redirect, path, component} = matched;

    if(redirect) {
        pushState(redirect); return null;
    }

    const params = extractRouteParams(path, currentLocation);
    
    return React.createElement(component, { router: {path, ...params}});
}

export default Router;