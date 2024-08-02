'use client';
import React, { useState, useEffect } from 'react';
import './NotesApp.css';
import Banner from '@/app/components/Banner/Banner';
import ContentContainer from '@/app/components/ContentContainer';
import { FaPlus, FaXmark, FaEllipsis, FaPen, FaTrash } from 'react-icons/fa6';

interface Note {
    id: number;
    title: string;
    description: string;
    date: string;
    completed: boolean; // Property to track completion status for to-dos
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

const NotesApp: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState<number | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState<number | null>(null);
    const [view, setView] = useState<'notes' | 'todos'>('notes'); // New state for managing views

    const [todos, setTodos] = useState<ToDo[]>([]);
const [currentToDoId, setCurrentToDoId] = useState<number | null>(null);
const [taskTitle, setTaskTitle] = useState('');
const [tasks, setTasks] = useState<Task[]>([]);


    useEffect(() => {
        const savedNotesJson = localStorage.getItem('notes');
        if (savedNotesJson) {
            const savedNotes = JSON.parse(savedNotesJson);
            setNotes(savedNotes);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        const currentDate = new Date();
        const month = months[currentDate.getMonth()];
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();

        const newNote: Note = {
            id: notes.length + 1,
            title,
            description,
            date: `${month} ${day}, ${year}`,
            completed: false
        };

        if (!isUpdate) {
            setNotes([...notes, newNote]);
        } else {
            const updatedNotes = [...notes];
            const indexToUpdate = updatedNotes.findIndex(note => note.id === updateId);
            if (indexToUpdate !== -1) {
                updatedNotes[indexToUpdate] = { ...newNote, id: updateId };
                setNotes(updatedNotes);
            }
            setIsUpdate(false);
        }

        setTitle('');
        setDescription('');
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
        setPopupVisible(false);
        document.body.style.overflow = 'auto';
    };

    const toggleMenu = (noteId: number) => {
        setMenuOpen(menuOpen === noteId ? null : noteId);
    };

    const toggleCompletion = (noteId: number) => {
        const updatedNotes = notes.map(note =>
            note.id === noteId ? { ...note, completed: !note.completed } : note
        );
        setNotes(updatedNotes);
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
    
        resetForm();
    };
    
    const resetForm = () => {
        setIsUpdate(false);
        setTitle('');
        setDescription('');
        setTasks([]);
        setTaskTitle('');
        setCurrentToDoId(null);
    };

    return (
        <>
            <Banner bgImage='../inner-hero-img.jpg'>
                {view === 'notes' ? 'Notes App' : 'To-Do List App'}
            </Banner>
            <ContentContainer className={view === 'notes' ? "notes-app-container" : "todos-app-container"}>
                <div className="view-toggle">
                    <button onClick={() => setView('notes')} className={view === 'notes' ? 'active' : ''}>Notes</button>
                    <button onClick={() => setView('todos')} className={view === 'todos' ? 'active' : ''}>To-Do List</button>
                </div>
    
                {popupVisible && (
                    <div className="popup-box">
                        <div className="popup">
                            <div className="content">
                                <header>
                                    <p>{view === 'notes' ? (isUpdate ? 'Update a Note' : 'Add a new Note') : (isUpdate ? 'Update a To-Do' : 'Add a new To-Do')}</p>
                                    <i className="close-icon" onClick={closePopup}><FaXmark /></i>
                                </header>
                                <form>
                                    <div className="row title">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    {view === 'todos' && (
                                        <div className="row tasks">
                                            <label>Tasks</label>
                                            <input
                                                type="text"
                                                placeholder="Task Title"
                                                value={taskTitle}
                                                onChange={(e) => setTaskTitle(e.target.value)}
                                            />
                                            <button type="button" onClick={addTask}>Add Task</button>
                                            <ul>
                                                {tasks.map(task => (
                                                    <li key={task.id}>
                                                        <input
                                                            type="checkbox"
                                                            checked={task.completed}
                                                            onChange={() => toggleTaskCompletion(task.id)}
                                                        />
                                                        {task.title}
                                                        <button onClick={() => removeTask(task.id)}>Remove</button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="row description">
                                        <label>Description</label>
                                        <textarea
                                            placeholder="Description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <button type="button" onClick={view === 'notes' ? addNote : addOrUpdateToDo}>
                                        {isUpdate ? (view === 'notes' ? 'Update Note' : 'Update To-Do') : (view === 'notes' ? 'Add Note' : 'Add To-Do')}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
    
                {view === 'notes' && (
                    <div className="notes-app">
                        <ul className="wrapper">
                            <li className="add-box" onClick={openPopup}>
                                <div className="icon"><FaPlus /></div>
                                <p>Add new note</p>
                            </li>
                            {notes.map((note) => (
                                <li key={note.id} className={`note ${note.completed ? 'completed' : ''}`}>
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
                                        <button onClick={() => toggleCompletion(note.id)}>
                                            {note.completed ? 'Undo' : 'Complete'}
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
    
                {view === 'todos' && (
                    <div className="todos-app">
                        <ul className="wrapper">
                            <li className="add-box" onClick={openPopup}>
                                <div className="icon"><FaPlus /></div>
                                <p>Add new to-do</p>
                            </li>
                            {todos.map((todo) => (
                                <li key={todo.id} className="todo">
                                    <div className="details">
                                        <p>{todo.title}</p>
                                        {todo.tasks.map(task => (
                                            <div key={task.id} className="task">
                                                <input
                                                    type="checkbox"
                                                    checked={task.completed}
                                                    onChange={() => toggleTaskCompletion(task.id)}
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
                )}
            </ContentContainer>
        </>
    );
    
};

export default NotesApp;
