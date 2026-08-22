'use client'
import { useState, useEffect } from 'react';
import { FaPlus, FaXmark, FaEllipsis, FaPen, FaTrash } from 'react-icons/fa6';
import { useGradient } from '@/app/context/GradientContext';

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const NotesWidget = () => {
    const context = useGradient();
    const gradientStyle = context ? context.gradientStyle : { backgroundImage: 'linear-gradient(to right, #00DC82, #00B159)' };

    const [items, setItems] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(null);
    const [currentToDoId, setCurrentToDoId] = useState(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [savedToDoId, setSavedToDoId] = useState(null);
    const [itemType, setItemType] = useState('note');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedItemsJson = localStorage.getItem('items');
        if (savedItemsJson) {
            try {
                const savedItems = JSON.parse(savedItemsJson);
                setItems(savedItems);
            } catch (error) {
                console.error('Failed to parse items from localStorage', error);
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('items', JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addItem = () => {
        const currentDate = new Date();
        const month = months[currentDate.getMonth()];
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();

        const newItem = {
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

    const deleteItem = (itemId) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            const updatedItems = items.filter(item => item.id !== itemId);
            setItems(updatedItems);
            if (updateId === itemId) {
                setIsUpdate(false);
            }
        }
    };

    const updateItem = (item) => {
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
        setSavedToDoId(null);
        setPopupVisible(false);
        document.body.style.overflow = 'auto';
    };

    const toggleMenu = (itemId) => {
        setMenuOpen(menuOpen === itemId ? null : itemId);
    };

    const addTask = () => {
        if (taskTitle.trim()) {
            const newTask = {
                id: Date.now(),
                title: taskTitle,
                completed: false
            };
            setTasks([...tasks, newTask]);
            setTaskTitle('');
        }
    };

    const removeTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const toggleTaskCompletion = (taskId) => {
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

    return (
        <div className="notes-todos-app-container py-3 px-3 md:py-5 md:px-5 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md w-full h-full min-h-[400px]">
            {popupVisible && (
                <div className="popup-box fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="popup bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl">
                        <div className="content p-6">
                            <header className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                                <p className="bg-clip-text text-transparent font-bold text-lg" style={gradientStyle}>
                                    {isUpdate ? (itemType === 'note' ? 'Update a Note' : 'Update a To-Do') : (itemType === 'note' ? 'Add a new Note' : 'Add a new To-Do')}
                                </p>
                                <button className="close-icon text-slate-400 hover:text-white" onClick={closePopup}><FaXmark /></button>
                            </header>
                            
                            <div className="view-toggle mb-6 flex justify-center bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                                <button onClick={() => setItemType('note')} className={`w-1/2 py-2 text-xs font-bold rounded-lg cursor-pointer transition-colors ${itemType === 'note' ? 'bg-brand-mint/10 border border-brand-mint/20 text-brand-mint' : 'text-slate-400'}`}>Note</button>
                                <button onClick={() => setItemType('todo')} className={`w-1/2 py-2 text-xs font-bold rounded-lg cursor-pointer transition-colors ${itemType === 'todo' ? 'bg-brand-mint/10 border border-brand-mint/20 text-brand-mint' : 'text-slate-400'}`}>To-Do List</button>
                            </div>
                            
                            <form className="space-y-4">
                                <div className="title flex flex-col gap-1">
                                    <label className="form-label text-slate-400 font-mono text-[10px] uppercase">Title</label>
                                    <input
                                        className="form-control bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-slate-700"
                                        type="text"
                                        placeholder="Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                {itemType === 'todo' && (
                                    <div className="tasks flex flex-col gap-2">
                                        <label className="form-label text-slate-400 font-mono text-[10px] uppercase">Tasks</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Task Title"
                                                value={taskTitle}
                                                onChange={(e) => setTaskTitle(e.target.value)}
                                                className="form-control bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-sm grow focus:outline-none"
                                            />
                                            <button type="button" className="btn btn-gradient px-4 py-2 border border-slate-800 rounded-xl text-xs font-bold shrink-0 hover:border-slate-700" onClick={addTask}>Add Task</button>
                                        </div>

                                        <ul className="task-list space-y-2 mt-2 max-h-40 overflow-y-auto pr-1">
                                            {tasks.map(task => (
                                                <li key={task.id} className="flex items-center justify-between bg-slate-950/40 border border-slate-800/80 p-2.5 rounded-xl">
                                                    <div className="custom-checkbox-wrapper flex items-center gap-2">
                                                        <label htmlFor={`popup-${task.id}`} className="item flex items-center gap-2.5 cursor-pointer">
                                                            <input type="checkbox" id={`popup-${task.id}`} className="hidden" checked={task.completed}
                                                                onChange={() => toggleTaskCompletion(task.id)} />
                                                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${task.completed ? 'bg-brand-mint border-brand-mint text-slate-950' : 'border-slate-700'}`}>
                                                                {task.completed && <svg width="10px" height="8px" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="1 7.6 5 11 13 1"></polyline></svg>}
                                                            </div>
                                                            <span className={`text-xs ${task.completed ? 'line-through text-slate-500' : 'text-slate-300'}`}>{task.title}</span>
                                                        </label>
                                                    </div>

                                                    <button type="button" className="btn-remove text-slate-500 hover:text-red-400 p-1" onClick={() => removeTask(task.id)}>
                                                        <FaXmark className="w-3.5 h-3.5" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {itemType === 'note' && (
                                    <div className="description flex flex-col gap-1">
                                        <label className="form-label text-slate-400 font-mono text-[10px] uppercase">Description</label>
                                        <textarea
                                            className="form-control bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-sm min-h-24 focus:outline-none focus:border-slate-700"
                                            placeholder="Description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                )}
                                <div className="flex gap-3 pt-3 border-t border-slate-800/60 mt-4">
                                    <button type="button" className="btn btn-violet w-full py-2 bg-slate-950 hover:bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition-colors" onClick={addItem}>
                                        {isUpdate ? (itemType === 'note' ? 'Update Note' : 'Update To-Do') : (itemType === 'note' ? 'Add Note' : 'Add To-Do')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="notes-todos-app">
                <div className="items-section">
                    <ul className="wrapper grid grid-cols-1 md:grid-cols-2 gap-4">
                        <li className="add-box border border-dashed border-slate-800 hover:border-slate-700 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[160px] cursor-pointer transition-colors" onClick={openPopup}>
                            <div className="icon text-xl p-3 bg-slate-950 border border-slate-800 rounded-full mb-2" style={gradientStyle}><FaPlus /></div>
                            <p className="text-xs font-mono text-slate-400">Add new</p>
                        </li>
                        {items.map((item) => (
                            <li key={item.id} className="note bg-slate-950/40 border border-slate-800/80 rounded-3xl p-5 flex flex-col justify-between min-h-[160px] relative group hover:border-slate-700 transition-colors">
                                <div className="details space-y-2">
                                    <p className="text-sm font-bold text-white leading-snug">{item.title}</p>
                                    {item.type === 'note' ? (
                                        <span className="text-xs text-slate-400 leading-relaxed block max-h-24 overflow-y-auto">{item.description}</span>
                                    ) : (
                                        <div className="space-y-1 max-h-24 overflow-y-auto">
                                            {item.tasks?.map(task => (
                                                <div key={task.id} className="task flex items-center gap-1.5">
                                                    <label htmlFor={`list-${task.id}`} className="item flex items-center gap-2 cursor-pointer">
                                                        <input type="checkbox" id={`list-${task.id}`} className="hidden"
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
                                                        <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${task.completed ? 'bg-brand-mint border-brand-mint text-slate-950' : 'border-slate-800'}`}>
                                                            {task.completed && <svg width="8px" height="6px" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="1 7.6 5 11 13 1"></polyline></svg>}
                                                        </div>
                                                        <span className={`text-[10px] ${task.completed ? 'line-through text-slate-500' : 'text-slate-400'}`}>{task.title}</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="bottom-content flex justify-between items-center mt-4 pt-3 border-t border-slate-800/20">
                                    <span className="text-[10px] font-mono text-slate-500">{item.date}</span>
                                    <div className="settings relative">
                                        <button className="menu-btn p-1 text-slate-500 hover:text-white" onClick={() => toggleMenu(item.id)}>
                                            <FaEllipsis className="w-3.5 h-3.5" />
                                        </button>
                                        {menuOpen === item.id && (
                                            <ul className="menu absolute bottom-6 right-0 bg-slate-900 border border-slate-800 rounded-xl py-1.5 w-24 z-20 shadow-xl text-[10px] font-bold">
                                                <li className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-950 cursor-pointer text-slate-300 hover:text-white" onClick={() => { updateItem(item); setMenuOpen(null); }}>
                                                    <FaPen className="w-2.5 h-2.5" /> Edit
                                                </li>
                                                <li className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-950 cursor-pointer text-red-400 hover:text-red-300" onClick={() => { deleteItem(item.id); setMenuOpen(null); }}>
                                                    <FaTrash className="w-2.5 h-2.5" /> Delete
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
        </div>
    );
};

export default NotesWidget;
