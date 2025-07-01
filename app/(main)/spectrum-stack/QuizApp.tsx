import React, { useState, useEffect } from 'react';

const QuizApp = ({ gradientColor }: { gradientColor: string }) => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<null | string>(null);
    const [questions, setQuestions] = useState<any>([]);
    const [amount, setAmount] = useState<any>(10);
    const [category, setCategory] = useState<any>('');
    const [difficulty, setDifficulty] = useState<any>('');
    const [type, setType] = useState<any>('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchTriviaQuestions();
    }, []);

    const fetchTriviaQuestions = async () => {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=${amount}${!(category == 0) ? '&category=' + category : ''}${!(difficulty == 0) ? '&difficulty=' + difficulty : ''}${!(type == 0) ? '&type=' + type : ''}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response);
            const data = await response.json();
            setQuestions(data.results);
        } catch (error) {
            console.error('Error fetching trivia questions:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []); // Empty dependency array ensures useEffect runs only once on mount

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://opentdb.com/api_category.php');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data.trivia_categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const startQuiz = () => {
        setShowQuiz(true);
    };

    const getQuestionAndAnswers = () => {
        if (questions.length === 0) {
            return null; // Handle loading state or no data scenario
        }
        return (
            <>
                <div className="quiz-stats-head w-100 d-flex justify-content-between">
                    <p className="questions mb-0">Questions: <span>{showQuiz ? questionNumber + 1 : questionNumber}/{questions.length}</span></p>
                    <p className="score mb-0">Score: <span>{score}</span></p>
                </div>
                <div className="question-answer-wrapper mx-auto">
                    <h3 dangerouslySetInnerHTML={{ __html: questions[questionNumber].question }}></h3>
                    <div className="answers-list d-flex flex-wrap">
                        {[...questions[questionNumber].incorrect_answers, questions[questionNumber].correct_answer].map((answer, index) => (
                            <div key={index} className="answers-item">
                                <div className="answer-choice w-100 h-100 d-flex align-items-center">
                                    <input
                                        type="radio"
                                        id={`${index}`}
                                        name="answer-choices"
                                        value={answer}
                                        onChange={() => setSelectedAnswer(answer)}
                                        checked={selectedAnswer === answer} />
                                    <label htmlFor={`${index}`} className="d-flex align-items-center gap-3" dangerouslySetInnerHTML={{ __html: answer }}></label>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-green" onClick={handleAnswerSubmission}>Submit Answer</button>
                </div>
            </>
        );
    };

    const handleAnswerSubmission = () => {
        const correctAnswer = questions[questionNumber].correct_answer;
        if (selectedAnswer === correctAnswer) {
            setScore(score + 20);
        }
        setShowFeedback(true);
    };

    const nextQuestion = () => {
        setQuestionNumber(questionNumber + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
    };

    const restartQuiz = () => {
        setQuestionNumber(0);
        setScore(0);
        setShowFeedback(false);
        setSelectedAnswer(null);
        setShowQuiz(true);
    };

    return (
        <div className="quiz-container d-flex flex-wrap h-100">
            {!showQuiz ? (
                <>
                    <div className="start-quiz-wrapper align-self-center mx-auto">
                        <h2 className="background-clip-text" style={{ backgroundImage: gradientColor }}>Test your knowledge</h2>
                        <div className="select-menu mx-auto">
                            <div className="row g-3">
                                <div className="col-sm-6 ">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="amount">Amount :</label>
                                        <select className="form-select" id="amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))}>
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={15}>15</option>
                                            <option value={20}>20</option>
                                            <option value={25}>25</option>
                                            <option value={30}>30</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="category">Category :</label>
                                        <select className="form-select" id="category" value={category} onChange={(e) => setCategory(Number(e.target.value))}>
                                            <option value={0}>Any Category</option>
                                            {categories.map((category: { id: number; name: string; }) => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="difficulty">Difficulty :</label>
                                        <select className="form-select" id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                                            <option value={0}>Any Difficulty</option>
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="type">Type :</label>
                                        <select className="form-select" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                                            <option value={0}>Any Type</option>
                                            <option value="multiple">Multiple Choice</option>
                                            <option value="boolean">True / False</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-green" onClick={() => { startQuiz(); fetchTriviaQuestions(); }}>Start Quiz</button>
                    </div>
                </>

            ) : (
                <>
                    {questionNumber < questions.length ? (
                        showFeedback ? (
                            <>
                                <div className="quiz-stats-head w-100 d-flex justify-content-between">
                                    <p className="questions mb-0">Questions: <span>{showQuiz ? questionNumber + 1 : questionNumber}/{questions.length}</span></p>
                                    <p className="score mb-0">Score: <span>{score}</span></p>
                                </div>
                                <div className="feedback-wrapper align-self-center mx-auto">
                                    {selectedAnswer === questions[questionNumber].correct_answer ? (
                                        <div className="correct-feedback">
                                            <h3 className="text-success">CORRECT!</h3>
                                            <h4 className="correct-answer-alert text-accent">
                                                Correct answer is: {questions[questionNumber].correct_answer}
                                            </h4>
                                        </div>
                                    ) : (
                                        <div className="wrong-feedback">
                                            <h3 className="text-danger">WRONG!</h3>
                                            <h4 className="correct-answer-alert text-accent">
                                                Correct answer is: {questions[questionNumber].correct_answer}
                                            </h4>
                                        </div>
                                    )}
                                    <button className="btn btn-green" onClick={nextQuestion}>{questionNumber < questions.length - 1 ? 'Next Question' : 'End Quiz'}</button>
                                </div>
                            </>

                        ) : (
                            getQuestionAndAnswers()
                        )
                    ) : (
                        <div className="feedback-wrapper align-self-center mx-auto">
                            <h3 className="bg-clip-text" style={{ backgroundImage: gradientColor }}>Quiz Completed!</h3>
                            <h4 className="text-accent">Your Score: {score}</h4>
                            <div className="d-flex flex-column flex-sm-row gap-3">
                                <button className="btn btn-green" onClick={restartQuiz}>Restart Quiz</button>
                                <button className="btn btn-green" onClick={() => window.location.reload()}>Start New Quiz</button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default QuizApp