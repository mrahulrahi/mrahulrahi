import { Routes, Route } from 'react-router';
import { useGradient } from '../context/GradientContext.jsx';
import App from '../App.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import GradientSelector from '../components/GradientSelector';
import Product from '../pages/home/productSingle.jsx';
import Blog from '../pages/blog/blogs.jsx';
import BlogPost from '../pages/blog/blogSingle.jsx';
import NotFound from '../pages/NotFound.jsx';
import CodeStack from '../pages/code-stack/codeStack.jsx';
import JsStack from '../pages/code-stack/jsStack.jsx';
import PhpStack from '../pages/code-stack/phpStack.jsx';
import CodeStackLayout from "../layouts/CodeStackLayout.jsx";
import QuizApp from '../pages/code-stack/tools/QuizApp.jsx';
import CalculatorApp from '../pages/code-stack/tools/CalculatorApp.jsx';
import NotesApp from '../pages/code-stack/tools/NotesApp.jsx';
import WeatherApp from '../pages/code-stack/tools/WeatherApp.jsx';
import QuoteApp from '../pages/code-stack/tools/QuoteApp.jsx';


const AppRoutes = () => {
    const { gradientStyle, changeGradientColor } = useGradient();

    console.log("Gradient Style in Tools:", gradientStyle);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Routes>
                {/* Home Route */}
                <Route path="/">
                    <Route index element={<App />} />
                    <Route path="products/:pid" element={<Product />} />  {/* Dynamic product page route */}
                </Route>

                {/* Blog Routes */}
                <Route path="blog">
                    <Route index element={<Blog />} />  {/* Default Blog route */}
                    <Route path=":blogId" element={<BlogPost />} />  {/* Dynamic BlogPost route */}
                </Route>

                <Route path="code-stack" element={<CodeStackLayout />}>
                    <Route index element={<CodeStack />} />
                    <Route path="js-stack" element={<JsStack />} />
                    <Route path="php-stack" element={<PhpStack />} />
                    <Route path="quiz-app" element={<QuizApp gradientColor={gradientStyle} />} />
                    <Route path="calculator-app" element={<CalculatorApp />} />
                    <Route path="notes-app" element={<NotesApp />} />
                    <Route path="weather-app" element={<WeatherApp gradientColor={gradientStyle} />} />
                    <Route path="quote-app" element={<QuoteApp gradientColor={gradientStyle} onClick={changeGradientColor} />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <GradientSelector />
        </div>
    )
}

export default AppRoutes