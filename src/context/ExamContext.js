import React, { createContext, useContext, useMemo, useState } from 'react';

const ExamContext = createContext(null);

export function ExamProvider({ children }) {
  const [studentName, setStudentName] = useState('');
  const [subject, setSubject] = useState(null); // { id, name, ... }
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { [questionId]: answerString }
  const [result, setResult] = useState(null); // response from submitExam

  function setAnswer(questionId, value) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function resetExam() {
    setSubject(null);
    setQuestions([]);
    setAnswers({});
    setResult(null);
  }

  const value = useMemo(
    () => ({
      studentName,
      setStudentName,
      subject,
      setSubject,
      questions,
      setQuestions,
      answers,
      setAnswer,
      result,
      setResult,
      resetExam,
    }),
    [studentName, subject, questions, answers, result]
  );

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
}

export function useExam() {
  const ctx = useContext(ExamContext);
  if (!ctx) throw new Error('useExam must be used within an ExamProvider');
  return ctx;
}
