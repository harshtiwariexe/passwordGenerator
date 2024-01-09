import { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [count, setCount] = useState(6);
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")
  const passRef = useRef(null)

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstvuwxyz";

    if (number) str += "1234567890";
    if (character) str += "!@#$%^&*()_";
    for (let i = 1; i <= count; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [count, number, character, setPassword])
  useEffect(() => { passwordGen() }, [count, number, character, passwordGen])

  const copyClip = useCallback(() => {
    passRef.current?.select()
    { alert("copied") }
    window.navigator.clipboard.writeText(password)
  }, [password])

  return <div className="bg-gray-700 h-screen w-full">
    <h1 className="text-4xl font-medium text-center text-white py-6">Passowrd Generator</h1>
    <div className="bg-gray-100 h-44 ml-96 mr-96 mt-10 rounded-2xl">
      <div className=" flex flex-row items-center justify-center py-5"> <input type="text" value={password} ref={passRef} readOnly className="rounded-l-md px-5 w-2/3 h-14" name="" placeholder="Password" id="" />
        <button className="bg-purple-500 hover:bg-purple-800 text-white w-20 h-14 rounded-r-md" onClick={copyClip}>Copy</button></div>
      <div className="flex flex-row items-center justify-center py-5 gap-6">
        <input type="range" min={6} max={50} className="cursor-pointer" value={count} onChange={e => { setCount(e.target.value) }} />
        <p>{`${count} length`}</p>
        <input type="checkbox" id="" value={number} onChange={() => setNumber(number => !number)} /><p>Numbers</p>
        <input type="checkbox" id="" value={character} onChange={() => setCharacter(char => !char)} /><p>Character</p>
      </div>
    </div>
  </div>
}