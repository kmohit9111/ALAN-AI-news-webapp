import React,{useState,useEffect} from 'react'
import alanbtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards/NewsCards';

// const APIkey  //get your alan api key
function App() {
    const [newsArticles,setNewsArticles] = useState([]);
    useEffect(()=>{
        alanbtn({
            // key:APIkey,
            onCommand:({command,articles})=>{
                if(command==='newHeadlines'){
                    setNewsArticles(articles);
                }
            }
        })
    },[])
    return (
        <div>
            <h1>Alan AI news Application</h1>
            <NewsCards articles={newsArticles} />
        </div>
    )
}

export default App;