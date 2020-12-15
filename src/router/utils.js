const isPartDesc = part => part[0] !== ':';

const isPartMust = part => part[0] === ':' && part[part.length - 1] !== '?';

const isPartOpt = part => part[0] === ':' && part[part.length - 1] === '?';

const extractMust = part => part.substring(1, part.length);

const extractOpt = part => part.substring(1, part.length - 1);

const splitRoute = (route) => {
    return route.split('/').filter(part => part !== '');
}

const splitRouteDesc = (route) => {
    const parts = splitRoute(route);
    const desc = [], must = [], opt = [];
    parts.forEach(part => {
        if(isPartDesc(part)) desc.push(part);
        if(isPartOpt(part)) opt.push(extractOpt(part));
        if(isPartMust(part)) must.push(extractMust(part));
    });
    return { parts, desc, must, opt };
}

export const matchRoute = (routeDesc, currentRoute) => {
    if(routeDesc === '*') return true;
    if(routeDesc === currentRoute) return true;
    if(routeDesc === '/' && currentRoute !== '/') return false;
    const { desc, must } = splitRouteDesc(routeDesc);
    const currentParts = splitRoute(currentRoute);
    const currentDesc = currentParts.slice(0, desc.length);
    if(desc.length !== currentDesc.length)  {
        return false;
    }
    if(desc.join('') !== currentDesc.join('')) {
        return false;
    }
    const currentMust = currentParts.slice(desc.length, desc.length + must.length);
    if(must.length !== currentMust.length) {
        return false;
    }
    return true;
}

export const extractRouteParams = (currentRoute, routeDesc) => {
    const currentParts = splitRoute(currentRoute);
    const {desc, must, opt} = splitRouteDesc(routeDesc);
    let counter = desc.length;
    const slag = {};
    must.forEach((key) => {
        slag[key] = currentParts[counter++];
    });
    opt.forEach((key) => {
        slag[key] = currentParts[counter++];
    });
    return slag;
}

export const currentRoute = () => {
    return window.location.pathname;
}

export const pushState = (route) => {
    window.history.pushState({}, '', route);
    window.dispatchEvent(new PopStateEvent('popstate'));
}

export const watchRouter = (callback) => {
    window.addEventListener('popstate', callback);
    return () => {
        window.removeEventListener('popstate', callback);
    }
}