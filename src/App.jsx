import axios from 'axios';
import { useEffect, useState } from 'react';


function App() {

const [word, setword] = useState([]);
const [tries, setTries] = useState(6);
const [val, setVal] = useState('');
const url = 'https://api.frontendeval.com/fake/word';


// let words = [];

  // for(let i = 0; i < 10; i++){
  //   let w = Math.floor(Math.random() * (123 - 97) + 97)
  //   words.push(String.fromCharCode(w));

  //   let stop = word.length;
  //   while(stop >= 0){
    //     let posi = Math.floor(Math.random() * words.length)
    //     words.splice(posi, 0, word[i]);
    //     stop--;
    //   }
    
    
    // }
    
        
    useEffect(() => {

      async function createWord(){
        
        let res = await axios.get(url).then((res) => res.data );

        // let words = Array.from({length: 10}, (_, i) => ({
        //   id: i,
        //   word: String.fromCharCode(Math.floor(Math.random() * (123 - 97) + 97))
        // }));
        let words = Array.from({length: 10}, () => (
          String.fromCharCode(Math.floor(Math.random() * (123 - 97) + 97))
        ));

        let i = res.length-1;
        while(i >= 0){
            let posi = Math.floor(Math.random() * words.length);
            words.splice(posi, 0, res[i]);
            i--;
        }

        setword(words);
        console.log(res);

      };
      createWord();

    }, []);



  return (
    <>
    <main className="bg-black/60 h-screen w-full flex items-center justify-center">

      <div className=" w-[30%] h-[80%] p-4 bg-white/10 rounded-lg  flex flex-col gap-10 items-center justify-center">
          <h1 className="text-4xl tracking-wider font-semibold font-mono text-black/80">Wordle</h1>
          <div className="text-center ">
            <p className="text-zinc-800 mb-2">Guess the word in 6 tries</p>
            <p className="px-4 py-1 rounded-md bg-white/20 text-center shadow-sm shadow-white/20 ring-1 ring-white/30 ">
             {tries > 0 ? tries : 'trials ends'}
            </p>
          </div>

          <input 
          value={val}
          onChange={e => setVal(e.target.value)}
          className="bg-zinc-400 px-6 py-2 text-black/80 rounded-lg outline-none shadow-sm shadow-white/20 ring-1 ring-white/30 "
          placeholder="type your guess"
          type="text" />

          {/* letter container */}
          <div className="container grid grid-cols-5 shrink-0 gap-2 p-2 py-4 h-fit w-full bg-white/10 rounded-lg shadow-sm shadow-white/20 ring-1 ring-white/30 ">
           {
              word.map((char, i) => (
                <div key={i}
                onClick={() => {
                  if(char !== word.includes(char)){
                    return setTries(tries-1);
                  }
                }}
                className={`${char === word.includes(char) && 'bg-green-700/40'}
                flex items-center justify-center h-13 w-13 cursor-pointer  bg-gray-700/30 rounded-2xl shadow-sm shadow-white/20 ring-1 ring-white/30 `}>
                  {char}
                </div>
              ))
           }
          </div>
      </div>

    </main>
    </>
  )
}

export default App
