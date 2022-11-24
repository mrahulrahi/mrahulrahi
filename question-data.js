const questions = [
    {
        prompt: "What is the only country that lemurs are nativ to?",
        correctAnswer: "Madagascar",
        answers: ["Madagascar", "Japan", "Brazil", "Romania"]
    },
    {
        prompt: "What is the worlds largest mammal?",
        correctAnswer: "Blue Whale",
        answers: ["Blue Whale", "Polar Bear", "Sperm Whale", "Humpback Whale"]
    },
    {
        prompt: "What is the largest fish species?",
        correctAnswer: "Whale Shark",
        answers: ["Whale Shark", "Great White Shark", "Sturgeon", "Basking Shark"]
    },
    {
        prompt: "What type of tree is the largest in the world?",
        correctAnswer: "Redwood",
        answers: ["Redwood", "Oak", "Sequoias", "Eucalyptus"]
    },
    {
        prompt: "what is the worlds fastest bird?",
        correctAnswer: "Peregrine Falcon",
        answers: ["Peregrine Falcon", "Golden Eagle", "Frigate Bird", "Gryfalcon"]
    }
];
console.log(Object.keys(questions[0]['prompt']));