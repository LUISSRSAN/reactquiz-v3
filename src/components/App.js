import Header from "./Header.js"
import Main from "./Main.js"
import Loader from "./Loader.js"
import Error from "./Error.js"
import StartScreen from "./StartScreen.js"
import Question from "./Questions.js"

import { useEffect,useReducer} from "react";





const initialState = {
  questions: [],
  status: 'loading',
  index: 0 ,
  answer:null,
  points:0,
};

function reducer (state,action) {

switch(action.type) {

  case   'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status:'ready',
      };
  case 'dataFailed':
    return {
      ...state,state:'error',
    }
    case 'start':
        return {...state,status:'active'}
      default:
        throw new Error ["Action unknown"];

case 'newAnswer':
  const question = state.questions.at(state.index)
  return {
    ...state,answer:active.payload,
    points: action.payload === question.correctOption 
    ? state.points + question.points 
    : state.points,

  };
  
}

export default function App(){



const [{questions,status,index},dispatch] = useReducer (reducer,initialState);

    const numQuestions = questions.length;


useEffect (function(){
  fetch('http://localhost:9000/questions')
  .then((res) =>res.json())
  .then(data=> dispatch({type:'dataReceived',payload:data}))
  .catch((err) => dispatch({type:'dataFailed'}));
  

},[]);

  return (<div className = "app">



 <Header/>
 <Main>
 {status === 'loading' && <Loader/> }
 {status === 'error' && <Error/> }
 {status === 'ready' && <StartScreen numQuestions= 
 {numQuestions} dispatch = {dispatch}/> }
{status === 'active' && <Question question={questions[index]}
dispatch = {dispatch} answer = {answer}
/>}
 </Main>
  
  </div>
  )
};