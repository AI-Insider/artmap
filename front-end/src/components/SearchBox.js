import React from 'react';



const SearchBox = ({searchChange}) =>{
  return(
    <div>
      <input type="text" onChange={searchChange} placeholder="Search art"/>
    </div>
  );
}

export default SearchBox;
