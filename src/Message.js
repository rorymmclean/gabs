import React from 'react';

const Message = (props) => {
    const {Message,index}=props
  return (
    <div
    style={{
        backgroundColor:index%2==0?"#353442":"#434554"

    }}
    >
 <div
   style={{

width:"80%",
marginLeft:"auto",
marginRight:"auto",
display:"flex",
flexDirection:"row",
padding:10
}}
   >
<div
style={{
    width:50,
    height:50,
    backgroundColor:Message.sender==0?"#5C6EC0":"#308A78",
    marginRight:20,
    marginTop:"auto",
    marginBottom:"auto"
}}
>

</div>
<p
style={{
    color:"#fff",
    marginTop:"auto",
    marginBottom:"auto",
    width:"90%"
}}
>
    {Message.text}
</p>

   </div>
    </div>
  
  );
};

export default Message;