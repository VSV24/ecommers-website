import { useState } from 'react'
import './App.css'

function App() {
  const [name,setName] = useState({firstname:'',lastname:''})
  // function handleSubmit(e){
  //   e.preventDefault()
  //   console.log(name)
  // }

  return(
    <div>
      <h1>{name.firstname} - {name.lastname}</h1>
      <input type="text" onChange={(e)=> setName({...name,firstname:e.target.value})} value={name.firstname} />
      <input type="text" onChange={(e)=> setName({...name,lastname:e.target.value})} value={name.lastname} />
      <button onClick={()=>console.log(name)}>submit</button>
    </div>
  )
  
}

export default App
