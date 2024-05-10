import { useEffect, useState } from "react";
import "./index.css";
// import Mode from "./Mode";

function App() {
  const [task, setTask] = useState([]);
  // const [flag, setMode] = useState(false);
  const [subject, setSubject] = useState("");
  const [hour, setHour] = useState("");

  const SubjectValue = (e) => {
    setSubject(e.target.value);
  };

  const HourValue = (e) => {
    setHour(e.target.value);
  };

  const AddTask = () => {
    setTask([...task, { subject:subject, hour: hour }]);
    setSubject("");
    setHour("");
    console.log(task);
  };
  const increaseHour = (index)=>{
    const updatedTask = [...task];
    updatedTask[index].hour = parseInt(updatedTask[index].hour) + 1;
    setTask(updatedTask);
  }
  const decreaseHour = (index)=>{
    const updatedTask = [...task];
    updatedTask[index].hour = updatedTask[index].hour - 1;
    setTask(updatedTask);
  }
const deleteTask = (index)=>{
  const updatedTask = [...task];
  updatedTask.splice(index,1);
  setTask(updatedTask);
}

  useEffect(()=>{
    const storedTask = localStorage.getItem("task");
    if(storedTask){
      setTask(JSON.parse(storedTask));
    }
  },[])
  useEffect(()=>{
    localStorage.setItem("task", JSON.stringify(task))
  },[task])
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh] w-[100%]">
        {/* <Mode flag={flag} setMode={setMode} /> */}
        <h1 className="text-center text-5xl font-bold">
          Geekster Educational Planner
        </h1>
        <div className="h-[200px] flex items-center gap-5">
          <input
            onChange={SubjectValue}
            type="text"
            name=""
            id=""
            placeholder="Subject"
            className="p-2 w-[270px] border-black border-[1px] rounded-lg outline-none"
            value={subject}
          />
          <input
            onChange={HourValue}
            type="number"
            name=""
            id=""
            placeholder="Hours"
            className="p-2 w-[100px] border-black border-[1px] rounded-lg outline-none"
            value={hour}
          />
          <button onClick={AddTask}>Add</button>
        </div>
        <ul className="">
          {
            task.map((element, index) => (
              <li className="flex items-center justify-center gap-5" key={index+1}>  {element.subject} - {element.hour} hour 
                <button onClick={() => decreaseHour(index)} className="flex justify-center items-center rounded-full w-[50px] h-[50px] bg-red-500">-</button>
                <button onClick={() => increaseHour(index)} className="flex justify-center items-center rounded-full w-[50px] h-[50px] bg-green-500">+</button>
                <button onClick={() => deleteTask(index)} className="flex justify-center items-center rounded-full w-[120px] h-[50px] bg-red-500">Delete</button>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
}

export default App;
