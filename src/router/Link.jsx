import React, { useState, useEffect } from 'react';

import { watchRouter, matchRoute, currentRoute, pushState } from './utils';

const Link = ({ style, className, to, children }) => {

    const [active , setActive] = useState(false);

    useEffect(() => {
        return watchRouter(event => {
            setActive(matchRoute(to, currentRoute()));
        });
    }, [to]);

    const onClick = (event) => {
        if(event.metaKey || event.ctrlKey) {
            return;
        }
        event.preventDefault();
        pushState(to);
    }

    return (
        <a
            onClick={onClick}
            href={to}
            style={style}
            className={`${className}${active ? ' router-active' : ''}`}
        >
            {children}
        </a>
    );
}

Link.defaultProps = {
    to: '',
    style: {},
    className: '',
    children: null
}

export default Link;