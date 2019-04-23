import React from 'react';



const UploadForm = ({token}) =>{

  return(
    <form action="http://localhost:3001/upload" method="POST" enctype="multipart/form-data">
    <input required name="artName" type="text" placeholder="Art name"/><br/>
    <input required accept="image/*" name="artImage" type="file"/><br/>
    <input type="hidden" name="token" value={token}/>
    <input type="submit"/>
    </form>
  );
}

export default UploadForm;
