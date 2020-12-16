import React from 'react';

const Search = ({ router }) => {
    return <h1>Mandatory Param: {router.term} | Optional Param: {router.subterm ? router.subterm : 'Not Given'}</h1>
}

export default Search;