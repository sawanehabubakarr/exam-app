import { exams } from '../data/exams';

function findExam(subjectId) {
  const exam = exams.find((item) => item.id === Number(subjectId));
  if (!exam) {
    throw new Error('Exam not found');
  }
  return exam;
}

function withoutCorrectAnswer(question) {
  const { correctAnswer, ...safeQuestion } = question;
  return safeQuestion;
}

function isAnswerCorrect(question, answer) {
  const studentAnswer = (answer ?? '').toString().trim().toLowerCase();
  const correctAnswer = question.correctAnswer.toString().trim().toLowerCase();
  return studentAnswer === correctAnswer;
}

export async function fetchSubjects() {
  return exams.map(({ questions, ...subject }) => ({
    ...subject,
    question_count: questions.length,
  }));
}

export async function fetchQuestions(subjectId) {
  return findExam(subjectId).questions.map(withoutCorrectAnswer);
}

export async function submitExam(subjectId, studentName, answers) {
  if (!studentName || !Array.isArray(answers)) {
    throw new Error('studentName and answers[] are required');
  }

  const exam = findExam(subjectId);
  const answersByQuestionId = answers.reduce((acc, item) => {
    acc[Number(item.questionId)] = item.answer;
    return acc;
  }, {});

  let score = 0;
  const totalPoints = exam.questions.reduce((sum, question) => sum + question.points, 0);

  const breakdown = exam.questions.map((question) => {
    const yourAnswer = (answersByQuestionId[question.id] ?? '').toString().trim();
    const isCorrect = isAnswerCorrect(question, yourAnswer);
    const pointsAwarded = isCorrect ? question.points : 0;
    score += pointsAwarded;

    return {
      questionId: question.id,
      yourAnswer,
      isCorrect,
      pointsAwarded,
    };
  });

  return {
    attemptId: Date.now(),
    score,
    totalPoints,
    percentage: totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0,
    breakdown,
  };
}
