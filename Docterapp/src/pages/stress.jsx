import React, { useState } from 'react';
import { Container, Card, Button, ProgressBar, Form } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    question: 'How are you feeling today?',
    options: ['Very Stressed', 'Somewhat Stressed', 'Neutral', 'Somewhat Relaxed', 'Very Relaxed']
  },
  {
    question: 'How well did you sleep last night?',
    options: ['Very Poorly', 'Poorly', 'Average', 'Well', 'Very Well']
  },
  {
    question: 'How is your energy level?',
    options: ['Very Low', 'Low', 'Moderate', 'High', 'Very High']
  },
  {
    question: 'How often do you feel overwhelmed?',
    options: ['Always', 'Often', 'Sometimes', 'Rarely', 'Never']
  },
  {
    question: 'How supported do you feel by others?',
    options: ['Not at all', 'A little', 'Somewhat', 'Quite a bit', 'Very supported']
  },
  {
    question: 'How often do you take breaks to relax during the day?',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often']
  },
  {
    question: 'How much physical activity or exercise did you get this week?',
    options: ['None', 'A little', 'Some', 'Good amount', 'A lot']
  },
  {
    question: 'How well are you able to focus on tasks?',
    options: ['Not at all', 'A little', 'Somewhat', 'Well', 'Very well']
  },
  {
    question: 'How connected do you feel to friends or family?',
    options: ['Not at all', 'A little', 'Somewhat', 'Quite connected', 'Very connected']
  },
  {
    question: 'How often do you laugh or enjoy entertainment?',
    options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often']
  }
];

function getMoodResult(scores) {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  if (avg <= 1.5) return {
    mood: 'High Stress',
    advice: 'Consider relaxation techniques and talking to someone you trust.',
    links: [
      { label: 'Guided Meditation (YouTube)', url: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
      { label: 'Calm App', url: 'https://www.calm.com/' },
      { label: 'Mental Health Support', url: 'https://www.betterhelp.com/' },
      { label: 'The Relaxation Response (Book)', url: 'https://www.amazon.com/Relaxation-Response-Herbert-Benson/dp/0380006766' },
      { label: '10% Happier (Book)', url: 'https://www.amazon.com/10-Happier-Self-Help-Actually-Works/dp/0062265431' }
    ]
  };
  if (avg <= 2.5) return {
    mood: 'Moderate Stress',
    advice: 'Take breaks, exercise, and practice mindfulness.',
    links: [
      { label: 'Relaxing Music (YouTube)', url: 'https://www.youtube.com/watch?v=2OEL4P1Rz04' },
      { label: 'Headspace', url: 'https://www.headspace.com/' },
      { label: 'Simple Yoga Routine', url: 'https://www.youtube.com/watch?v=v7AYKMP6rOE' },
      { label: 'The Little Book of Mindfulness', url: 'https://www.amazon.com/Little-Book-Mindfulness-10-minutes/dp/1856753530' },
      { label: 'Wherever You Go, There You Are', url: 'https://www.amazon.com/Wherever-You-There-Are-Mindfulness/dp/1401307787' }
    ]
  };
  if (avg <= 3.5) return {
    mood: 'Neutral',
    advice: 'Keep up your healthy habits!',
    links: [
      { label: 'TED: The Power of Laughter', url: 'https://www.ted.com/talks/sophie_scott_why_we_laugh' },
      { label: 'Light Entertainment', url: 'https://www.netflix.com/browse/genre/11559' },
      { label: 'The Happiness Project (Book)', url: 'https://www.amazon.com/Happiness-Project-Aristotle-Generally-Reminded/dp/006158326X' },
      { label: 'Atomic Habits (Book)', url: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299' }
    ]
  };
  if (avg <= 4.5) return {
    mood: 'Good Mood',
    advice: 'You are managing stress well. Stay positive!',
    links: [
      { label: 'Feel Good Playlist', url: 'https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0' },
      { label: 'Comedy Shows', url: 'https://www.netflix.com/browse/genre/6548' },
      { label: 'The Book of Joy', url: 'https://www.amazon.com/Book-Joy-Lasting-Happiness-Changing/dp/0399185046' },
      { label: 'Ikigai: The Japanese Secret to a Long and Happy Life', url: 'https://www.amazon.com/Ikigai-Japanese-Secret-Long-Happy/dp/0143130722' }
    ]
  };
  return {
    mood: 'Excellent Mood',
    advice: 'Great job! Keep doing what works for you.',
    links: [
      { label: 'Share Your Positivity', url: 'https://www.randomactsofkindness.org/' },
      { label: 'Uplifting Stories', url: 'https://www.goodnewsnetwork.org/' },
      { label: 'The Gifts of Imperfection (Book)', url: 'https://www.amazon.com/Gifts-Imperfection-Think-Supposed-Embrace/dp/159285849X' },
      { label: 'Big Magic: Creative Living Beyond Fear', url: 'https://www.amazon.com/Big-Magic-Creative-Living-Beyond/dp/1594634726' }
    ]
  };
}

const StressManagement = () => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleOption = (idx) => {
    setScores([...scores, idx + 1]);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setScores([]);
    setShowResult(false);
  };

  const progress = ((step) / questions.length) * 100;

  return (
    <section
      id="stress-management"
      className="bg-light text-dark"
      style={{ minHeight: '100vh', width: '100vw', padding: '2rem 0', background: 'linear-gradient(135deg, #e3f6fc 0%, #fff 100%)' }}
    >
      <Container style={{ maxWidth: 500 }}>
        <Card className="shadow-lg mt-5 mb-4" style={{ borderRadius: 24 }}>
          <Card.Body>
            <h2 className="text-center mb-4" style={{ color: '#0d6efd', fontWeight: 800 }}>Stress & Mood Tracker</h2>
            <p className="text-center mb-4" style={{ color: '#555' }}>
              Answer a few questions to track your current mood and get stress management tips.
            </p>
            {!showResult ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                >
                  <ProgressBar now={progress} style={{ marginBottom: 24 }} />
                  <h5 className="mb-3" style={{ fontWeight: 700 }}>{questions[step].question}</h5>
                  <div className="d-grid gap-2 mb-3">
                    {questions[step].options.map((opt, idx) => (
                      <Button
                        key={opt}
                        variant="outline-primary"
                        size="lg"
                        onClick={() => handleOption(idx)}
                        style={{ borderRadius: 16 }}
                      >
                        {opt}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="text-center"
              >
                <h4 style={{ color: '#43a047', fontWeight: 700 }}>Your Mood: {getMoodResult(scores).mood}</h4>
                <div style={{ fontSize: '1.1rem', color: '#0d6efd', fontWeight: 600, margin: '1.2rem 0' }}>{getMoodResult(scores).advice}</div>
                <div style={{ marginBottom: '1.2rem' }}>
                  <strong>Helpful Links:</strong>
                  <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '0.7rem' }}>
                    {getMoodResult(scores).links.map((link, i) => (
                      <li key={i} style={{ marginBottom: '0.7rem' }}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0d6efd', textDecoration: 'underline' }}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button variant="primary" onClick={handleRestart} style={{ borderRadius: 16 }}>
                  Track Again
                </Button>
              </motion.div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default StressManagement;
