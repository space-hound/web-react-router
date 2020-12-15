import React, { useState, useEffect } from 'react';

import { currentRoute, matchRoute, extractRouteParams, watchRouter } from './utils';

const Router = ({ children }) => {

    const [currentLocation, setCurrentLocation] = useState(currentRoute());
    
    useEffect(() => {
        return watchRouter(event => {
            setCurrentLocation(currentRoute());
        });
    }, []);

    useEffect(() => {
        setCurrentLocation(currentRoute());
    }, [children]);

    let matched = null;
    const routes = children.map(child => child.props);
    for(let i = 0; i < routes.length; i++) {
        const route = routes[i];
        if(matchRoute(route.path, currentLocation)) {
            matched = route;
            break;
        }
    }

    if(!matched) {
        return null;
    }

    const {path, component } = matched;
    const params = extractRouteParams(currentLocation, path);
    
    return React.createElement(component, { ...params });
}

export default Router;