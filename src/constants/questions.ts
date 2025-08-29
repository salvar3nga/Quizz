import type { Question } from "./question";

export const questions: Question[] = [
  {
    type: "mcq",
    category: "Geography",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "2",
  },
  {
    type: "mcq",
    question: "Which river runs through Baghdad?",
    options: ["Tigris", "Euphrates", "Nile", "Amazon"],
    answer: "0",
    category: "Geography",
  },
  {
    type: "mcq",
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "3",
    category: "Geography",
  },
  {
    type: "text",
    category: "History",
    question: "Who was the first president of the USA?",
    answer: ["George Washington", "George W.", "G. Washington"],
  },
  {
    type: "image",
    category: "Geography",
    question: "Name the country",
    answer: "Angola",
    imageUrl: "../../public/flags/Angola.png"
  },
  // General Knowledge
  {
    type: "mcq",
    category: "General Knowledge",
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "HO2"],
    answer: "1",
  },
  {
    type: "text",
    category: "General Knowledge",
    question: "How many continents are there on Earth?",
    answer: ["7", "seven"],
  },
  {
    type: "mcq",
    category: "General Knowledge",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "1",
  },
  // Science
  {
    type: "mcq",
    category: "Science",
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "2",
  },
  {
    type: "text",
    category: "Science",
    question: "What is the process by which plants make their food?",
    answer: ["Photosynthesis", "photosynthesis"],
  },
  {
    type: "mcq",
    category: "Science",
    question: "What is the boiling point of water at sea level?",
    options: ["100°C", "0°C", "50°C", "212°C"],
    answer: "0",
  },
  // History
  {
    type: "mcq",
    category: "History",
    question: "In which year did World War II end?",
    options: ["1942", "1945", "1939", "1950"],
    answer: "1",
  },
  {
    type: "text",
    category: "History",
    question: "Who wrote the Declaration of Independence?",
    answer: ["Thomas Jefferson", "Jefferson"],
  },
  {
    type: "mcq",
    category: "History",
    question: "Which ancient civilization built the pyramids?",
    options: ["Romans", "Egyptians", "Greeks", "Mayans"],
    answer: "1",
  },
  // Geography
  {
    type: "mcq",
    category: "Geography",
    question: "Which continent is the Sahara Desert located in?",
    options: ["Asia", "Africa", "Australia", "Europe"],
    answer: "1",
  },
  {
    type: "mcq",
    category: "Geography",
    question: "Mount Everest is located in which mountain range?",
    options: ["Andes", "Rockies", "Himalayas", "Alps"],
    answer: "2",
  },
  {
    type: "text",
    category: "Geography",
    question: "What is the smallest country in the world?",
    answer: ["Vatican City", "The Vatican"],
  },
  {
    type: "image",
    category: "Geography",
    question: "Name the country",
    answer: "Lebanon",
    imageUrl: "../../public/flags/Lebanon.png"
  },
];

