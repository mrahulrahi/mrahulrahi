// QuoteGenerator.js
'use client'
import React, { useState, useEffect } from 'react';
import './QuoteGenerator.css';
import Banner from '@/app/components/Banner/Banner';
import ContentContainer from '@/app/components/ContentContainer';
import { FaQuoteLeft, FaTwitter, FaTumblr } from 'react-icons/fa';



const QuoteGenerator = () => {
    const [currentQuote, setCurrentQuote] = useState('');
    const [currentAuthor, setCurrentAuthor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');

    const colors = [
        "#16a085",
        "#27ae60",
        "#2c3e50",
        "#f39c12",
        "#e74c3c",
        "#9b59b6",
        "#FB6964",
        "#342224",
        "#472E32",
        "#BDBB99",
        "#77B1A9",
        "#73A857"
    ];

    const getRandomQuote = async () => {
        try {
            const response = await fetch(
                'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
            );
            if (response.ok) {
                const jsonQuotes = await response.json();
                const randomIndex = Math.floor(Math.random() * jsonQuotes.quotes.length);
                return jsonQuotes.quotes[randomIndex];
            } else {
                console.error('Error fetching quotes:', response.status);
                return null;
            }
        } catch (error) {
            console.error('Error fetching quotes:', error);
            return null;
        }
    };

    const updateQuote = async () => {
        const { quote, author } = await getRandomQuote();
        setCurrentQuote(quote);
        setCurrentAuthor(author);
        changeBackgroundColor();
    };

    useEffect(() => {
        updateQuote();
    }, []);

    const changeBackgroundColor = () => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        setBackgroundColor(color);
    };

    return (
        <div className="transition" style={{ backgroundColor, color: backgroundColor }}>
            <Banner bgImage="../inner-hero-img.jpg">Random Quote Machine</Banner>

            <ContentContainer>
                {!currentQuote ? (
                    <p>Loading quotes...</p>
                ) : (
                    <div className="quote-generator d-flex align-items-center justify-content-center" >
                        <div className="quote-box">
                            <div className="quote-text">
                                <span className="quote-icon"><FaQuoteLeft /></span>
                              {currentQuote}
                            </div>
                            <div className="quote-author">- {currentAuthor}</div>
                            <div className="quote-btn-group d-flex justify-content-between">
                                <div className="d-flex gap-2">
                                    <a
                                        className="quote-btn share-btn" style={{ backgroundColor: backgroundColor }}
                                        href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${currentQuote}" ${currentAuthor}`}
                                        title="Tweet this quote!"
                                        target="_top"
                                    >
                                        <FaTwitter />
                                    </a>
                                    <a
                                        className="quote-btn share-btn" style={{ backgroundColor: backgroundColor }}
                                        href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption="${currentQuote}" ${currentAuthor}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
                                        title="Tumblr this quote!"
                                        target="_top"
                                    >
                                        <FaTumblr />
                                    </a>
                                </div>

                                <button className="quote-btn" onClick={updateQuote} style={{ backgroundColor: backgroundColor }}>
                                    New quote
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </ContentContainer>


        </div>
    );
};

export default QuoteGenerator;
