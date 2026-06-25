import MiniWindowControl from "@/app/components/code-stack/MiniWindowControl";
import FullExample from "@/app/components/code-stack/FullExample";
import LoginForm from "@/app/components/code-stack/LoginForm";
import Calculator from "@/app/components/code-stack/Calculator";
import { StyleManipulator } from "@/app/components/code-stack/StyleManipulator";
import PalindromeChecker from "@/app/components/code-stack/PalindromeChecker";
import FactorialCalculator from "@/app/components/code-stack/FactorialCalculator";
import ParkingPriceCalculator from "@/app/components/code-stack/ParkingPriceCalculator";
import BubbleSortAlgorithm from "@/app/components/code-stack/BubbleSortAlgorithm";
import TextTransfer from "@/app/components/code-stack/TextTransfer";
import SumTwoNumbers from "@/app/components/code-stack/SumTwoNumbers";
import DialogExamples from "@/app/components/code-stack/DialogExamples";
import LoopType from "@/app/components/code-stack/LoopType";
import SwitchCase from "@/app/components/code-stack/SwitchCase";
import JSBasicsCard from '@/app/components/code-stack/JSBasicsCard';
import BirthdayCard from '@/app/components/code-stack/BirthdayCard';
import PythonToReactDemo from "@/app/components/code-stack/PythonToReactDemo";
import ChoiceConverter from "@/app/components/code-stack/ChoiceConverter";
import RotatingSquares from "@/app/components/code-stack/RotatingSquares";
import GreenCircleMessage from "@/app/components/code-stack/GreenCircleMessage";
import RedCircleWithMessage from "@/app/components/code-stack/RedCircleWithMessage";
import FibonacciSeries from "@/app/components/code-stack/FibonacciSeries";
import QuadraticSolver from "@/app/components/code-stack/QuadraticSolver";
import StudentList from "@/app/components/code-stack/StudentList";
import StudentRecord from "@/app/components/code-stack/StudentRecord";
import DoublyLinkedList from "@/app/components/code-stack/DoublyLinkedList";
import SortIntegerList from "@/app/components/code-stack/SortIntegerList";
import SubjectAverageCalculator from "@/app/components/code-stack/SubjectAverageCalculator";
import StringPermutations from "@/app/components/code-stack/StringPermutations";
import ClassDemoComponent from "@/app/components/code-stack/ClassDemoComponent";
import EvenNumbersFilter from "@/app/components/code-stack/EvenNumbersFilter";
import MultiplicationTable from "@/app/components/code-stack/MultiplicationTable";
import ScopeDemo from "@/app/components/code-stack/ScopeDemo";



const JsStack = () => {

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-auto gap-4">
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

                <div className="w-full md:col-span-2">
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
        </>
    );
};

export default JsStack;
