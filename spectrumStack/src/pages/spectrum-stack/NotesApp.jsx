import { useState, useEffect } from 'react';
import { FaPlus, FaXmark, FaEllipsis, FaPen, FaTrash } from 'react-icons/fa6';

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const NotesApp = () => {
    const [items, setItems] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(null);
    const [view, setView] = useState('notes');
    const [currentToDoId, setCurrentToDoId] = useState(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [savedToDoId, setSavedToDoId] = useState(null); // Track saved To-Do ID
    const [itemType, setItemType] = useState('note');

    useEffect(() => {
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
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

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
        setSavedToDoId(null); // Reset saved To-Do ID
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
        <div className="notes-todos-app-container h-100">
            {popupVisible && (
                <div className="popup-box">
                    <div className="popup">
                        <div className="content">
                            <header>
                                <p>{isUpdate ? (itemType === 'note' ? 'Update a Note' : 'Update a To-Do') : (itemType === 'note' ? 'Add a new Note' : 'Add a new To-Do')}</p>
                                <i className="close-icon" onClick={closePopup}><FaXmark /></i>
                            </header>
                            <div className="view-toggle mb-4 d-flex justify-content-center">
                                <button onClick={() => setItemType('note')} className={`w-50 btn-toggle ${itemType === 'note' ? 'active' : null}`}>Note</button>
                                <button onClick={() => setItemType('todo')} className={`w-50 btn-toggle ${itemType === 'todo' ? 'active' : null}`}>To-Do List</button>
                            </div>
                            <form>
                                <div className="title mb-4">
                                    <label className="form-label mb-1">Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                {itemType === 'todo' && (
                                    <div className="tasks mb-4">
                                        <label className="form-label mb-1">Tasks</label>
                                        <input
                                            type="text"
                                            placeholder="Task Title"
                                            value={taskTitle}
                                            onChange={(e) => setTaskTitle(e.target.value)}
                                            className="form-control"
                                        />

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


                                                    <button type="button" className="btn-remove d-flex align-items-center justify-content-center" onClick={() => removeTask(task.id)}>
                                                        <i className="close-icon"><FaXmark /></i>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {itemType === 'note' && (
                                    <div className="description mb-4">
                                        <label className="form-label mb-1">Description</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                )}
                                <div className="d-flex gap-2 mt-4">
                                    {itemType === 'todo' && (
                                        <button type="button" className="btn btn-gradient" onClick={addTask}>Add Task</button>)}
                                    <button type="button" className="btn btn-violet" onClick={addItem}>
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
        </div>
    )
}

export default NotesApp