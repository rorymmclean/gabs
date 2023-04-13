import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

const Header = (props) => {
    const {projects,setSelectedProject,StandardQuestions,loading}=props;


    function handleOptionChange(event) {
      setSelectedProject(event.target.value);
    }
  

  return (
  <div
  
  style={{
   
    backgroundColor:"#000",
    position:"fixed",
    width:"100%"
  }}
  >

<div
style={{

    width:"90%",
    marginLeft:"auto",
    marginRight:"auto",
    display:"flex",
    flexDirection:"row",
}}
>
    
<h3
  style={{
    color:"#fff",
    marginRight:20
  }}
  >
    Project: 
  </h3>
<div
style={{
    marginTop:"auto",
    marginBottom:"auto"
}}
>
     <Form.Select aria-label="Default select example" size="sm" onChange={handleOptionChange}>
        {
            projects.map((item,index)=>{
                return (
                    <option value={item.ID}>{item.short_name}</option>

                )
            })
        }
      
    </Form.Select>
</div>
{
        loading? <div
          style={{
            marginLeft:"auto",
            marginTop:"auto",
            marginBottom:"auto"
          }}
          >
             <Spinner animation="border" role="status" variant="primary">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>:<>
          <button
 style={{
  marginLeft:"auto"
 }}
 onClick={()=>{
  StandardQuestions()
 }}
 >
  Standard Questions
 </button>
          </>
      }
     


</div>
 

  </div>
  
  );
};

export default Header;