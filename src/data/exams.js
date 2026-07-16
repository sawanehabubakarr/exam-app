export const exams = [
  {
    id: 1,
    name: 'Mathematics',
    description: 'Basic arithmetic and algebra',
    duration_minutes: 20,
    questions: [
      {
        id: 1,
        questionText: 'What is 7 + 5?',
        questionType: 'mcq',
        correctAnswer: 'B',
        points: 1,
        options: [
          { label: 'A', text: '10' },
          { label: 'B', text: '12' },
          { label: 'C', text: '13' },
          { label: 'D', text: '15' },
        ],
      },
      {
        id: 2,
        questionText: 'A right angle measures 90 degrees.',
        questionType: 'true_false',
        correctAnswer: 'true',
        points: 1,
      },
      {
        id: 3,
        questionText: 'What is the square root of 81?',
        questionType: 'short_answer',
        correctAnswer: '9',
        points: 1,
      },
    ],
  },
  {
    id: 2,
    name: 'English Language',
    description: 'Grammar and vocabulary basics',
    duration_minutes: 20,
    questions: [
      {
        id: 4,
        questionText: 'Choose the correctly spelled word.',
        questionType: 'mcq',
        correctAnswer: 'C',
        points: 1,
        options: [
          { label: 'A', text: 'Recieve' },
          { label: 'B', text: 'Receeve' },
          { label: 'C', text: 'Receive' },
          { label: 'D', text: 'Receve' },
        ],
      },
      {
        id: 5,
        questionText: '"Their" and "there" are spelled the same way.',
        questionType: 'true_false',
        correctAnswer: 'false',
        points: 1,
      },
      {
        id: 6,
        questionText: 'What is the capital city of Sierra Leone?',
        questionType: 'short_answer',
        correctAnswer: 'Freetown',
        points: 1,
      },
    ],
  },
];
