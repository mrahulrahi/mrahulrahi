'use client';

import Highlight from 'react-highlight';

export default function JSBasicsCard() {
    // JS logic defined outside JSX
    function fullName(first, last) {
        return (first + " " + last)
    }

    let num = 5;
    var age;
    let name;

    let message = "Hello World!";
    let _message = "Hello World!!";
    let $message = "Hello World!!!!";
    num = 10;
    name = fullName('Rahul', 'Rahi');

    return (
        <div>
            <Highlight className="javascript">
                {`function fullName(first, last) {
    console.log(first + " " + last)
}

fullName('Rahul', 'Maurya');

let num = 5;
var age;
let name;

let message = "Hello World!";
let _message = "Hello World!!";
let $message = "Hello World!!!!";
num =10;
name = fullName('Rahul', 'Rahi');

console.log(num);
console.log(age);
console.log(message);
console.log(_message);
console.log($message);
console.log(name);`}
            </Highlight>

            <div className="mt-4 text-white">
                <p>Full Name: {fullName('Rahul', 'Maurya')}</p>
                <p>Num: {num}</p>
                <p>Age: {age !== undefined ? age : 'undefined'}</p>
                <p>Message: {message}</p>
                <p>_Message: {_message}</p>
                <p>$Message: {$message}</p>
                <p>Name: {name}</p>
            </div>
        </div>
    );
}
