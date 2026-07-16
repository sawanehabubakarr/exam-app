import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useExam } from '../context/ExamContext';

export default function ScoreScreen({ navigation }) {
  const { result, subject, studentName, resetExam } = useExam();

  if (!result) {
    return (
      <View style={styles.center}>
        <Text>No result to display.</Text>
      </View>
    );
  }

  function handleFinish() {
    resetExam();
    navigation.popToTop();
  }

  const passed = result.percentage >= 50;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subjectName}>{subject?.name}</Text>
      <Text style={styles.studentName}>{studentName}</Text>

      <View style={[styles.scoreCircle, passed ? styles.pass : styles.fail]}>
        <Text style={styles.percentageText}>{result.percentage}%</Text>
      </View>

      <Text style={styles.scoreLine}>
        Score: {result.score} / {result.totalPoints}
      </Text>
      <Text style={styles.resultLabel}>{passed ? 'PASSED' : 'NOT PASSED'}</Text>

      <View style={styles.breakdownSection}>
        <Text style={styles.breakdownTitle}>Answer Breakdown</Text>
        {result.breakdown.map((item, idx) => (
          <View key={item.questionId} style={styles.breakdownRow}>
            <Text style={styles.breakdownIndex}>Q{idx + 1}</Text>
            <Text
              style={[
                styles.breakdownStatus,
                item.isCorrect ? styles.correctText : styles.incorrectText,
              ]}
            >
              {item.isCorrect ? 'Correct' : 'Incorrect'}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
        <Text style={styles.finishButtonText}>Back to Exam List</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#F8FAFC', padding: 24, paddingTop: 70, alignItems: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  subjectName: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  studentName: { fontSize: 14, color: '#64748B', marginTop: 4, marginBottom: 24 },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 6,
  },
  pass: { borderColor: '#16A34A', backgroundColor: '#F0FDF4' },
  fail: { borderColor: '#DC2626', backgroundColor: '#FEF2F2' },
  percentageText: { fontSize: 34, fontWeight: '800', color: '#0F172A' },
  scoreLine: { fontSize: 16, color: '#0F172A', marginBottom: 4 },
  resultLabel: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 28, letterSpacing: 1 },
  breakdownSection: { width: '100%', marginBottom: 32 },
  breakdownTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 10 },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 6,
  },
  breakdownIndex: { color: '#0F172A', fontWeight: '600' },
  breakdownStatus: { fontWeight: '600' },
  correctText: { color: '#16A34A' },
  incorrectText: { color: '#DC2626' },
  finishButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 10,
  },
  finishButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
