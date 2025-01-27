'use client'
import React, { useState, useEffect } from 'react';
import ContentContainer from '../components/ContentContainer'
import './SpectrumStack.css'
import { FaPlus, FaXmark, FaEllipsis, FaPen, FaTrash } from 'react-icons/fa6';

interface Note {
    id: number;
    title: string;
    description: string;
    date: string;
    type: string;
}

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

interface ToDo {
    id: number;
    title: string;
    tasks: Task[];
    date: string;
}

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


const SpectrumStack = () => {
    const [displayValue, setDisplayValue] = useState('');

    const handleButtonClick = (buttonText: any) => {
        const buttonValue = buttonText.target.innerHTML;
        if (buttonValue === '=') {
            evaluateExpression();
        } else if (buttonValue === 'AC') {
            clear();
        } else if (buttonValue === 'C') {
            backSpace();
        } else if (buttonValue === 'x') {
            multiply();
        } else if (buttonValue === '÷') {
            divide();
        } else if (buttonValue === 'π') {
            pi();
        } else if (buttonValue === '%') {
            percent();
        } else if (buttonValue === 'x²') {
            square();
        } else if (buttonValue === '√') {
            squareRoot();
        } else if (buttonValue === '^') {
            power();
        } else if (buttonValue === '!') {
            factorial();
        } else {
            setDisplayValue((prevValue) => prevValue + buttonValue);
        }
    };

    const evaluateExpression = () => {
        try {
            const result = eval(displayValue);
            setDisplayValue(result.toString());
        } catch (error) {
            setDisplayValue('Syntax Error');
        }
    };

    const clear = () => {
        setDisplayValue('');
    };

    const backSpace = () => {
        setDisplayValue((prevValue) => prevValue.substring(0, prevValue.length - 1));
    };

    const multiply = () => {
        setDisplayValue((prevValue) => prevValue += "*");
    }

    const divide = () => {
        setDisplayValue((prevValue) => prevValue += "/");
    }

    const pi = () => {
        setDisplayValue((prevValue) => prevValue + Math.PI);
    }

    const percent = () => {
        setDisplayValue((prevValue) => prevValue += '/' + 100);

    }

    const square = () => {
        setDisplayValue((prevValue) => String(Math.pow(parseFloat(prevValue), 2)));
    }

    const squareRoot = () => {
        setDisplayValue((prevValue) => String(Math.sqrt(parseFloat(prevValue))));
    }

    const power = () => {
        setDisplayValue((prevValue) => {
            const base = parseFloat(prevValue);
            const exponent = parseFloat('3');

            const result = Math.pow(base, exponent);
            return String(result);
        });
    };

    const factorial = () => {
        setDisplayValue((prevValue) => {
            const value = parseFloat(prevValue);
            let result = 1;

            if (value === 0) {
                result = 1;
            } else if (value < 0) {
                result = 0;
            } else {
                for (let i = value; i > 0; i--) {
                    result *= i;
                }
            }

            return result.toString();
        });
    };

    const [color1, setColor1] = useState('#43C6AC');
    const [color2, setColor2] = useState('#F8FFAE');
    const [gradient, setGradient] = useState('');

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, colorSetter: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (arg0: any): void; }) => {
        const newColor = e.target.value;
        colorSetter(newColor);
        updateGradient(newColor, color2);
    };

    const updateGradient = (c1: string, c2: string) => {
        const gradientStyle = `linear-gradient(to right, ${c1}, ${c2})`;
        setGradient(gradientStyle);
    };


    const [notes, setNotes] = useState<Note[]>([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState<number | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState<number | null>(null);
    const [view, setView] = useState<'notes' | 'todos'>('notes');
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [currentToDoId, setCurrentToDoId] = useState<number | null>(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [savedToDoId, setSavedToDoId] = useState<number | null>(null); // Track saved To-Do ID
    const [itemType, setItemType] = useState<'note' | 'todo'>('note');

    useEffect(() => {
        const savedNotesJson = localStorage.getItem('notes');
        if (savedNotesJson) {
            try {
                const savedNotes: Note[] = JSON.parse(savedNotesJson);
                setNotes(savedNotes);
            } catch (error) {
                console.error('Failed to parse notes from localStorage', error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const addNoteOrToDo = () => {
        const currentDate = new Date();
        const month = months[currentDate.getMonth()];
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();

        if (itemType === 'note') {
            const newNote: Note = {
                id: notes.length + 1,
                title,
                description,
                date: `${month} ${day}, ${year}`,
                type: 'note'
            };

            if (!isUpdate) {
                setNotes([...notes, newNote]);
            } else {
                const updatedNotes = notes.map(note =>
                    note.id === updateId ? { ...newNote, id: updateId } : note
                );
                setNotes(updatedNotes);
                setIsUpdate(false);
            }
        } else {
            const newToDo: ToDo = {
                id: currentToDoId || Date.now(),
                title,
                tasks,
                date: `${month} ${day}, ${year}`
            };

            if (currentToDoId) {
                setTodos(todos.map(todo => todo.id === currentToDoId ? newToDo : todo));
            } else {
                setTodos([...todos, newToDo]);
            }

            setSavedToDoId(newToDo.id); // Set saved To-Do ID
        }

        resetForm();
        closePopup();
    };


    const deleteNote = (noteId: number) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            const updatedNotes = notes.filter(note => note.id !== noteId);
            setNotes(updatedNotes);
            if (updateId === noteId) {
                setIsUpdate(false);
            }
        }
    };

    const updateNote = (noteId: number, title: string, description: string) => {
        setIsUpdate(true);
        setUpdateId(noteId);
        setTitle(title);
        setDescription(description);
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

    const toggleMenu = (noteId: number) => {
        setMenuOpen(menuOpen === noteId ? null : noteId);
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
        if (savedToDoId) { // Only allow toggling if To-Do is saved
            setTasks(tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            ));
        }
    };

    const addOrUpdateToDo = () => {
        const newToDo: ToDo = {
            id: currentToDoId || Date.now(),
            title,
            tasks,
            date: new Date().toLocaleDateString()
        };

        if (currentToDoId) {
            setTodos(todos.map(todo => todo.id === currentToDoId ? newToDo : todo));
        } else {
            setTodos([...todos, newToDo]);
        }

        setSavedToDoId(newToDo.id); // Set saved To-Do ID
        resetForm();
        closePopup();
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
                    <h3>{questions[questionNumber].question}</h3>
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
                                    <label htmlFor={`${index}`} className="d-flex align-items-center gap-4">{answer}</label>
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

            <div className="gradient-preview" style={{ background: gradient }}>

                <ContentContainer className="gradient-generator-container">
                    <h2>Spectrum <br /> Stack App</h2>
                    <div>
                        <h3 className="text-center">Choose Gradient Colors</h3>
                        <div className="color-pick-group d-inline-flex">
                            <div className="color-pick-card d-flex flex-column">
                                <input className="color1" type="color" value={color1} onChange={(e) => handleColorChange(e, setColor1)} />
                                <div className="info">
                                    <h4 className="mb-0">Color : 1</h4>
                                </div>
                            </div>
                            <div className="color-pick-card d-flex flex-column">
                                <input className="color2" type="color" value={color2} onChange={(e) => handleColorChange(e, setColor2)} />
                                <div className="info">
                                    <h4 className="mb-0">Color : 2</h4>
                                </div>
                            </div>
                        </div>
                        {gradient ? <h4> Current CSS BG : {gradient}</h4> : ''}
                    </div>

                    <div className="main-class d-flex flex-column flex-md-row" id="main-container">

                        <div className="quiz-container">
                            {!showQuiz ? (
                                <>
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
                                    <div className="start-quiz-wrapper mx-auto">
                                        <h2>Test your <br /> knowledge</h2>
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
                                <input type="text" className="output-screen" id="output-id" placeholder='0' value={displayValue} readOnly />
                            </div>
                            <div className="mini-algo-function">
                                <button onClick={handleButtonClick} className="button mini-function">x²</button>
                                <button onClick={handleButtonClick} className="button mini-function">√</button>
                                <button onClick={handleButtonClick} className="button mini-function">^</button>
                                <button onClick={handleButtonClick} className="button mini-function">!</button>
                            </div>
                            <div className="input-class">
                                <button onClick={handleButtonClick} className="button AC-btn">AC</button>
                                <button onClick={handleButtonClick} className="button function-btn">π</button>
                                <button onClick={handleButtonClick} className="button function-btn">%</button>
                                <button onClick={handleButtonClick} className="button function-btn">÷</button>
                                <button onClick={handleButtonClick} className="button number-btn">7</button>
                                <button onClick={handleButtonClick} className="button number-btn">8</button>
                                <button onClick={handleButtonClick} className="button number-btn">9</button>
                                <button onClick={handleButtonClick} className="button function-btn">x</button>
                                <button onClick={handleButtonClick} className="button number-btn">4</button>
                                <button onClick={handleButtonClick} className="button number-btn">5</button>
                                <button onClick={handleButtonClick} className="button number-btn">6</button>
                                <button onClick={handleButtonClick} className="button function-btn">-</button>
                                <button onClick={handleButtonClick} className="button number-btn">1</button>
                                <button onClick={handleButtonClick} className="button number-btn">2</button>
                                <button onClick={handleButtonClick} className="button number-btn">3</button>
                                <button onClick={handleButtonClick} className="button function-btn">+</button>
                                <button onClick={handleButtonClick} className="button number-btn">0</button>
                                <button onClick={handleButtonClick} className="button number-btn">.</button>
                                <button onClick={handleButtonClick} className="button C-btn">C</button>
                                <button onClick={handleButtonClick} className="button equal-btn">=</button>
                            </div>
                        </div>
                    </div>



                </ContentContainer>


                <ContentContainer className="notes-todos-app-container">


                    {popupVisible && (
                        <div className="popup-box">
                            <div className="popup">

                                <div className="content">

                                    <header>
                                        <p>{isUpdate ? (itemType === 'note' ? 'Update a Note' : 'Update a To-Do') : (itemType === 'note' ? 'Add a new Note' : 'Add a new To-Do')}</p>
                                        <i className="close-icon" onClick={closePopup}><FaXmark /></i>
                                    </header>
                                    <div className="view-toggle mb-5 d-flex justify-content-center">
                                        <button onClick={() => setItemType('note')} className={`w-50 ${itemType === 'note' ? 'active btn-violet' : 'btn-green'}`}>Note</button>
                                        <button onClick={() => setItemType('todo')} className={`w-50 ${itemType === 'todo' ? 'active btn-violet' : 'btn-green'}`}>To-Do List</button>
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
                                                            <input
                                                                type="checkbox"
                                                                checked={task.completed}
                                                                onChange={() => toggleTaskCompletion(task.id)}
                                                                disabled={savedToDoId === null && !isUpdate} // Disable checkbox if To-Do is not saved
                                                            />
                                                            {task.title}
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
                                        <button type="button" onClick={addNoteOrToDo}>
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
                                {notes.map((note) => (
                                    <li key={note.id} className="note">
                                        <div className="details">
                                            <p>{note.title}</p>
                                            <span>{note.description}</span>
                                        </div>
                                        <div className="bottom-content">
                                            <span>{note.date}</span>
                                            <div className="settings">
                                                <button className="menu-btn" onClick={() => toggleMenu(note.id)}>
                                                    <FaEllipsis />
                                                </button>
                                                {menuOpen === note.id && (
                                                    <ul className="menu">
                                                        <li onClick={() => { updateNote(note.id, note.title, note.description); setMenuOpen(null); }}>
                                                            <i><FaPen /></i> Edit
                                                        </li>
                                                        <li onClick={() => { deleteNote(note.id); setMenuOpen(null); }}>
                                                            <i><FaTrash /></i> Delete
                                                        </li>
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                {todos.map((todo) => (
                                    <li key={todo.id} className="todo d-flex flex-column">
                                        <div className="details flex-grow-1">
                                            <p>{todo.title}</p>
                                            {todo.tasks.map(task => (
                                                <div key={task.id} className="task">
                                                    <input
                                                        type="checkbox"
                                                        checked={task.completed}
                                                        onChange={() => toggleTaskCompletion(task.id)}
                                                        disabled={todo.id !== savedToDoId} // Disable checkbox if To-Do is not the current saved one
                                                    />
                                                    {task.title}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="bottom-content">
                                            <span>{todo.date}</span>
                                            <div className="settings">
                                                <button className="menu-btn" onClick={() => toggleMenu(todo.id)}>
                                                    <FaEllipsis />
                                                </button>
                                                {menuOpen === todo.id && (
                                                    <ul className="menu">
                                                        <li onClick={() => {
                                                            setCurrentToDoId(todo.id);
                                                            setTitle(todo.title);
                                                            setTasks(todo.tasks);
                                                            setSavedToDoId(todo.id); // Set saved To-Do ID for editing
                                                            openPopup();
                                                        }}>
                                                            <i><FaPen /></i> Edit
                                                        </li>
                                                        <li onClick={() => {
                                                            setTodos(todos.filter(td => td.id !== todo.id));
                                                            setMenuOpen(null);
                                                        }}>
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