import {React, useState,} from 'react'
import axios from 'axios';
import image from '../image/dicttt.jpg'
import './Dictionary.css';

const Dictionary = () => {

    const [userInput, setUserInput] = useState('');
    const [words, setWords] = useState([]);
    const [loading,setLoading]= useState(false);
    const [error, setError] = useState('')

   
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en';

    const handleChange = (event) => {
      setUserInput(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      setWords([]);
      try{
        if (userInput.length > 0) {
          const res = await axios.get(`${url}/${userInput}`);

          if (res) {
            setWords(res.data);
            setLoading(false)
          }
        }
        return;
      } catch (error) {
        setLoading(false);
        if (error) setError('Pls input a valid English words')
      }
    };


    

  return (
    <div style={{backgroundColor:'lightblue',height:'100%',overflowX:'hidden'}}>

   <div className='div1'>
    
        <img src={image} alt="" />
        <h3>DICTIONARY APP</h3>

        <main>

           <form onSubmit={handleSubmit}>

             <input type="text"
             value={userInput}
             onInput={handleChange}
              placeholder='Search words'/>

            <button type='submit'>Check word</button>
           </form>

        </main>

   </div>

   <div className='div2'>
    {loading && <p style={{fontSize:'25px',fontFamily:'Georgia, Times New Roman',fontWeight:'bold',color:'darkred',textAlign:'center'}}>Searching..........</p>}
    {words.length === 0 && !loading && (
      <p style={{fontSize:'20px',fontFamily:'Georgia, Times New Roman',fontWeight:'bold',color:'green'}}>Please search for an English word!!!</p>
    )}

    {words.length > 0 ? (
      words.map((terms) => (
        <>
            <h4 className='word-heading'>
              <a 
                href={terms.sourceUrls[0]}
                target='blank'
                style={{textDecoration: 'none'}}>
                  {terms.words}
              </a>
              </h4>

              <p style={{fontSize:'16px',fontFamily:'Georgia, Times New Roman',fontWeight:'bold',color:'green'}}>Phonetic : {terms.phonetic}</p>
              {terms.meanings.map((terms) => (

                     <>
                     
                        <p style={{fontSize:'16px',fontFamily:'Georgia, Times New Roman',fontWeight:'bold',color:'purple'}}>Part Of Speech : {terms.partOfSpeech}</p>
                        {terms.definitions.map((meaning) =>(
                          <ul>
                            <li style={{color:'blue'}}>
                              <p style={{fontSize:'16px',fontFamily:'Georgia, Times New Roman',fontWeight:'bold',color:'blue'}}>Definition : {meaning.definition}</p>
                            </li>
                          </ul>
                        ))}

                        {terms.synonyms.length > 0 && <h4 style={{fontSize:'18px',fontFamily:'Georgia, Times New Roman',fontWeight:'bold',color:'red'}}>Synonyms</h4>}
                        {terms.synonyms.length > 0 &&
                        terms.synonyms.map((synonyms) => (
                          <>
                          <ul>
                            <li style={{color:'red'}}>
                              <p style={{fontSize:'18px',fontFamily:'Georgia, Times New Roman',fontWeight:'bold',color:'red'}}>{synonyms}</p>
                            </li>
                          </ul>
                          </>
                        ))}

                        {terms.antonyms.length > 0 && <h4 style={{fontFamily:'Georgia, Times New Roman',fontWeight:'bold',color:'green',fontSize:'20px'}}>Antonyms</h4>}
                        {terms.antonyms.map((antonyms) =>(
                          <>
                            <ul>
                              <li style={{color:'green'}}>
                                <p style={{fontSize:'18px',fontFamily:'Georgia, Times New Roman',fontWeight:'bold',color:'green'}}>{antonyms}</p>
                              </li>
                            </ul>
                          </>
                        ))}
                  </>
              ))}
                    </>
              
      ))
    ) : (
      <p>{error}</p>
    )}

      </div>

  </div>
  );
};

export default Dictionary;