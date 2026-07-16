import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView,} from 'react-native';
import { fetchQuestions, submitExam } from '../api/client';
import { useExam } from '../context/ExamContext';

export default function QuestionScreen({ navigation }) {
  const { subject, questions, setQuestions, answers, setAnswer, studentName, setResult } = useExam();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchQuestions(subject.id);
      setQuestions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Could not load questions: {error}</Text>
      </View>
    );
  }

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(answers).length;

  async function handleSubmit() {
    const unanswered = questions.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      Alert.alert(
        'Unanswered questions',
        `You still have ${unanswered.length} unanswered question(s). Submit anyway?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Submit', onPress: doSubmit },
        ]
      );
      return;
    }
    doSubmit();
  }

  async function doSubmit() {
    setSubmitting(true);
    try {
      const payload = Object.entries(answers).map(([questionId, answer]) => ({
        questionId: Number(questionId),
        answer,
      }));
      const response = await submitExam(subject.id, studentName, payload);
      setResult(response);
      navigation.replace('Score');
    } catch (err) {
      Alert.alert('Submission failed', err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subjectName}>{subject.name}</Text>
        <Text style={styles.progress}>
          Question {currentIndex + 1} of {questions.length} · {answeredCount} answered
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.questionText}>{question.questionText}</Text>

        {question.questionType === 'mcq' && (
          <View>
            {question.options.map((opt) => (
              <TouchableOpacity
                key={opt.label}
                style={[
                  styles.optionRow,
                  answers[question.id] === opt.label && styles.optionRowSelected,
                ]}
                onPress={() => setAnswer(question.id, opt.label)}
              >
                <Text style={styles.optionLabel}>{opt.label}</Text>
                <Text style={styles.optionText}>{opt.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {question.questionType === 'true_false' && (
          <View style={styles.tfRow}>
            {['true', 'false'].map((val) => (
              <TouchableOpacity
                key={val}
                style={[
                  styles.tfButton,
                  answers[question.id] === val && styles.optionRowSelected,
                ]}
                onPress={() => setAnswer(question.id, val)}
              >
                <Text style={styles.optionText}>{val === 'true' ? 'True' : 'False'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {question.questionType === 'short_answer' && (
          <TextInput
            style={styles.shortAnswerInput}
            placeholder="Type your answer"
            value={answers[question.id] || ''}
            onChangeText={(text) => setAnswer(question.id, text)}
          />
        )}
      </ScrollView>

      <View style={styles.navRow}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
          disabled={currentIndex === 0}
          onPress={() => setCurrentIndex((i) => i - 1)}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        {isLast ? (
          <TouchableOpacity
            style={[styles.navButton, styles.submitButton]}
            onPress={handleSubmit}
            disabled={submitting}
          >
            <Text style={styles.navButtonText}>{submitting ? 'Submitting…' : 'Submit Exam'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.navButton} onPress={() => setCurrentIndex((i) => i + 1)}>
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', paddingTop: 56 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },
  header: { paddingHorizontal: 20, marginBottom: 8 },
  subjectName: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  progress: { fontSize: 13, color: '#64748B', marginTop: 4 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  questionText: { fontSize: 18, fontWeight: '600', color: '#0F172A', marginBottom: 20 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  optionRowSelected: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  optionLabel: {
    fontWeight: '700',
    color: '#2563EB',
    marginRight: 12,
    width: 20,
  },
  optionText: { fontSize: 15, color: '#0F172A', flexShrink: 1 },
  tfRow: { flexDirection: 'row', gap: 12 },
  tfButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  shortAnswerInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#fff',
  },
  navButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  navButtonDisabled: { backgroundColor: '#CBD5E1' },
  submitButton: { backgroundColor: '#16A34A' },
  navButtonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  errorText: { color: '#DC2626', textAlign: 'center', paddingHorizontal: 24 },
});
