import Hero from "../../components/Hero";
import MiniWindowControl from "./Components/MiniWindowControl";
import FullExample from "./Components/FullExample";
import LoginForm from "./Components/LoginForm";
import Calculator from "./Components/Calculator";
import { StyleManipulator } from "./Components/StyleManipulator";
import PalindromeChecker from "./Components/PalindromeChecker";
import FactorialCalculator from "./Components/FactorialCalculator";
import ParkingPriceCalculator from "./Components/ParkingPriceCalculator";
import BubbleSortAlgorithm from "./Components/BubbleSortAlgorithm";
import TextTransfer from "./Components/TextTransfer";
import SumTwoNumbers from "./Components/SumTwoNumbers";
import DialogExamples from "./Components/DialogExamples";
import LoopType from "./Components/LoopType";
import SwitchCase from "./Components/SwitchCase";
import JSBasicsCard from './Components/JSBasicsCard';
import BirthdayCard from './Components/BirthdayCard';
import PythonToReactDemo from "./Components/PythonToReactDemo";
import ChoiceConverter from "./Components/ChoiceConverter";
import RotatingSquares from "./Components/RotatingSquares";
import GreenCircleMessage from "./Components/GreenCircleMessage";
import RedCircleWithMessage from "./Components/RedCircleWithMessage";
import FibonacciSeries from "./Components/FibonacciSeries";
import QuadraticSolver from "./Components/QuadraticSolver";
import StudentList from "./Components/StudentList";
import StudentRecord from "./Components/StudentRecord";
import DoublyLinkedList from "./Components/DoublyLinkedList";
import SortIntegerList from "./Components/SortIntegerList";
import SubjectAverageCalculator from "./Components/SubjectAverageCalculator";
import StringPermutations from "./Components/StringPermutations";
import ClassDemoComponent from "./Components/ClassDemoComponent";
import EvenNumbersFilter from "./Components/EvenNumbersFilter";
import MultiplicationTable from "./Components/MultiplicationTable";
import ScopeDemo from "./Components/ScopeDemo";



const JsStack = () => {

    return (
        <>
            <Hero bgImg="https://picsum.photos/1920/1000?random=6" title="" subTitle="JS Stack" lessHeight={true} />

            <div className="container my-20 mx-auto">
                <div className="grid grid-cols-2 grid-rows-auto gap-4">
                    {/* Palindrome Checker */}
                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Palindrome Checker
                            </div>

                            <PalindromeChecker />
                        </div>
                    </div>

                    {/* Factorial Calculator */}
                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Factorial Calculator
                            </div>

                            <FactorialCalculator />
                        </div>
                    </div>

                    {/* Parking Price Calculator */}
                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Parking Price Calculator
                            </div>

                            <ParkingPriceCalculator />
                        </div>
                    </div>

                    {/* Bubble Sort Algorithm */}
                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <BubbleSortAlgorithm />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Sum of Two Numbers
                            </div>

                            <SumTwoNumbers />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Switch Case
                            </div>

                            <SwitchCase />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Fibonacci Series Generator
                            </div>

                            <div>
                                <main className="grid place-items-center">
                                    <FibonacciSeries />
                                </main>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Calculator
                            </div>

                            <div>
                                <Calculator />
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Login Form
                            </div>

                            <div>
                                <LoginForm />
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Mini Window & Browser Info
                            </div>

                            <div>
                                <MiniWindowControl />
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Dialog Examples
                            </div>

                            <DialogExamples />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Text Transfer
                            </div>
                            <TextTransfer />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Style Manipulator
                            </div>
                            <div className="mb-2">
                                <StyleManipulator />
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                JS Basics
                            </div>

                            <JSBasicsCard />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Alerts
                            </div>

                            <div className="container flex flex-col gap-4">
                                <p>Alerts are created with the .alert class, followed by a contextual color classes:</p>
                                <div className="alert alert-success">
                                    <strong>Success!</strong> This alert box could indicate a successful or positive action.
                                </div>
                                <div className="alert alert-info">
                                    <strong>Info!</strong> This alert box could indicate a neutral informative change or action.
                                </div>
                                <div className="alert alert-warning">
                                    <strong>Warning!</strong> This alert box could indicate a warning that might need attention.
                                </div>
                                <div className="alert alert-error">
                                    <strong>Danger!</strong> This alert box could indicate a dangerous or potentially negative action.
                                </div>
                                <div className="alert alert-success alert-soft">
                                    <strong>Success!</strong> Indicates an important action.
                                </div>
                                <div className="alert  alert-info alert-soft">
                                    <strong>Info!</strong> Indicates a slightly less important action.
                                </div>
                                <div className="alert alert-warning alert-soft">
                                    <strong>Warning!</strong> Dark grey alert.
                                </div>
                                <div className="alert alert-error alert-soft">
                                    <strong>Danger!</strong> Light grey alert.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Loops in JS
                            </div>

                            <LoopType />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Full Example
                            </div>

                            <div>
                                <FullExample />
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Full Example
                            </div>

                            <div>
                                <main className="grid place-items-center">
                                    <BirthdayCard />
                                </main>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Full Example
                            </div>

                            <div>
                                <main className="grid place-items-center">
                                    <PythonToReactDemo />
                                </main>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Full Example
                            </div>

                            <div>
                                <main className="grid place-items-center">
                                    <ChoiceConverter />
                                </main>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Full Example
                            </div>

                            <div>
                                <main className="grid place-items-center">
                                    <RotatingSquares />
                                </main>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Full Example
                            </div>

                            <div>
                                <main className="grid place-items-center">
                                    <GreenCircleMessage />
                                </main>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Full Example
                            </div>

                            <div>
                                <main className="grid place-items-center">
                                    <RedCircleWithMessage />
                                </main>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Quadratic Equation Solver
                            </div>
                            <p className="mb-2">Quadratic equations are in the form <strong>ax² + bx + c = 0</strong></p>

                            <div>
                                <main className="grid place-items-center">
                                    <QuadraticSolver />
                                </main>
                            </div>
                        </div>
                    </div>

                    <div className="w-full col-span-2">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <StudentList />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <StudentRecord />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Doubly Linked List Operations
                            </div>

                            <div>
                                <main className="grid place-items-center">
                                    <DoublyLinkedList />
                                </main>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Sort Integer List
                            </div>

                            <div>
                                <main className="grid place-items-center">
                                    <SortIntegerList />
                                </main>
                            </div>
                        </div>
                    </div>


                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Subject Average Calculator
                            </div>

                            <div>
                                <main className="grid place-items-center">
                                    <SubjectAverageCalculator />
                                </main>
                            </div>
                        </div>
                    </div>


                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                String Permutation Generator
                            </div>

                            <div>
                                <main className="grid place-items-center">
                                    <StringPermutations />
                                </main>
                            </div>
                        </div>
                    </div>


                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                                Class Demo Simulation (C++ → React)
                            </div>

                            <div>
                                <main className="grid place-items-center">
                                    <ClassDemoComponent />
                                </main>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <EvenNumbersFilter />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <MultiplicationTable />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-white/10 p-8 rounded-xl">
                            <ScopeDemo />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default JsStack;
