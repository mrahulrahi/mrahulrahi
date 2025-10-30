import { useState, useEffect } from 'react';
import { FiShare, FiCopy } from "react-icons/fi";
import { FaQuoteLeft } from 'react-icons/fa';


const QuoteApp = ( gradientColor, onClick ) => {
    const [currentQuote, setCurrentQuote] = useState('');
    const [currentAuthor, setCurrentAuthor] = useState('');

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
        onClick();
    };

    useEffect(() => {
        updateQuote();
    }, []);



    const copyToClipboard = () => {
        navigator.clipboard.writeText(`"${currentQuote}" - ${currentAuthor}`);
        alert('Quote copied to clipboard!!!');
    };


    const shareQuote = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Quote',
                text: `"${currentQuote}" - ${currentAuthor}`,
            }).catch((error) => console.error('Error sharing', error));
        } else {
            alert('Share feature is not supported in your browser.');
        }
    };

    return (
        <div className="quote-wrapper">
            <div className="quote-box d-flex flex-column mb-3">
                <span className="quote-icon"><FaQuoteLeft /></span>
                <div className={`quote-text bg-clip-text text-transparent ${gradientColor}`}>
                    {currentQuote}
                </div>
                <div className={`quote-author mt-auto bg-clip-text text-transparent ${gradientColor}`}>- {currentAuthor}</div>
            </div>

            <div className="quote-btn-group d-flex flex-shrink-0 gap-2">
                <button className="btn-transparent" onClick={shareQuote} title="Share this quote">
                    <span className="btn-transparent-icon"><FiShare /></span>
                </button>

                <button className="btn-transparent" onClick={copyToClipboard} title="Copy to clipboard">
                    <span className="btn-transparent-icon"><FiCopy /></span>
                </button>

                <button className="btn-transparent lg" onClick={updateQuote} >
                    <span className={`btn-transparent-text bg-clip-text text-transparent ${gradientColor}`}>New quote</span>
                </button>
            </div>
        </div>
    )
}

export default QuoteApp