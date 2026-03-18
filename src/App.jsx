 import noteBg from "./assets/note.png";
 import React, { useState, useEffect } from "react";

const App = () => {

  const [title, setTitle] = useState('')
 const [details, setDetails] = useState('')
const [task, setTask] = useState(() => {
  const saved = localStorage.getItem("notes");
  return saved ? JSON.parse(saved) : [];
});
useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(task));
}, [task]);
  
  const submitHandler=(e)=>{
    e.preventDefault();
     const copyTask =[...task];
  copyTask.push({title,details});
   setTask(copyTask)
   
   
     setTitle('')
     setDetails('')
  }
const deleteNote=(idx)=>{
  const copyTask=[...task];
  copyTask.splice(idx,1)
  setTask(copyTask)
}
   
  return (
     <div className="h-screen flex flex-col lg:flex-row bg-black text-white">
      <form onSubmit={(e)=>{
submitHandler(e)
      }} className="flex items-start lg:w-1/2   gap-4 flex-col p-10    ">

          <h1 className="text-4xl font-bold">Add Notes</h1>
       {/* phla input for Heading */}
          <input 
        type="text" 
        placeholder="Enter Notes Heading" 
        className="px-5 w-full font-medium py-2 border-2 outline-none rounded"
        value={title}
        onChange={(e)=>{
        setTitle(e.target.value);
        }}
        />
{/* Detailed wala input */}
         <textarea type="text"
         className="px-5 w-full font-medium h-32 py-2 items-start flex-row border-2 outline-none rounded"
           placeholder='Write Details'
           value={details}
           onChange={(e)=>{
            setDetails(e.target.value)
           }}
         />

         <button className="bg-white active:scale-97 font-medium text-black outline-none  w-full px-5 py-2 rounded ">Add Notes</button>
       
         
      </form>
      <div className="lg:w-1/2 lg:border-l-2 p-10 h-full flex flex-col overflow-hidden">
  <h1 className="text-4xl font-bold">Recent Notes</h1>

   <div className="flex flex-wrap gap-5 items-start justify-start mt-5 flex-1 overflow-y-auto">
        {task.map(function(elem,idx){
          return   <div
  key={idx}
  className="flex justify-between flex-col relative items-start h-52 w-40 bg-cover rounded-2xl text-black py-6 pb-4 px-4"
  style={{ backgroundImage: `url(${noteBg})` }}
>

          <div> 
              <h3 className="leading-tight  text-lg font-bold">{elem.title}</h3>
              <p className="mt-3 leading-tight text-xs font-semibold text-gray-600">{elem.details}</ p>
              </div>
              <button  onClick={()=>{
                deleteNote(idx)
              }}  className='w-full bg-red-500 text-white py-1 text-xs rounded font-bold   active:scale-96'>Delete</button>
          </div>
         
        })}
       
          
          
</div>
      </div>
    </div>
  );
};

export default App;