import React,{useState,useEffect} from 'react';
import './Home.css'
import Message from './Message';
import Header from './Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import Spinner from 'react-bootstrap/Spinner';

const Home = () => {
    const [InputMessage,setInputMessage]=useState("")
const [Messages,SetMessages]=useState([])
const [projects,setProjects]=useState([])
const [selectedProject,setSelectedProject]=useState(0)
const [loading,setLoading]=useState(false)


useEffect(()=>{

},[Messages])


function handleKeyPress(event) {
  if (event.key === "Enter" && !loading) {
    var msgs=Messages
  msgs.push({
    text:InputMessage,
    sender:0
})
    SetMessages(msgs);

    

    handleQuestion(InputMessage)
    setInputMessage("")


  }
}



function StandardQuestions(){
  setLoading(true)
    fetch('https://um36wsyk6zb3jjzcemf42bovxm0nyhbf.lambda-url.us-east-1.on.aws/standard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      
  
     "id": selectedProject,
  
    })
  })
    .then(response => {
      const stream = response.body;
      const decoder = new TextDecoder();
      const reader = stream.getReader();
  
      function readStream() {
        reader.read().then(({ done, value }) => {
          if (done) {
            return;
          }
  
          const decodedValue = decoder.decode(value);
          if(decodedValue!=="Internal Server Error")
        {
          SetMessages([...Messages,{
            text:JSON.parse(decodedValue).answer,
            sender:1
          }]);
        }
        else{
          alert(decodedValue)
        }

         setLoading(false)
         

          readStream();
        });
      }
  
      readStream();
    
    });
  }

function handleQuestion(message){

setLoading(true)

  const filteredData = projects.filter(item => item.ID === selectedProject);

  fetch('https://um36wsyk6zb3jjzcemf42bovxm0nyhbf.lambda-url.us-east-1.on.aws/question', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    
      "question": message,

   "id": selectedProject,

  "namespace": filteredData[0].namespace,

   "index": filteredData[0].index,

   "k": 10,

   "emodel": "text-embedding-ada-002",

   "cmodel": "text-davinci-003"
  })
})
  .then(response => {
    const stream = response.body;
    const decoder = new TextDecoder();
    const reader = stream.getReader();

    function readStream() {
      reader.read().then(({ done, value }) => {
        if (done) {
          return;
        }

        const decodedValue = decoder.decode(value);
        if(decodedValue!=="Internal Server Error")
      {
        SetMessages([...Messages,{
          text:JSON.parse(decodedValue).answer,
          sender:1
        }]);
      }
      else{
        alert(decodedValue)
      }
      setLoading(false)
      

        readStream();
      });
    }

    readStream();
  
  });
}
useEffect(()=>{
  fetch('https://um36wsyk6zb3jjzcemf42bovxm0nyhbf.lambda-url.us-east-1.on.aws/lov')
  .then(response => {
    const stream = response.body;
    const decoder = new TextDecoder();
    const reader = stream.getReader();

    function readStream() {
      reader.read().then(({ done, value }) => {
        if (done) {
          return;
        }

        const decodedValue = decoder.decode(value);
        setProjects(JSON.parse(decodedValue).list)
        setSelectedProject(JSON.parse(decodedValue).list[0].ID)
        readStream();
      });
    }

    readStream();
  });
    
},[])
  return (
    <div className="chat-container">
      <Header projects={projects} setSelectedProject={setSelectedProject} StandardQuestions={StandardQuestions} loading={loading}/>
      
      <div className="chat-body">

        {
            Messages.map((item,index)=>{

                return(<Message key={index} Message={item} index={index}/>)
            })
        }
             {
        loading&&( <div
          style={{
            marginLeft:"auto",
            marginRight:"auto",
            marginTop:20,
            width:0
          }}
          >
             <Spinner animation="border" role="status" variant="primary" style={{
               marginLeft:"auto",
               marginRight:"auto",
               marginTop:20
             }}>
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>)
      }
     
      </div>
   
     
      <div className="chat-input">
        <div
        
        style={{
            backgroundColor: "#3F414E",
            width:"50%",
            borderRadius:10

        }}
        >
             <input type="text" placeholder="Ask GAB a question"   
        value={InputMessage}
        onKeyPress={handleKeyPress}

        style={{
            width:"87%",
            backgroundColor:"#3F414E",
            color:"#fff"
        }}
        onChange={(evt) => {
            setInputMessage(evt.currentTarget.value);

        }}
/>
        
      {
        loading?<>
       
        </>:<>
        <button

style={{
    backgroundColor:"#3F414E",
    width:"10%"
}}
onClick={()=>{
  var msgs=Messages
  msgs.push({
    text:InputMessage,
    sender:0
})
    SetMessages(msgs);


    handleQuestion(InputMessage)
    setInputMessage("")
    


}}
> 
<FontAwesomeIcon icon={faTelegram} size='lg'/>
</button> 
        </>
      }
     
        </div>
      
      </div>
    </div>
  );
};

export default Home;