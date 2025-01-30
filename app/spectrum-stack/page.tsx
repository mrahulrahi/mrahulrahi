'use client'
import React, { useState, useEffect } from 'react';
import ContentContainer from '../components/ContentContainer'
import './SpectrumStack.css'
import { FaPlus, FaXmark, FaEllipsis, FaPen, FaTrash } from 'react-icons/fa6';
import { FiCopy } from "react-icons/fi";

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

interface Item {
    id: number;
    title: string;
    description?: string;
    tasks?: Task[];
    date: string;
    type: 'note' | 'todo';
}

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


const SpectrumStack = () => {
    const [openSideBox, setOpenSideBox] = useState(false);
    const [displayValue, setDisplayValue] = useState('');
    const [expression, setExpression] = useState('');
    const [bracketOpen, setBracketOpen] = useState(true);
    const [gradientDirection, setGradientDirection] = useState('to right');

    const handleButtonClick = (buttonText: any) => {
        const buttonValue = buttonText.target.innerHTML;
        if (buttonValue === '=') {
            evaluateExpression();
        } else if (buttonValue === 'AC') {
            clear();
        } else if (buttonValue === 'C') {
            backSpace();
        } else if (buttonValue === 'x') {
            setExpression((prevValue) => prevValue + '*');
        } else if (buttonValue === '÷') {
            setExpression((prevValue) => prevValue + '/');
        } else if (buttonValue === 'π') {
            setExpression((prevValue) => prevValue + Math.PI);
        } else if (buttonValue === '%') {
            setExpression((prevValue) => prevValue + '/100');
        } else if (buttonValue === 'x²') {
            setExpression((prevValue) => `Math.pow(${prevValue}, 2)`);
        } else if (buttonValue === '√') {
            setExpression((prevValue) => `Math.sqrt(${prevValue})`);
        } else if (buttonValue === '^') {
            setExpression((prevValue) => prevValue + '**');
        } else if (buttonValue === '!') {
            setExpression((prevValue) => `factorial(${prevValue})`);
        } else if (buttonValue === '()') {
            setExpression((prevValue) => prevValue + (bracketOpen ? '(' : ')'));
            setBracketOpen(!bracketOpen);
        } else {
            setExpression((prevValue) => prevValue + buttonValue);
        }
    };

    const evaluateExpression = () => {
        try {
            const result = eval(expression.replace(/Math\.pow\(([^,]+), 2\)/g, '($1)**2').replace(/Math\.sqrt\(([^)]+)\)/g, 'Math.sqrt($1)').replace(/factorial\(([^)]+)\)/g, 'factorial($1)'));
            setDisplayValue(result.toString());
            setExpression(result.toString());
        } catch (error) {
            setDisplayValue('Syntax Error');
        }
    };

    const clear = () => {
        setDisplayValue('');
        setExpression('');
    };

    const backSpace = () => {
        setExpression((prevValue) => prevValue.slice(0, -1));
    };

    const factorial = (n: number): number => {
        if (n === 0) return 1;
        return n * factorial(n - 1);
    };

    const [color1, setColor1] = useState('#43C6AC');
    const [color2, setColor2] = useState('#F8FFAE');
    const [gradient, setGradient] = useState('');

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, colorSetter: React.Dispatch<React.SetStateAction<string>>) => {
        const newColor = e.target.value;
        colorSetter(newColor);
        updateGradient(newColor, color2);
    };

    const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newDirection = e.target.value;
        setGradientDirection(newDirection);
        updateGradient(color1, color2, newDirection);
    };

    const updateGradient = (c1: string, c2: string, direction: string = gradientDirection) => {
        const gradientStyle = `linear-gradient(${direction}, ${c1}, ${c2})`;
        setGradient(gradientStyle);
    };


    const [items, setItems] = useState<Item[]>([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState<number | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState<number | null>(null);
    const [view, setView] = useState<'notes' | 'todos'>('notes');
    const [currentToDoId, setCurrentToDoId] = useState<number | null>(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [savedToDoId, setSavedToDoId] = useState<number | null>(null); // Track saved To-Do ID
    const [itemType, setItemType] = useState<'note' | 'todo'>('note');

    useEffect(() => {
        const savedItemsJson = localStorage.getItem('items');
        if (savedItemsJson) {
            try {
                const savedItems: Item[] = JSON.parse(savedItemsJson);
                setItems(savedItems);
            } catch (error) {
                console.error('Failed to parse items from localStorage', error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    const addItem = () => {
        const currentDate = new Date();
        const month = months[currentDate.getMonth()];
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();

        const newItem: Item = {
            id: currentToDoId || Date.now(),
            title,
            date: `${month} ${day}, ${year}`,
            type: itemType,
            ...(itemType === 'note' ? { description } : { tasks })
        };

        if (isUpdate) {
            const updatedItems = items.map(item =>
                item.id === updateId ? { ...newItem, id: updateId } : item
            );
            setItems(updatedItems);
            setIsUpdate(false);
        } else {
            setItems([...items, newItem]);
        }

        resetForm();
        closePopup();
    };

    const deleteItem = (itemId: number) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            const updatedItems = items.filter(item => item.id !== itemId);
            setItems(updatedItems);
            if (updateId === itemId) {
                setIsUpdate(false);
            }
        }
    };

    const updateItem = (item: Item) => {
        setIsUpdate(true);
        setUpdateId(item.id);
        setTitle(item.title);
        setDescription(item.description || '');
        setTasks(item.tasks || []);
        setItemType(item.type);
        openPopup();
    };

    const openPopup = () => {
        setPopupVisible(true);
        document.body.style.overflow = 'hidden';
    };

    const closePopup = () => {
        setIsUpdate(false);
        setTitle('');
        setDescription('');
        setTasks([]);
        setTaskTitle('');
        setSavedToDoId(null); // Reset saved To-Do ID
        setPopupVisible(false);
        document.body.style.overflow = 'auto';
    };

    const toggleMenu = (itemId: number) => {
        setMenuOpen(menuOpen === itemId ? null : itemId);
    };

    const addTask = () => {
        if (taskTitle.trim()) {
            const newTask: Task = {
                id: Date.now(),
                title: taskTitle,
                completed: false
            };
            setTasks([...tasks, newTask]);
            setTaskTitle('');
        }
    };

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const toggleTaskCompletion = (taskId: number) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const resetForm = () => {
        setIsUpdate(false);
        setTitle('');
        setDescription('');
        setTasks([]);
        setTaskTitle('');
        setCurrentToDoId(null);
    };


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
                <div className="quiz-stats-head d-flex justify-content-between">
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
                                    <label htmlFor={`${index}`} className="d-flex align-items-center gap-4" dangerouslySetInnerHTML={{ __html: answer }}></label>
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
        <>

            <div className="gradient-bg" style={{ background: gradient }}>
                <ContentContainer className="inner-banner-container">
                    <h1>Spectrum <br /> Stack App</h1>
                </ContentContainer>

                <div className={`gradient-selector-box d-flex align-items-center ${openSideBox ? 'open' : null}`}>
                    <div className="gs-inner d-flex flex-column align-items-center">
                        <h3>Choose <br /> Colors</h3>
                        <div className="color-pick-group d-inline-flex">
                            <div className="color-pick-card d-flex flex-column">
                                <input className="color1" type="color" value={color1} onChange={(e) => handleColorChange(e, setColor1)} />
                                <div className="color-pick-info">
                                    <p>Color : 1</p>
                                </div>
                            </div>
                            <div className="color-pick-card d-flex flex-column">
                                <input className="color2" type="color" value={color2} onChange={(e) => handleColorChange(e, setColor2)} />
                                <div className="color-pick-info">
                                    <p>Color : 2</p>
                                </div>
                            </div>
                        </div>
                        <div className="direction-select mt-3">
                            <label className="form-label" htmlFor="direction">Direction:</label>
                            <select id="direction" className='form-select' value={gradientDirection} onChange={handleDirectionChange}>
                                <option value="to right">To Right</option>
                                <option value="to left">To Left</option>
                                <option value="to top">To Top</option>
                                <option value="to bottom">To Bottom</option>
                                <option value="to top right">To Top Right</option>
                                <option value="to top left">To Top Left</option>
                                <option value="to bottom right">To Bottom Right</option>
                                <option value="to bottom left">To Bottom Left</option>
                            </select>
                        </div>
                    </div>


                    <button className="gs-btn" onClick={() => setOpenSideBox(prev => !prev)} style={{ background: gradient }}>Gradient Bg</button>

                </div>

                <ContentContainer className="gradient-generator-container pt-0">

                    {gradient && <div className="d-flex g-2">
                        <p className="text-center mt-3"> Current CSS BG : {gradient}</p>
                        <button onClick={() => navigator.clipboard.writeText(gradient)} className="btn btn-green ratio-1x1"><FiCopy /></button>
                    </div>}

                    <div className="main-class d-flex flex-column flex-lg-row gap-5" id="main-container">

                        <div className="quiz-container">
                            {!showQuiz ? (
                                <>

                                    <div className="start-quiz-wrapper mx-auto">
                                        <h2>Test your <br /> knowledge</h2>
                                        <div className="select-menu mx-auto">
                                            <div className="row g-3">
                                                <div className="col-sm-6 ">
                                                    <div className="form-group">
                                                        <label className="form-label" htmlFor="amount">Amount:</label>
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
                                                        <label className="form-label" htmlFor="category">Category:</label>
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
                                                        <label className="form-label" htmlFor="difficulty">Difficulty:</label>
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
                                                        <label className="form-label" htmlFor="type">Type:</label>
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
                                                <div className="quiz-stats-head d-flex justify-content-between">
                                                    <p className="questions mb-0">Questions: <span>{showQuiz ? questionNumber + 1 : questionNumber}/{questions.length}</span></p>
                                                    <p className="score mb-0">Score: <span>{score}</span></p>
                                                </div>
                                                <div className="feedback-wrapper mx-auto">
                                                    {selectedAnswer === questions[questionNumber].correct_answer ? (
                                                        <div className="correct-feedback">
                                                            <h3 className="text-success">CORRECT!</h3>
                                                            <h4 className="correct-answer-alert">
                                                                Correct answer is: {questions[questionNumber].correct_answer}
                                                            </h4>
                                                        </div>
                                                    ) : (
                                                        <div className="wrong-feedback">
                                                            <h3 className="text-danger">WRONG!</h3>
                                                            <h4 className="correct-answer-alert">
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
                                        <div className="feedback-wrapper mx-auto">
                                            <h3>Quiz Completed!</h3>
                                            <h4>Your Score: {score}</h4>
                                            <div className="d-flex flex-column flex-sm-row gap-3">
                                                <button className="btn btn-green" onClick={restartQuiz}>Restart Quiz</button>
                                                <button className="btn btn-green" onClick={() => window.location.reload()}>Start New Quiz</button>
                                            </div>

                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="android-frame">
                            <div className="output-operation-class" id="output-operation">
                                <input type="text" className="output-screen" id="output-id" placeholder='0' value={expression} readOnly />
                            </div>
                            <div className="input-btn-wrapper">
                                <div className="mini-algo-function">
                                    <button onClick={handleButtonClick} className="button mini-function">x²</button>
                                    <button onClick={handleButtonClick} className="button mini-function">√</button>
                                    <button onClick={handleButtonClick} className="button mini-function">π</button>
                                    <button onClick={handleButtonClick} className="button mini-function">^</button>
                                    <button onClick={handleButtonClick} className="button mini-function">!</button>
                                </div>
                                <div className="input-class">
                                    <button onClick={handleButtonClick} className="button number-btn">7</button>
                                    <button onClick={handleButtonClick} className="button number-btn">8</button>
                                    <button onClick={handleButtonClick} className="button number-btn">9</button>
                                    <button onClick={handleButtonClick} className="button function-btn">%</button>
                                    <button onClick={handleButtonClick} className="button AC-btn">AC</button>
                                    <button onClick={handleButtonClick} className="button number-btn">4</button>
                                    <button onClick={handleButtonClick} className="button number-btn">5</button>
                                    <button onClick={handleButtonClick} className="button number-btn">6</button>
                                    <button onClick={handleButtonClick} className="button function-btn">x</button>
                                    <button onClick={handleButtonClick} className="button function-btn">÷</button>
                                    <button onClick={handleButtonClick} className="button number-btn">1</button>
                                    <button onClick={handleButtonClick} className="button number-btn">2</button>
                                    <button onClick={handleButtonClick} className="button number-btn">3</button>
                                    <button onClick={handleButtonClick} className="button function-btn">+</button>
                                    <button onClick={handleButtonClick} className="button function-btn">-</button>
                                    <button onClick={handleButtonClick} className="button number-btn">0</button>
                                    <button onClick={handleButtonClick} className="button number-btn">.</button>
                                    <button onClick={handleButtonClick} className="button C-btn">C</button>
                                    <button onClick={handleButtonClick} className="button function-btn">()</button>
                                    <button onClick={handleButtonClick} className="button equal-btn">=</button>
                                </div>
                            </div>
                        </div>
                    </div>



                </ContentContainer>


                <ContentContainer className="notes-todos-app-container pt-0">


                    {popupVisible && (
                        <div className="popup-box">
                            <div className="popup">

                                <div className="content">

                                    <header>
                                        <p>{isUpdate ? (itemType === 'note' ? 'Update a Note' : 'Update a To-Do') : (itemType === 'note' ? 'Add a new Note' : 'Add a new To-Do')}</p>
                                        <i className="close-icon" onClick={closePopup}><FaXmark /></i>
                                    </header>
                                    <div className="view-toggle mb-5 d-flex justify-content-center">
                                        <button onClick={() => setItemType('note')} className={`w-50 btn-toggle ${itemType === 'note' ? 'active' : null}`}>Note</button>
                                        <button onClick={() => setItemType('todo')} className={`w-50 btn-toggle ${itemType === 'todo' ? 'active' : null}`}>To-Do List</button>
                                    </div>
                                    <form>
                                        <div className="title mb-4">
                                            <label className="mb-1">Title</label>
                                            <input
                                                type="text"
                                                placeholder="Title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                        {itemType === 'todo' && (
                                            <div className="tasks mb-4">
                                                <label className="mb-1">Tasks</label>
                                                <input
                                                    type="text"
                                                    placeholder="Task Title"
                                                    value={taskTitle}
                                                    onChange={(e) => setTaskTitle(e.target.value)}
                                                    className=""
                                                />
                                                <button type="button" className="mt-4" onClick={addTask}>Add Task</button>
                                                <ul className="task-list my-4">
                                                    {tasks.map(task => (

                                                        <li key={task.id} className="d-flex mb-2 align-items-center justify-content-between">
                                                            <div className="custom-checkbox-wrapper">
                                                                <label htmlFor={`${task.id}`} className="item">
                                                                    <input type="checkbox" id={`${task.id}`} className="hidden" checked={task.completed}
                                                                        onChange={() => toggleTaskCompletion(task.id)} />
                                                                    <label htmlFor={`${task.id}`} className="cbx">
                                                                        <svg width="14px" height="12px" viewBox="0 0 14 12">
                                                                            <polyline points="1 7.6 5 11 13 1"></polyline>
                                                                        </svg>
                                                                    </label>
                                                                    <label htmlFor={`${task.id}`} className={`cbx-lbl ${task.completed ? 'completed-task' : ''}`} >{task.title}</label>
                                                                </label>
                                                            </div>


                                                            <button type="button" onClick={() => removeTask(task.id)}>
                                                                <i className="close-icon"><FaXmark /></i>
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {itemType === 'note' && (
                                            <div className="description mb-4">
                                                <label className="mb-1">Description</label>
                                                <textarea
                                                    placeholder="Description"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>
                                        )}
                                        <button type="button" onClick={addItem}>
                                            {isUpdate ? (itemType === 'note' ? 'Update Note' : 'Update To-Do') : (itemType === 'note' ? 'Add Note' : 'Add To-Do')}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="notes-todos-app">
                        <div className="items-section">
                            <h2>Notes and To-Do List</h2>
                            <ul className="wrapper">
                                <li className="add-box" onClick={openPopup}>
                                    <div className="icon"><FaPlus /></div>
                                    <p>Add new</p>
                                </li>
                                {items.map((item) => (
                                    <li key={item.id} className="note">
                                        <div className="details">
                                            <p>{item.title}</p>
                                            {item.type === 'note' ? (
                                                <span>{item.description}</span>
                                            ) : (
                                                item.tasks?.map(task => (
                                                    <div key={task.id} className="task d-flex align-items-center gap-1">
                                                          <div className="custom-checkbox-wrapper">
                                                        <label htmlFor={`${task.id}`} className="item">
                                                            <input type="checkbox" id={`${task.id}`} className="hidden"
                                                                checked={task.completed}
                                                                onChange={() => {
                                                                    const updatedTasks = item.tasks?.map(t =>
                                                                        t.id === task.id ? { ...t, completed: !t.completed } : t
                                                                    );
                                                                    const updatedItems = items.map(i =>
                                                                        i.id === item.id ? { ...i, tasks: updatedTasks } : i
                                                                    );
                                                                    setItems(updatedItems);
                                                                }} />
                                                            <label htmlFor={`${task.id}`} className="cbx">
                                                                <svg width="14px" height="12px" viewBox="0 0 14 12">
                                                                    <polyline points="1 7.6 5 11 13 1"></polyline>
                                                                </svg>
                                                            </label>

                                                            <label htmlFor={`${task.id}`} className={`cbx-lbl ${task.completed ? 'completed-task' : ''}`} >{task.title}</label>
                                                        </label>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                        <div className="bottom-content">
                                            <span>{item.date}</span>
                                            <div className="settings">
                                                <button className="menu-btn" onClick={() => toggleMenu(item.id)}>
                                                    <FaEllipsis />
                                                </button>
                                                {menuOpen === item.id && (
                                                    <ul className="menu">
                                                        <li onClick={() => { updateItem(item); setMenuOpen(null); }}>
                                                            <i><FaPen /></i> Edit
                                                        </li>
                                                        <li onClick={() => { deleteItem(item.id); setMenuOpen(null); }}>
                                                            <i><FaTrash /></i> Delete
                                                        </li>
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </ContentContainer>


            </div >

        </>
    )

}

export default SpectrumStack;