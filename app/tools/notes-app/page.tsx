'use client';
import React, { useState, useEffect } from 'react';
import './NotesApp.css';
import Banner from '@/app/components/Banner/Banner';
import ContentContainer from '@/app/components/ContentContainer';
import { FaPlus, FaXmark, FaEllipsis, FaPen, FaTrash } from 'react-icons/fa6';

interface Note {
    id: number; // Ensure id is defined
    title: string;
    description: string;
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
            id: notes.length + 1, // Generate a unique id
            title,
            description,
            date: `${month} ${day}, ${year}`
        };

        if (!isUpdate) {
            setNotes([...notes, newNote]);
        } else {
            const updatedNotes = [...notes];
            const indexToUpdate = updatedNotes.findIndex(note => note.id === updateId);
            if (indexToUpdate !== -1) {
                updatedNotes[indexToUpdate] = newNote;
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
                setIsUpdate(false); // Reset update state if necessary
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

    return (
        <>
            <Banner bgImage='../inner-hero-img.jpg'>
                Notes App
            </Banner>
            <ContentContainer className="notes-app-container">
                <div className="notes-app">
                    {popupVisible && (
                        <div className="popup-box">
                            <div className="popup">
                                <div className="content">
                                    <header>
                                        <p>{isUpdate ? 'Update a Note' : 'Add a new Note'}</p>
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
                                        <div className="row description">
                                            <label>Description</label>
                                            <textarea
                                                placeholder="Description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <button type="button" onClick={addNote}>
                                            {isUpdate ? 'Update Note' : 'Add Note'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    <ul className="wrapper">
                        <li className="add-box" onClick={openPopup}>
                            <div className="icon"><FaPlus /></div>
                            <p>Add new note</p>
                        </li>
                        {notes.map((note: Note) => (
                            <li key={note.id} className="note">
                                <div className="details">
                                    <p>{note.title}</p>
                                    <span>{note.description}</span>
                                </div>
                                <div className="bottom-content">
                                    <span>{note.date}</span>
                                    <div className="settings">
                                        <button className="menu-button" onClick={() => toggleMenu(note.id)}>
                                            <FaEllipsis />
                                        </button>
                                        {menuOpen === note.id && (
                                            <ul className="menu">
                                                <li onClick={() => { updateNote(note.id, note.title, note.description); setMenuOpen(null); }}>
                                                    <FaPen /> Edit
                                                </li>
                                                <li onClick={() => { deleteNote(note.id); setMenuOpen(null); }}>
                                                    <FaTrash /> Delete
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </ContentContainer>
        </>
    );
};

export default NotesApp;
