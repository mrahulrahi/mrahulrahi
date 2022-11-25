const questions = [
  {
    prompt: "How many sizes of headers are available in HTML by default?",
    correctAnswer: "6",
    answers: ["5", "1", "3", "6"],
  },
  {
    prompt:
      "Which attribute is used to provide a unique name to an HTML element?",
    correctAnswer: "id",
    answers: ["id", "class", "type", "None of the above"],
  },
  {
    prompt: "Which property allows an image link to show a text label?",
    correctAnswer: "alt",
    answers: ["alt", "str", "alternative", "None of the above"],
  },
  {
    prompt:
      "The CSS property used to specify the transparency of an element is?",
    correctAnswer: "opacity",
    answers: ["opacity", "visibility", "filter", "None of the above"],
  },
  {
    prompt:
      "Which of the following CSS property is used to specify the space between every letter inside an element?",
    correctAnswer: "letter-spacing",
    answers: [
      "alpha-spacing",
      "character-spacing",
      "letter-spacing",
      "alphabet-spacing",
    ],
  },
  {
    prompt:
      "The CSS property used to specify whether the text is written in the horizontal or vertical direction?",
    correctAnswer: "writing-mode",
    answers: ["writing-mode", "text-indent", "word-break", "None of the above"],
  },
  {
    prompt: "In JavaScript, what kind of scoping is used?",
    correctAnswer: "Lexical scoping",
    answers: [
      "Literal scoping",
      "Sequential scoping",
      "Segmental scoping",
      "Lexical scoping",
    ],
  },
  {
    prompt: "Which of the following is not a JavaScript Data Types?",
    correctAnswer: "Float",
    answers: ["Boolean", "Undefined", "Number", "Float"],
  },
  {
    prompt: "Which of the following is not a JavaScript framework or library?",
    correctAnswer: "Cassandra",
    answers: ["Polymer", "Meteor", "jQuery", "Cassandra"],
  },
  {
    prompt: "What was the original name of JavaScript when it discovered?",
    correctAnswer: "Mocha",
    answers: ["LiveScript", "EScript", "JScript", "Mocha"],
  },
];
console.log(Object.keys(questions[0]["prompt"]));
