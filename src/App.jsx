import  { React, useEffect,useState, useRef,useCallback }  from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword ] = useState("")

  const ref = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str = str + "1234567890"
    if(charAllowed) str = str + "!@#$%^&*()_+"
  
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  },[length, numAllowed, charAllowed])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numAllowed, charAllowed])

  const copyToClipboard = ()=>{
    window.navigator.clipboard.writeText(password)
  }
  return (
    <>
    
    <div className='w-screen h-screen flex justify-center items-center' style={{backgroundColor: "blueviolet"}}> 
      <div className='border-white border bg-red-700 flex  rounded-3xl justify-center w-2/4 h-48'>  
        <div className='w-1/2 h-1/2 flex justify-center'>
          <input className = " relative top-8 rounded-l-xl h-14 w-56"
          type='text'
          ref={ref}
          value={password}
          ></input>
          
          <button 
          className='bg-black text-white rounded-r-xl relative top-8 h-14'
          onClick={copyToClipboard}
          >Copy</button>
        </div>

        <div className='flex justify-between relative top-12 border-white'>
          <div className='px-2'>
            <input 
            type = "range"
            onChange={(e)=>(setlength(e.target.value))} 
            min={8} 
            max={64} 
            value={length} 
            className='cursor-pointer'></input>
            <label>Length : {length}</label>
          </div>

          <div className='gap-x-3'>
            <input 
            type='checkbox'
            defaultChecked={numAllowed}
            onChange={()=>{setNumAllowed((prev)=>!prev)}}
            >
            </input>
            <label>Number</label>
          </div>
          
          <div>
            <input 
            type='checkbox'
            defaultChecked={charAllowed}
            onChange={()=>{setCharAllowed((prev)=>!prev)}}
            >
            </input>
            <label>Character</label>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default App
