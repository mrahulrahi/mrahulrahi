'use client'
import { useState, useEffect, useMemo } from 'react';
import { useGradient } from '@/app/context/GradientContext';

const QuizWidget = () => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [amount, setAmount] = useState(5);
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [type, setType] = useState('');
    const [categories, setCategories] = useState([]);
    const context = useGradient();
    const gradientStyle = context ? context.gradientStyle : { backgroundImage: 'linear-gradient(to right, #00DC82, #00B159)' };

    const currentQuestionAnswers = useMemo(() => {
        if (questions.length === 0 || !questions[questionNumber]) return [];
        const allAnswers = [
            ...questions[questionNumber].incorrect_answers,
            questions[questionNumber].correct_answer
        ];
        return [...allAnswers].sort(() => Math.random() - 0.5);
    }, [questions, questionNumber]);

    useEffect(() => {
        fetchTriviaQuestions();
        fetchCategories();
    }, []);

    const fetchTriviaQuestions = async () => {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=${amount}${!(category == 0) ? '&category=' + category : ''}${!(difficulty == 0) ? '&difficulty=' + difficulty : ''}${!(type == 0) ? '&type=' + type : ''}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setQuestions(data.results);
        } catch (error) {
            console.error('Error fetching trivia questions:', error);
        }
    };

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

    const handleAnswerSubmission = () => {
        const correctAnswer = questions[questionNumber].correct_answer;
        if (selectedAnswer === correctAnswer) {
            setScore(score + 20);
        }
        setShowFeedback(true);
    };

    const nextQuestion = () => {
        setSelectedAnswer(null);
        setShowFeedback(false);
        if (questionNumber < questions.length - 1) {
            setQuestionNumber(questionNumber + 1);
        } else {
            setShowQuiz(false);
            setQuestionNumber(0);
        }
    };

    const restartQuiz = () => {
        setScore(0);
        setQuestionNumber(0);
        setShowQuiz(false);
        setShowFeedback(false);
        setSelectedAnswer(null);
        fetchTriviaQuestions();
    };

    const getQuestionAndAnswers = () => {
        if (questions.length === 0) {
            return <div className="text-center p-4 text-xs font-mono text-slate-500">Loading Questions...</div>;
        }
        return (
            <div className="space-y-4 w-full">
                <div className="quiz-stats-head w-full flex justify-between text-xs font-bold text-slate-400 font-mono">
                    <p className="questions mb-0">Questions: <span className="text-white">{showQuiz ? questionNumber + 1 : questionNumber}/{questions.length}</span></p>
                    <p className="score mb-0">Score: <span className="text-brand-mint">{score}</span></p>
                </div>
                <div className="question-answer-wrapper space-y-4">
                    <h3 className="text-sm font-bold text-slate-200" dangerouslySetInnerHTML={{ __html: questions[questionNumber].question }}></h3>
                    <div className="answers-list grid grid-cols-1 gap-2">
                        {currentQuestionAnswers.map((answer, index) => (
                            <div key={index} className="answers-item">
                                <label className="answer-choice flex items-center gap-3 p-3 bg-slate-950/60 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition-colors">
                                    <input
                                        type="radio"
                                        name="answer-choices"
                                        value={answer}
                                        onChange={() => setSelectedAnswer(answer)}
                                        checked={selectedAnswer === answer}
                                        className="text-brand-mint focus:ring-brand-mint"
                                    />
                                    <span className="text-xs text-slate-300" dangerouslySetInnerHTML={{ __html: answer }}></span>
                                </label>
                            </div>
                        ))}
                    </div>
                    
                    {!showFeedback ? (
                        <button className="btn btn-green w-full py-2 bg-brand-mint/10 border border-brand-mint/20 text-brand-mint rounded-xl text-xs font-bold hover:bg-brand-mint/20 transition-colors cursor-pointer" onClick={handleAnswerSubmission}>Submit Answer</button>
                    ) : (
                        <div className="space-y-3 p-4 bg-slate-950/40 border border-slate-850 rounded-2xl">
                            {selectedAnswer === questions[questionNumber].correct_answer ? (
                                <h3 className="text-xs font-mono font-bold text-brand-mint">✓ CORRECT!</h3>
                            ) : (
                                <div>
                                    <h3 className="text-xs font-mono font-bold text-red-400">✗ WRONG!</h3>
                                    <h4 className="text-xs text-slate-400 mt-1" dangerouslySetInnerHTML={{ __html: `Correct answer: ${questions[questionNumber].correct_answer}` }}></h4>
                                </div>
                            )}
                            <button className="btn btn-green w-full py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold hover:border-slate-700 transition-colors cursor-pointer" onClick={nextQuestion}>
                                {questionNumber < questions.length - 1 ? 'Next Question' : 'End Quiz'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="py-3 px-3 md:py-5 md:px-5 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md w-full min-h-[300px] flex items-center justify-center">
            <div className="quiz-container flex flex-col w-full">
                {!showQuiz ? (
                    <div className="start-quiz-wrapper w-full space-y-4">
                        <h2 className="bg-clip-text text-transparent text-lg font-black tracking-wide" style={gradientStyle}>Test your knowledge</h2>
                        
                        <div className="select-menu grid grid-cols-2 gap-3">
                            <div className="form-group flex flex-col gap-1">
                                <label className="form-label text-slate-500 font-mono text-[9px] uppercase" htmlFor="amount">Amount :</label>
                                <select className="form-select bg-slate-950/60 border border-slate-805 rounded-xl px-2 py-1.5 text-xs text-slate-300" id="amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                </select>
                            </div>
                            <div className="form-group flex flex-col gap-1">
                                <label className="form-label text-slate-500 font-mono text-[9px] uppercase" htmlFor="category">Category :</label>
                                <select className="form-select bg-slate-950/60 border border-slate-805 rounded-xl px-2 py-1.5 text-xs text-slate-300" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value={0}>Any Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group flex flex-col gap-1">
                                <label className="form-label text-slate-500 font-mono text-[9px] uppercase" htmlFor="difficulty">Difficulty :</label>
                                <select className="form-select bg-slate-950/60 border border-slate-805 rounded-xl px-2 py-1.5 text-xs text-slate-300" id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                                    <option value={0}>Any Difficulty</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                            <div className="form-group flex flex-col gap-1">
                                <label className="form-label text-slate-500 font-mono text-[9px] uppercase" htmlFor="type">Type :</label>
                                <select className="form-select bg-slate-950/60 border border-slate-805 rounded-xl px-2 py-1.5 text-xs text-slate-300" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value={0}>Any Type</option>
                                    <option value="multiple">Multiple Choice</option>
                                    <option value="boolean">True / False</option>
                                </select>
                            </div>
                        </div>

                        <button className="btn btn-green w-full py-2 bg-slate-950 hover:bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer" onClick={() => { fetchTriviaQuestions(); startQuiz(); }}>Start Quiz</button>
                    </div>
                ) : (
                    getQuestionAndAnswers()
                )}
            </div>
        </div>
    );
};

export default QuizWidget;
