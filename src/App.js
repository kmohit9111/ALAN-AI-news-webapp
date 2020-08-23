import React,{useState,useEffect} from 'react'
import alanbtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js'
import wordsToNumbers from 'words-to-numbers'


const APIkey=process.env.REACT_APP_ALAN_API_KEY;
  //get your alan api key
function App() {
    // console.log(process.env.REACT_APP_ALAN_API_KEY) 
    const classes=useStyles();
    const [newsArticles,setNewsArticles] = useState([]);
    const [activeArticle,setActiveArticle] = useState(-1);
    useEffect(()=>{
        alanbtn({
            key:APIkey,
            onCommand:({command,articles,number})=>{
                if(command==='newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle)=>prevActiveArticle+1);
                }
                else if(command==='open'){
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if (parsedNumber > 20) {
                        alanbtn().playText('Please try that again...');
                    } else if (article) {
                        window.open(article.url, '_blank');
                        alanbtn().playText('Opening...');
                    } else {
                        alanbtn().playText('Please try that again...');
                    }
                }
            }
        })
    },[])
    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt='alan logo' />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}

export default App;