import { pushState } from './utils';

const Redirect = ({ to }) => {
    pushState(to); return null;
}

export default Redirect;