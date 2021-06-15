import React, { Component } from 'react'
import {QuizData} from '../QuizData';
//import {Pie} from "react-chartjs-2"
// import "./styles.css"

export class Quiz extends Component {
   
   constructor(props) {
       super(props)
   
       this.state = {
            userAnswer: null ,
            currentIndex: 0,
            options: [] ,
            quizEnd: false,
            score : 0,
            disabled : true,
            time:{}
       };
       this.interval= null
   }
   
   loadQuiz=() => {
       const{currentIndex} = this.state;
       this.setState(()=> {
           return{
               question: QuizData[currentIndex].question,
               options: QuizData[currentIndex].options,
               answer: QuizData[currentIndex].answer
           }
       })
   }
   

   nextQuestionHander = () => {
    const {userAnswer, answer, score} = this.state
   
    
    if(userAnswer === answer){
        this.setState({
            score: score + 1
        })
    }

    this.setState({
        currentIndex: this.state.currentIndex + 1,
        userAnswer: null
    })
}
   
   componentDidMount () {
       this.loadQuiz();
       this.startTimer() ;
   }
  
   checkAnswer = answer => {
    this.setState({
        userAnswer: answer,
        disabled: false
    })
}

finishHandler =() => {
    if(this.state.currentIndex === QuizData.length -1){
        this.setState({
            quizEnd:true
        })
    }
}
 
   componentDidUpdate(prevProps, prevState) {
       const{currentIndex} =this.state;
       if(this.state.currentIndex !== prevState.currentIndex){
        this.setState(()=> {
            return{
                question: QuizData[currentIndex].question,
                options: QuizData[currentIndex].options,
                answer: QuizData[currentIndex].answer
            }
        });
       }
   }
   
 startTimer=() => {
     const countDownTime = Date.now() + 300000 ;
     this.interval =setInterval(()=> {
        const now = new Date()
        const distance = countDownTime- now ;

        const minutes = Math.floor((distance % (1000*60*60 )) / (1000*60))
        const seconds = Math.floor((distance % (1000*60)) / (1000))

        if (distance < 0) {
            clearInterval(this.interval);
            this.setState({
                time:{
                    minutes: 0,
                    seconds : 0
                }
            },() => {
                alert("Time is up");
                this.setState({
                    quizEnd:true
                })
                
            });
        } else {
            this.setState({
                time:{
                    minutes,
                    seconds
                }
            })
        }
     },1000);
 }
   
    render() {
        const {question,options,currentIndex,userAnswer,quizEnd, time}=this.state
     
                  
       
        if(quizEnd) {
           
            return (
                
                <div  style={{ margin : "0 10px"}}>
                    <h1>Game Over. Final score is {this.state.score} points</h1>
                    <p>The correct Answers for the quiz are</p>
                     
                  
                    <ul>
                        {QuizData.map((item, index) => (
                            <li className='ui floating message options'
                                key={index}>
                                    {item.answer}
                            </li>
                        ))}
                    </ul>
                    <div style={{height:"500px"}}>
                      
                    {/* <Pie 
            data={{
                labels: ["right","wrong"],
                datasets:[
                    {
                        label:"Results",
                        data: [ 7,3],
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                        ]
                    }
                ]
             }
            }
            height={100}
            width={300}
            options={{
                maintainAspectRatio: true,
                animation: false

            }} /> */}
            </div>
                </div>
            )
        }
        // {
        return (
            <div >
                <div style={{padding:"10px 10px"}}>
                <span className="qns">{`Question ${currentIndex + 1} of ${QuizData.length }`}</span>

                 <span className="timer">⏲️{" "}{time.minutes}:{time.seconds}</span>
                 </div>
            <div style={{ textAlign: "center",margin:"0 25%" }} >

            
            <h2>{question}</h2>
           
            <div >
            {options.map(option => (  //for each option, new paragraph
                <p key={option.id} 
                className={`ui floating message options
                ${userAnswer === option ? "selected" : null}
                `}
                onClick= {() => this.checkAnswer(option)}

                >
                    {option}
                </p>
            ))}
            </div>
            {currentIndex < QuizData.length -1 &&
            <button 
            style={{backgroundColor: 'ButtonHighlight' , padding:"8px 20px"}}
            className="ui inverted button"
            disabled = {this.state.disabled}
            onClick = {this.nextQuestionHander}
                >Next Question</button>
            }
                {currentIndex === QuizData.length -1 &&
                <button
                style={{backgroundColor: 'hotpink' , padding:"8px 20px"}}
                className="ui inverted button"
                disabled = {this.state.disabled}
                onClick = {this.finishHandler}
                > 🎉Finish</button>
                }
                </div>
        </div>
        )
    }
}

export default Quiz