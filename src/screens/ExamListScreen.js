import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { fetchSubjects } from '../api/client';
import { useExam } from '../context/ExamContext';

export default function ExamListScreen({ navigation }) {
  const { studentName, setStudentName, setSubject } = useExam();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSubjects();
  }, []);

  async function loadSubjects() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSubjects();
      setSubjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectSubject(subject) {
    if (!studentName.trim()) {
      Alert.alert('Name required', 'Please enter your name before starting an exam.');
      return;
    }
    setSubject(subject);
    navigation.navigate('Question');
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
        <Text style={styles.errorText}>Could not load exams: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadSubjects}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Exams</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={studentName}
        onChangeText={setStudentName}
      />

      <FlatList
        data={subjects}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleSelectSubject(item)}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            {!!item.description && <Text style={styles.cardDesc}>{item.description}</Text>}
            <Text style={styles.cardMeta}>
              {item.question_count} question{item.question_count === 1 ? '' : 's'} ·{' '}
              {item.duration_minutes} min
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No exams available yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 20, paddingTop: 60 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },
  title: { fontSize: 26, fontWeight: '700', color: '#0F172A', marginBottom: 16 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#0F172A' },
  cardDesc: { fontSize: 14, color: '#475569', marginTop: 4 },
  cardMeta: { fontSize: 12, color: '#64748B', marginTop: 8 },
  emptyText: { textAlign: 'center', color: '#64748B', marginTop: 40 },
  errorText: { color: '#DC2626', textAlign: 'center', marginBottom: 12, paddingHorizontal: 24 },
  retryButton: { backgroundColor: '#2563EB', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  retryButtonText: { color: '#fff', fontWeight: '600' },
});
