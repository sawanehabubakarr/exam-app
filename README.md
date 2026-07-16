# Mobile Examination Application (Project 8527)

A React Native Expo app that lets a student pick an exam, answer mixed-type
questions, submit their answers, and see their score.

The app runs fully on the device with local exam data. No backend.

**Required functionality:**
1. Display examination questions
2. Submit answers
3. Display examination score

## Tech Stack

- React Native
- Expo
- JavaScript local data

## Project Structure

```text
exam-app/
|-- App.js                     Root component; wraps the app in ExamProvider
|-- app.json                   Expo project configuration
|-- babel.config.js            Babel configuration for Expo
|-- package.json               Dependencies and npm scripts
+-- src/
    |-- api/
    |   +-- client.js          Local data access + grading logic
    |-- context/
    |   +-- ExamContext.js     Shared app state (React Context)
    |-- data/
    |   +-- exams.js           Local exam, question and answer bank
    |-- navigation/
    |   +-- AppNavigator.js    Stack navigator wiring the 3 screens
    +-- screens/
        |-- ExamListScreen.js  Subject list + student name entry
        |-- QuestionScreen.js  Question rendering + answer capture
        +-- ScoreScreen.js     Result display
```

## Run the App

```bash
npm install
npx expo start --tunnel
```

Then scan the QR code with Expo Go on your phone but make sure it's using SDK 51.

## Editing Exams

All exams are stored in:

```text
src/data/exams.js
```

Each exam has a name, description, duration, and a list of questions. Supported
question types are:

- `mcq`
- `true_false`
- `short_answer`

## How It Works

1. **ExamListScreen** shows the local exam list.
2. **QuestionScreen** loads questions from `src/data/exams.js`.
3. **ScoreScreen** displays the locally graded score and answer breakdown.

Grading happens inside the app, so Expo Go works through `--tunnel` without
needing the phone to reach a backend server on the laptop.
