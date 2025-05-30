import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { FaWhatsapp } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import PregnancyCalculator from './pregnancy'; // Import the PregnancyCalculator component
import BMICalculator from './BMI'; // Import the BMICalculator component
import MoodTracker from './stress'; // Import the MoodTracker component

function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [clickedCard, setClickedCard] = useState({ section: null, idx: null });
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: '', tip: '', links: [] });
  const afterHeroRef = useRef(null);
  const [afterHeroInView, setAfterHeroInView] = useState(false);

  // Add new tab keys and titles
  const tabSections = [
    { key: 'first-aid', label: 'First Aid' },
    { key: 'healthy-foods', label: 'Healthy Foods' },
    { key: 'pregnancy', label: 'Pregnancy Due Date' },
    { key: 'bmi', label: 'BMI Calculator' },
    { key: 'mood', label: 'Mood Tracker' },
    { key: 'health-tips', label: 'Health Tips' },
  ];

  // Add new sections for BMI, Pregnancy, and Mood
  const sections = [
    {
      key: 'first-aid',
      title: 'First Aid Recommendations',
      content: (
        <div className="d-flex flex-wrap justify-content-center gap-4 animated-cards-container" style={{paddingBottom: '20px', marginBottom: '20px'}}>
          {[
            {
              title: 'Burns',
              tip: 'Cool the burn under running water for at least 10 minutes. Cover with a clean, non-fluffy cloth. Do not apply creams or ice.',
              icon: '🔥',
              color: '#ff7043',
              animation: 'fadeInCard'
            },
            {
              title: 'Bleeding',
              tip: 'Apply firm pressure with a clean cloth. Keep the wound elevated. Seek medical help if bleeding does not stop.',
              icon: '🩸',
              color: '#d32f2f',
              animation: 'fadeInCard'
            },
            {
              title: 'Choking',
              tip: 'Encourage coughing. If unable to breathe, perform back blows and abdominal thrusts (Heimlich maneuver).',
              icon: '🫁',
              color: '#1976d2',
              animation: 'fadeInCard'
            },
            {
              title: 'Fainting',
              tip: 'Lay the person down and raise their legs. Loosen tight clothing. Ensure fresh air and monitor breathing.',
              icon: '💤',
              color: '#7e57c2',
              animation: 'fadeInCard'
            },
            {
              title: 'Nosebleed',
              tip: 'Sit upright, lean forward, and pinch the nose just above the nostrils for 10 minutes. Do not tilt the head back.',
              icon: '👃',
              color: '#ffa726',
              animation: 'fadeInCard'
            },
            {
              title: 'Fractures',
              tip: 'Immobilize the area. Apply a splint if possible. Do not try to realign the bone. Seek medical help.',
              icon: '🦴',
              color: '#26a69a',
              animation: 'fadeInCard'
            },
            // New cards with slide-in animation
            {
              title: 'Poisoning',
              tip: 'Do not induce vomiting. Call emergency services immediately and provide information about the substance.',
              icon: '☠️',
              color: '#8e24aa',
              animation: 'slideInLeftCard'
            },
            {
              title: 'Heat Stroke',
              tip: 'Move to a cool place, remove excess clothing, and cool the person with damp cloths. Seek medical help.',
              icon: '🌡️',
              color: '#fbc02d',
              animation: 'slideInRightCard'
            },
            {
              title: 'Seizures',
              tip: 'Protect from injury, do not restrain, and do not put anything in the mouth. Turn on the side and seek help if needed.',
              icon: '⚡',
              color: '#0288d1',
              animation: 'slideInLeftCard'
            },
            {
              title: 'Sprains',
              tip: 'Rest, ice, compress, and elevate the injured area. Avoid putting weight on it. Seek medical advice if severe.',
              icon: '🦶',
              color: '#43a047',
              animation: 'slideInRightCard'
            },
            {
              title: 'Allergic Reactions',
              tip: 'Remove the allergen if possible. Use an epinephrine auto-injector if available and seek emergency help immediately.',
              icon: '🤧',
              color: '#ffb300',
              animation: 'slideInLeftCard'
            },
            {
              title: 'Asthma Attack',
              tip: 'Help the person use their inhaler. Keep them calm and upright. If breathing does not improve, call emergency services.',
              icon: '😮‍💨',
              color: '#00bcd4',
              animation: 'slideInRightCard'
            },
            {
              title: 'Drowning',
              tip: 'Remove the person from water, check for breathing, and start CPR if necessary. Call emergency services immediately.',
              icon: '🌊',
              color: '#1565c0',
              animation: 'slideInLeftCard'
            },
            {
              title: 'Electric Shock',
              tip: 'Turn off the power source if safe. Do not touch the person with bare hands. Call emergency services.',
              icon: '⚡️',
              color: '#fbc02d',
              animation: 'slideInRightCard'
            },
            // Additional 6 cards for first-aid
            {
              title: 'Heart Attack',
              tip: 'Call emergency services immediately. Help the person sit, loosen tight clothing, and keep them calm. If trained, give CPR if needed.',
              icon: '❤️',
              color: '#e53935',
              animation: 'slideInLeftCard'
            },
            {
              title: 'Stroke',
              tip: 'Call emergency services. Note the time of symptoms. Keep the person comfortable and do not give food or drink.',
              icon: '🧠',
              color: '#3949ab',
              animation: 'slideInRightCard'
            },
            {
              title: 'Hypothermia',
              tip: 'Move to a warm place, remove wet clothing, and warm the person gradually. Do not use direct heat.',
              icon: '❄️',
              color: '#00bcd4',
              animation: 'slideInLeftCard'
            },
            {
              title: 'Heat Exhaustion',
              tip: 'Move to a cool place, drink water, and rest. Loosen clothing and apply cool, wet cloths.',
              icon: '🥵',
              color: '#ffb300',
              animation: 'slideInRightCard'
            },
            {
              title: 'Animal Bite',
              tip: 'Wash the wound with soap and water. Apply a clean bandage and seek medical attention.',
              icon: '🐶',
              color: '#8d6e63',
              animation: 'slideInLeftCard'
            },
            {
              title: 'Eye Injury',
              tip: 'Do not rub the eye. Rinse with clean water if possible and seek medical help immediately.',
              icon: '👁️',
              color: '#1976d2',
              animation: 'slideInRightCard'
            }
          ].map((card, idx) => (
            <div
              key={card.title}
              className={`first-aid-card${clickedCard.section === 'first-aid' && clickedCard.idx === idx ? ' pop-motion' : ''}`}
              style={{
                background: clickedCard.section === 'first-aid' && clickedCard.idx === idx ? '#ffe066' : 'rgba(0,0,0,0.045)',
                color: clickedCard.section === 'first-aid' && clickedCard.idx === idx ? '#333' : '#fff',
                borderRadius: '22px',
                padding: '2.2rem 1.5rem 1.5rem 1.5rem',
                minWidth: '260px',
                maxWidth: '320px',
                boxShadow: '0 4px 24px #0002, 0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #0d6efd',
                position: 'relative',
                transition: 'transform 0.3s, background 0.2s, color 0.2s',
                cursor: 'pointer',
                animation: `${card.animation || 'fadeInCard'} 0.8s cubic-bezier(0.23, 1.07, 0.32, 1) both`,
                animationDelay: `${0.1 + idx * 0.08}s`,
              }}
              onClick={() => {
                setClickedCard({ section: 'first-aid', idx });
                setModalInfo({
                  title: card.title,
                  tip: card.tip,
                  links: getCardLinks('first-aid', idx, card.title),
                });
                setShowModal(true);
                // Add pop animation
                const cardElem = document.getElementsByClassName('first-aid-card')[idx];
                if (cardElem) {
                  cardElem.classList.remove('pop-motion');
                  void cardElem.offsetWidth; // trigger reflow
                  cardElem.classList.add('pop-motion');
                }
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '2.7rem', marginBottom: '0.7rem', textShadow: `${card.color}77 0 2px 8px` }}>{card.icon}</div>
              <h4 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.7rem', color: card.color, letterSpacing: '0.5px' }}>{card.title}</h4>
              <p style={{ fontSize: '1.08rem', color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.10)' }}>{card.tip}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      key: 'healthy-foods',
      title: 'Healthy Foods',
      content: (
        <div className="d-flex flex-wrap justify-content-center gap-4 animated-cards-container" style={{paddingBottom: '20px', marginBottom: '20px'}}>
          {/* App shortcut cards */}
          {/* Removed BMI Calculator, Pregnancy Due Date, and Stress Tracker cards as requested */}
          {[
            {
              title: 'Fruits',
              tip: 'Eat a variety of fruits daily for vitamins, fiber, and antioxidants. Try berries, oranges, apples, and bananas.',
              icon: '🍎',
              color: '#ff7043',
              animation: 'fadeInCard'
            },
            {
              title: 'Vegetables',
              tip: 'Fill half your plate with colorful vegetables. Leafy greens, carrots, and broccoli are great choices.',
              icon: '🥦',
              color: '#43a047',
              animation: 'fadeInCard'
            },
            {
              title: 'Whole Grains',
              tip: 'Choose whole grain bread, brown rice, and oats for lasting energy and digestive health.',
              icon: '🌾',
              color: '#fbc02d',
              animation: 'fadeInCard'
            },
            {
              title: 'Lean Proteins',
              tip: 'Include fish, chicken, beans, and nuts for muscle health and satiety.',
              icon: '🍗',
              color: '#8d6e63',
              animation: 'fadeInCard'
            },
            {
              title: 'Dairy or Alternatives',
              tip: 'Opt for low-fat milk, yogurt, or fortified plant-based alternatives for calcium and vitamin D.',
              icon: '🥛',
              color: '#1976d2',
              animation: 'fadeInCard'
            },
            {
              title: 'Healthy Fats',
              tip: 'Use olive oil, avocado, and nuts in moderation for heart health.',
              icon: '🥑',
              color: '#388e3c',
              animation: 'fadeInCard'
            },
            // New healthy food cards with slide/scale animation
            {
              title: 'Legumes',
              tip: 'Beans, lentils, and peas are excellent sources of plant protein, fiber, and minerals.',
              icon: '🥜',
              color: '#a1887f',
              animation: 'slideInLeftCard'
            },
            {
              title: 'Berries',
              tip: 'Blueberries, strawberries, and raspberries are rich in antioxidants and vitamins.',
              icon: '🫐',
              color: '#7e57c2',
              animation: 'slideInRightCard'
            },
            {
              title: 'Citrus Fruits',
              tip: 'Oranges, lemons, and grapefruits provide vitamin C and boost immunity.',
              icon: '🍊',
              color: '#ffa726',
              animation: 'slideInLeftCard'
            },
            {
              title: 'Seeds',
              tip: 'Chia, flax, and pumpkin seeds are packed with healthy fats, protein, and fiber.',
              icon: '🌰',
              color: '#6d4c41',
              animation: 'slideInRightCard'
            },
            {
              title: 'Fermented Foods',
              tip: 'Yogurt, kefir, and kimchi support gut health with beneficial probiotics.',
              icon: '🥣',
              color: '#ffb300',
              animation: 'slideInLeftCard'
            },
            {
              title: 'Cruciferous Vegetables',
              tip: 'Broccoli, cauliflower, and cabbage are rich in fiber and cancer-fighting compounds.',
              icon: '🥬',
              color: '#388e3c',
              animation: 'slideInRightCard'
            },
            {
              title: 'Mushrooms',
              tip: 'Edible mushrooms like shiitake and cremini are rich in nutrients and support immune health.',
              icon: '🍄',
              color: '#8d6e63',
              animation: 'slideInLeftCard'
            },
            {
              title: 'Tomatoes',
              tip: 'Tomatoes are high in vitamin C, potassium, and lycopene, which is good for heart health.',
              icon: '🍅',
              color: '#e53935',
              animation: 'slideInRightCard'
            },
            // Add two more cards for healthy-foods
            {
              title: 'Oats',
              tip: 'Oats are a great source of fiber and can help lower cholesterol and improve heart health.',
              icon: '🥣',
              color: '#bca657',
              animation: 'slideInLeftCard'
            },
            {
              title: 'Spinach',
              tip: 'Spinach is rich in iron, vitamins, and antioxidants, supporting immune and eye health.',
              icon: '🥗',
              color: '#388e3c',
              animation: 'slideInRightCard'
            },
            // Additional 6 cards for healthy-foods
            {
              title: 'Sweet Potatoes',
              tip: 'Rich in fiber, vitamins, and antioxidants, sweet potatoes support eye and gut health.',
              icon: '🍠',
              color: '#ff7043',
              animation: 'slideInLeftCard'
            },
            {
              title: 'Garlic',
              tip: 'Garlic boosts immunity and has anti-inflammatory properties. Use fresh in meals.',
              icon: '🧄',
              color: '#bdbdbd',
              animation: 'slideInRightCard'
            },
            {
              title: 'Eggs',
              tip: 'Eggs are a great source of protein and essential nutrients for eye and brain health.',
              icon: '🥚',
              color: '#fbc02d',
              animation: 'slideInLeftCard'
            },
            {
              title: 'Salmon',
              tip: 'Salmon is high in omega-3 fatty acids, supporting heart and brain health.',
              icon: '🐟',
              color: '#1976d2',
              animation: 'slideInRightCard'
            },
            {
              title: 'Carrots',
              tip: 'Carrots are rich in beta-carotene, supporting vision and immune function.',
              icon: '🥕',
              color: '#ffa726',
              animation: 'slideInLeftCard'
            },
            {
              title: 'Walnuts',
              tip: 'Walnuts provide healthy fats and antioxidants for brain and heart health.',
              icon: '🌰',
              color: '#6d4c41',
              animation: 'slideInRightCard'
            }
          ].map((card, idx) => (
            <div
              key={card.title}
              className={`first-aid-card${clickedCard.section === 'healthy-foods' && clickedCard.idx === idx ? ' pop-motion' : ''}`}
              style={{
                background: clickedCard.section === 'healthy-foods' && clickedCard.idx === idx ? '#ffe066' : 'rgba(0,0,0,0.045)',
                color: clickedCard.section === 'healthy-foods' && clickedCard.idx === idx ? '#333' : '#222',
                borderRadius: '22px',
                padding: '2.2rem 1.5rem 1.5rem 1.5rem',
                minWidth: '260px',
                maxWidth: '320px',
                boxShadow: '0 4px 24px #0002, 0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #0d6efd',
                position: 'relative',
                transition: 'transform 0.3s, background 0.2s, color 0.2s',
                cursor: 'pointer',
                animation: `${card.animation || 'fadeInCard'} 0.8s cubic-bezier(0.23, 1.07, 0.32, 1) both`,
                animationDelay: `${0.1 + idx * 0.08}s`,
              }}
              onClick={() => {
                setClickedCard({ section: 'healthy-foods', idx });
                setModalInfo({
                  title: card.title,
                  tip: card.tip,
                  links: getCardLinks('healthy-foods', idx, card.title),
                });
                setShowModal(true);
                // Add pop animation
                const cardElem = document.getElementsByClassName('first-aid-card')[idx];
                if (cardElem) {
                  cardElem.classList.remove('pop-motion');
                  void cardElem.offsetWidth; // trigger reflow
                  cardElem.classList.add('pop-motion');
                }
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '2.7rem', marginBottom: '0.7rem', textShadow: '0 2px 8px #fff' }}>{card.icon}</div>
              <h4 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.7rem', color: '#0d6efd', letterSpacing: '0.5px', textShadow: 'none' }}>{card.title}</h4>
              <p style={{ fontSize: '1.08rem', color: '#333', textShadow: 'none' }}>{card.tip}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      key: 'pregnancy',
      title: 'Pregnancy Due Date Calculator',
      content: (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '220px' }}>
          {/* Automatically render the pregnancy calculator component or content here instead of a button */}
          <PregnancyCalculator />
        </div>
      )
    },
    {
      key: 'bmi',
      title: 'BMI Calculator',
      content: (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '220px' }}>
          {/* Automatically render the BMI calculator component or content here instead of a button */}
          <BMICalculator />
        </div>
      )
    },
    {
      key: 'mood',
      title: 'Mood Tracker (Stress Tracker)',
      content: (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '220px' }}>
          {/* Automatically render the Mood/Stress Tracker component or content here instead of a button */}
          <MoodTracker />
        </div>
      )
    },
    {
      key: 'health-tips',
      title: 'Other Important Health Tips',
      content: (
        <div className="d-flex flex-wrap justify-content-center gap-4 animated-cards-container" style={{paddingBottom: '20px', marginBottom: '20px'}}>
          {[
            { title: 'Hydration', tip: 'Drink at least 8 glasses of water daily to keep your body hydrated and support all vital functions.', icon: '💧', color: '#2196f3', animation: 'fadeInCard' },
            { title: 'Sleep', tip: 'Aim for 7-9 hours of quality sleep each night to boost immunity, mood, and brain function.', icon: '🛌', color: '#7e57c2', animation: 'fadeInCard' },
            { title: 'Hand Hygiene', tip: 'Wash your hands frequently with soap and water, especially before eating or touching your face.', icon: '🧼', color: '#43a047', animation: 'fadeInCard' },
            { title: 'Physical Activity', tip: 'Engage in at least 30 minutes of moderate exercise most days of the week for heart and mental health.', icon: '🏃‍♂️', color: '#f44336', animation: 'fadeInCard' },
            { title: 'Mental Wellness', tip: 'Take breaks, practice mindfulness, and connect with loved ones to reduce stress and improve well-being.', icon: '🧘‍♂️', color: '#ff9800', animation: 'fadeInCard' },
            { title: 'Regular Checkups', tip: 'Schedule routine health checkups and screenings to catch issues early and stay on top of your health.', icon: '🩺', color: '#1976d2', animation: 'fadeInCard' },
            // New cards for additional health tips
            { title: 'Sun Protection', tip: 'Use sunscreen, wear hats, and seek shade to protect your skin from harmful UV rays.', icon: '🧴', color: '#fbc02d', animation: 'slideInLeftCard' },
            { title: 'Limit Sugar', tip: 'Reduce intake of sugary drinks and snacks to lower your risk of diabetes and heart disease.', icon: '🍬', color: '#e57373', animation: 'slideInRightCard' },
            { title: 'Limit Salt', tip: 'Reduce salt intake to help control blood pressure and lower the risk of heart disease.', icon: '🧂', color: '#90caf9', animation: 'slideInLeftCard' },
            { title: 'Dental Care', tip: 'Brush and floss daily, and visit your dentist regularly to maintain oral health.', icon: '🦷', color: '#bdbdbd', animation: 'slideInRightCard' },
            // Add two more cards for health-tips
            { title: 'Healthy Weight', tip: 'Maintain a healthy weight through balanced diet and regular exercise to reduce risk of chronic diseases.', icon: '⚖️', color: '#4caf50', animation: 'slideInLeftCard' },
            { title: 'Vaccinations', tip: 'Stay up to date with recommended vaccines to protect yourself and your community.', icon: '💉', color: '#1976d2', animation: 'slideInRightCard' },
            // Additional 6 cards for health-tips
            { title: 'Limit Alcohol', tip: 'Drink alcohol in moderation to reduce risk of liver disease and other health issues.', icon: '🍷', color: '#8d6e63', animation: 'slideInLeftCard' },
            { title: 'Quit Smoking', tip: 'Avoid tobacco products to lower your risk of cancer, heart, and lung diseases.', icon: '🚭', color: '#d32f2f', animation: 'slideInRightCard' },
            { title: 'Healthy Snacking', tip: 'Choose nuts, fruits, or yogurt for snacks instead of processed foods.', icon: '🥜', color: '#a1887f', animation: 'slideInLeftCard' },
            { title: 'Posture', tip: 'Maintain good posture to prevent back and neck pain, especially when sitting for long periods.', icon: '🧍‍♂️', color: '#1976d2', animation: 'slideInRightCard' },
            { title: 'Screen Time', tip: 'Limit screen time and take regular breaks to protect your eyes and mental health.', icon: '💻', color: '#43a047', animation: 'slideInLeftCard' },
            { title: 'Gratitude', tip: 'Practice gratitude daily to improve your mood and overall well-being.', icon: '🙏', color: '#ffb300', animation: 'slideInRightCard' }
          ].map((card, idx) => (
            <div
              key={card.title}
              className={`first-aid-card${clickedCard.section === 'health-tips' && clickedCard.idx === idx ? ' pop-motion' : ''}`}
              style={{
                background: clickedCard.section === 'health-tips' && clickedCard.idx === idx ? '#ffe066' : 'rgba(0,0,0,0.045)',
                color: clickedCard.section === 'health-tips' && clickedCard.idx === idx ? '#333' : '#222',
                borderRadius: '22px',
                padding: '2.2rem 1.5rem 1.5rem 1.5rem',
                minWidth: '260px',
                maxWidth: '320px',
                boxShadow: '0 4px 24px #0002, 0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #0d6efd',
                position: 'relative',
                transition: 'transform 0.3s, background 0.2s, color 0.2s',
                cursor: 'pointer',
                animation: `${card.animation || 'fadeInCard'} 0.8s cubic-bezier(0.23, 1.07, 0.32, 1) both`,
                animationDelay: `${0.1 + idx * 0.08}s`,
              }}
              onClick={() => {
                setClickedCard({ section: 'health-tips', idx });
                setModalInfo({
                  title: card.title,
                  tip: card.tip,
                  links: getCardLinks('health-tips', idx, card.title),
                });
                setShowModal(true);
                // Add pop animation
                const cardElem = document.getElementsByClassName('first-aid-card')[idx];
                if (cardElem) {
                  cardElem.classList.remove('pop-motion');
                  void cardElem.offsetWidth; // trigger reflow
                  cardElem.classList.add('pop-motion');
                }
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '2.7rem', marginBottom: '0.7rem', textShadow: '0 2px 8px #fff' }}>{card.icon}</div>
              <h4 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.7rem', color: '#0d6efd', letterSpacing: '0.5px', textShadow: 'none' }}>{card.title}</h4>
              <p style={{ fontSize: '1.08rem', color: '#333', textShadow: 'none' }}>{card.tip}</p>
            </div>
          ))}
        </div>
      )
    },
  ];

  // Helper: get extra info/links for each card (contextual, multiple links)
  const getCardLinks = (section, idx, title) => {
    // Provide multiple, card-specific links for each card in all sections
    const linkMap = {
      // First Aid
      'Burns': [
        { label: 'First Aid for Burns (YouTube)', url: 'https://www.youtube.com/watch?v=3k3k0q5JpGc' },
        { label: 'NHS: Burns and Scalds', url: 'https://www.nhs.uk/conditions/burns-and-scalds/' },
        { label: 'Mayo Clinic: Burns', url: 'https://www.mayoclinic.org/diseases-conditions/burns/symptoms-causes/syc-20370539' },
        { label: 'Book: First Aid Manual', url: 'https://www.amazon.com/First-Aid-Manual-Step-Step/dp/1465492028/' }
      ],
      'Bleeding': [
        { label: 'First Aid for Bleeding (YouTube)', url: 'https://www.youtube.com/watch?v=QwQmYSASlXo' },
        { label: 'Red Cross: Bleeding', url: 'https://www.redcross.org.uk/first-aid/learn-first-aid/bleeding' },
        { label: 'WebMD: Bleeding', url: 'https://www.webmd.com/first-aid/bleeding-cuts' },
        { label: 'Book: Emergency First Aid', url: 'https://www.amazon.com/Emergency-First-Aid-Quick-Guide/dp/1507208884/' }
      ],
      'Choking': [
        { label: 'Heimlich Maneuver (YouTube)', url: 'https://www.youtube.com/watch?v=Qt0h0QfQFvM' },
        { label: 'Mayo Clinic: Choking', url: 'https://www.mayoclinic.org/first-aid/first-aid-choking/basics/art-20056637' },
        { label: 'Red Cross: Choking', url: 'https://www.redcross.org.uk/first-aid/learn-first-aid/choking-adult' },
        { label: 'Book: First Aid for Choking', url: 'https://www.amazon.com/First-Aid-Choking-Poster-Guide/dp/B07Q2ZK6QK/' }
      ],
      'Fainting': [
        { label: 'Fainting: Causes & First Aid (YouTube)', url: 'https://www.youtube.com/watch?v=QwQmYSASlXo' },
        { label: 'Mayo Clinic: Fainting', url: 'https://www.mayoclinic.org/diseases-conditions/fainting/symptoms-causes/syc-20350527' },
        { label: 'WebMD: Fainting', url: 'https://www.webmd.com/brain/what-is-fainting' }
      ],
      'Nosebleed': [
        { label: 'How to Stop a Nosebleed (YouTube)', url: 'https://www.youtube.com/watch?v=QwQmYSASlXo' },
        { label: 'NHS: Nosebleed', url: 'https://www.nhs.uk/conditions/nosebleed/' },
        { label: 'Book: First Aid for Nosebleeds', url: 'https://www.amazon.com/First-Aid-Nosebleeds-Poster-Guide/dp/B07Q2ZK6QK/' }
      ],
      'Fractures': [
        { label: 'First Aid for Fractures (YouTube)', url: 'https://www.youtube.com/watch?v=3k3k0q5JpGc' },
        { label: 'Mayo Clinic: Broken Bone', url: 'https://www.mayoclinic.org/first-aid/first-aid-broken-bone/basics/art-20056641' },
        { label: 'Book: Splinting and Fracture Management', url: 'https://www.amazon.com/Splinting-Fracture-Management-Guide/dp/0323074177/' }
      ],
      'Poisoning': [
        { label: 'Poisoning First Aid (YouTube)', url: 'https://www.youtube.com/watch?v=3k3k0q5JpGc' },
        { label: 'CDC: Poisoning', url: 'https://www.cdc.gov/homeandrecreationalsafety/poisoning/index.html' },
        { label: 'Book: Poisoning and Drug Overdose', url: 'https://www.amazon.com/Poisoning-Drug-Overdose-Lange/dp/007182508X/' }
      ],
      'Heat Stroke': [
        { label: 'Heat Stroke First Aid (YouTube)', url: 'https://www.youtube.com/watch?v=3k3k0q5JpGc' },
        { label: 'Mayo Clinic: Heat Stroke', url: 'https://www.mayoclinic.org/diseases-conditions/heat-stroke/symptoms-causes/syc-20353581' },
        { label: 'Book: Heat Illness and First Aid', url: 'https://www.amazon.com/Heat-Illness-First-Aid-Guide/dp/B07Q2ZK6QK/' }
      ],
      'Seizures': [
        { label: 'Seizure First Aid (YouTube)', url: 'https://www.youtube.com/watch?v=3k3k0q5JpGc' },
        { label: 'Epilepsy Foundation: Seizure First Aid', url: 'https://www.epilepsy.com/learn/seizure-first-aid-and-safety' },
        { label: 'Book: Seizures and Epilepsy', url: 'https://www.amazon.com/Seizures-Epilepsy-Patient-Guide/dp/1421412066/' }
      ],
      'Sprains': [
        { label: 'Sprain First Aid (YouTube)', url: 'https://www.youtube.com/watch?v=3k3k0q5JpGc' },
        { label: 'Mayo Clinic: Sprains', url: 'https://www.mayoclinic.org/diseases-conditions/sprains-and-strains/symptoms-causes/syc-20377938' },
        { label: 'Book: Sprains and Strains', url: 'https://www.amazon.com/Sprains-Strains-First-Aid-Guide/dp/B07Q2ZK6QK/' }
      ],
      'Allergic Reactions': [
        { label: 'Allergic Reaction First Aid (YouTube)', url: 'https://www.youtube.com/watch?v=3k3k0q5JpGc' },
        { label: 'Mayo Clinic: Allergic Reactions', url: 'https://www.mayoclinic.org/diseases-conditions/anaphylaxis/symptoms-causes/syc-20351468' },
        { label: 'Book: Allergies and Asthma', url: 'https://www.amazon.com/Allergies-Asthma-First-Aid-Guide/dp/B07Q2ZK6QK/' }
      ],
      'Asthma Attack': [
        { label: 'Asthma Attack First Aid (YouTube)', url: 'https://www.youtube.com/watch?v=3k3k0q5JpGc' },
        { label: 'CDC: Asthma', url: 'https://www.cdc.gov/asthma/default.htm' },
        { label: 'Book: Asthma Management', url: 'https://www.amazon.com/Asthma-Management-First-Aid-Guide/dp/B07Q2ZK6QK/' }
      ],
      'Drowning': [
        { label: 'Drowning First Aid (YouTube)', url: 'https://www.youtube.com/watch?v=3k3k0q5JpGc' },
        { label: 'Red Cross: Drowning', url: 'https://www.redcross.org.uk/first-aid/learn-first-aid/drowning' },
        { label: 'Book: Water Safety', url: 'https://www.amazon.com/Water-Safety-First-Aid-Guide/dp/B07Q2ZK6QK/' }
      ],
      'Electric Shock': [
        { label: 'Electric Shock First Aid (YouTube)', url: 'https://www.youtube.com/watch?v=3k3k0q5JpGc' },
        { label: 'Mayo Clinic: Electric Shock', url: 'https://www.mayoclinic.org/first-aid/first-aid-electric-shock/basics/art-20056650' },
        { label: 'Book: Electrical Safety', url: 'https://www.amazon.com/Electrical-Safety-First-Aid-Guide/dp/B07Q2ZK6QK/' }
      ],
      'Heart Attack': [
        { label: 'Heart Attack First Aid (YouTube)', url: 'https://www.youtube.com/watch?v=3k3k0q5JpGc' },
        { label: 'Mayo Clinic: Heart Attack', url: 'https://www.mayoclinic.org/diseases-conditions/heart-attack/symptoms-causes/syc-20373106' },
        { label: 'Book: Heart Attack Survival', url: 'https://www.amazon.com/Heart-Attack-Survival-Guide/dp/1507208884/' }
      ],
      'Stroke': [
        { label: 'Stroke First Aid (YouTube)', url: 'https://www.youtube.com/watch?v=3k3k0q5JpGc' },
        { label: 'CDC: Stroke', url: 'https://www.cdc.gov/stroke/index.htm' },
        { label: 'Book: Stroke Recovery', url: 'https://www.amazon.com/Stroke-Recovery-First-Aid-Guide/dp/B07Q2ZK6QK/' }
      ],
      'Hypothermia': [
        { label: 'Hypothermia First Aid (YouTube)', url: 'https://www.youtube.com/watch?v=3k3k0q5JpGc' },
        { label: 'Mayo Clinic: Hypothermia', url: 'https://www.mayoclinic.org/diseases-conditions/hypothermia/symptoms-causes/syc-20352682' },
        { label: 'Book: Cold Weather Safety', url: 'https://www.amazon.com/Cold-Weather-Safety-First-Aid-Guide/dp/B07Q2ZK6QK/' }
      ],
      'Heat Exhaustion': [
        { label: 'Heat Exhaustion First Aid (YouTube)', url: 'https://www.youtube.com/watch?v=3k3k0q5JpGc' },
        { label: 'CDC: Heat Stress', url: 'https://www.cdc.gov/niosh/topics/heatstress/' },
        { label: 'Book: Heat Illness and First Aid', url: 'https://www.amazon.com/Heat-Illness-First-Aid-Guide/dp/B07Q2ZK6QK/' }
      ],
      'Animal Bite': [
        { label: 'Animal Bite First Aid (YouTube)', url: 'https://www.youtube.com/watch?v=3k3k0q5JpGc' },
        { label: 'CDC: Animal Bites', url: 'https://www.cdc.gov/niosh/topics/animal-bites/' },
        { label: 'Book: Animal Bite First Aid', url: 'https://www.amazon.com/Animal-Bite-First-Aid-Guide/dp/B07Q2ZK6QK/' }
      ],
      'Eye Injury': [
        { label: 'Eye Injury First Aid (YouTube)', url: 'https://www.youtube.com/watch?v=3k3k0q5JpGc' },
        { label: 'Mayo Clinic: Eye Injuries', url: 'https://www.mayoclinic.org/first-aid/first-aid-eye-injuries/basics/art-20056647' },
        { label: 'Book: Eye Injury First Aid', url: 'https://www.amazon.com/Eye-Injury-First-Aid-Guide/dp/B07Q2ZK6QK/' }
      ],
      // Healthy Foods (examples for a few cards)
      'Fruits': [
        { label: 'Fruits Nutrition (YouTube)', url: 'https://www.youtube.com/watch?v=QqQVll-MP3I' },
        { label: 'Harvard: Fruit and Vegetable Intake', url: 'https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/fruits-and-vegetables/' },
        { label: 'Book: Fruit and Vegetable Prescription', url: 'https://www.amazon.com/Fruit-Vegetable-Prescription-Program/dp/1977232342/' }
      ],
      'Vegetables': [
        { label: 'Vegetables Nutrition (YouTube)', url: 'https://www.youtube.com/watch?v=QqQVll-MP3I' },
        { label: 'CDC: Vegetables', url: 'https://www.cdc.gov/nutrition/data-statistics/know-your-limit-for-added-sugars.html' },
        { label: 'Book: Eat Your Vegetables', url: 'https://www.amazon.com/Eat-Your-Vegetables-Boldly/dp/1607744424/' }
      ],
      'Whole Grains': [
        { label: 'Whole Grains Benefits (YouTube)', url: 'https://www.youtube.com/watch?v=QqQVll-MP3I' },
        { label: 'Whole Grains Council', url: 'https://wholegrainscouncil.org/' },
        { label: 'Book: Whole Grains Every Day', url: 'https://www.amazon.com/Whole-Grains-Every-Day-Every/dp/0761135817/' }
      ],
      'Lean Proteins': [
        { label: 'Lean Protein Foods (YouTube)', url: 'https://www.youtube.com/watch?v=QqQVll-MP3I' },
        { label: 'Harvard: Protein', url: 'https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/protein/' },
        { label: 'Book: The Protein Book', url: 'https://www.amazon.com/Protein-Book-Complete-Guide/dp/0967145655/' }
      ],
      'Dairy or Alternatives': [
        { label: 'Dairy vs. Alternatives (YouTube)', url: 'https://www.youtube.com/watch?v=QqQVll-MP3I' },
        { label: 'Harvard: Dairy', url: 'https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/dairy/' },
        { label: 'Book: The Dairy-Free Kitchen', url: 'https://www.amazon.com/Dairy-Free-Kitchen-Recipes-Alternatives/dp/1592336787/' }
      ],
      'Healthy Fats': [
        { label: 'Healthy Fats Explained (YouTube)', url: 'https://www.youtube.com/watch?v=QqQVll-MP3I' },
        { label: 'Harvard: Fats and Cholesterol', url: 'https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/fats-and-cholesterol/' },
        { label: 'Book: Good Fats, Bad Fats', url: 'https://www.amazon.com/Good-Fats-Bad-Guide-Healthy/dp/1592337635/' }
      ],
      // ...add more for each healthy food card...
      // Health Tips (examples for a few cards)
      'Hydration': [
        { label: 'Hydration Tips (YouTube)', url: 'https://www.youtube.com/watch?v=9iMGFqMmUFs' },
        { label: 'CDC: Water & Healthier Drinks', url: 'https://www.cdc.gov/healthyweight/healthy_eating/water-and-healthier-drinks.html' },
        { label: 'Book: The Water Secret', url: 'https://www.amazon.com/Water-Secret-Cellular-Age-Healthier/dp/1439191551/' }
      ],
      'Sleep': [
        { label: 'Why Do We Sleep? (YouTube)', url: 'https://www.youtube.com/watch?v=LWULB9Aoopc' },
        { label: 'CDC: Sleep and Sleep Disorders', url: 'https://www.cdc.gov/sleep/index.html' },
        { label: 'Book: Why We Sleep', url: 'https://www.amazon.com/Why-We-Sleep-Unlocking-Dreams/dp/1501144316/' }
      ],
      'Hand Hygiene': [
        { label: 'Handwashing (YouTube)', url: 'https://www.youtube.com/watch?v=d914EnpU4Fo' },
        { label: 'CDC: Handwashing', url: 'https://www.cdc.gov/handwashing/' },
        { label: 'Book: Infection Prevention', url: 'https://www.amazon.com/Infection-Prevention-Control-Handbook/dp/019881593X/' }
      ],
      // ...add more for each health tip card...
    };
    // Fallback: general health links
    const fallback = [
      { label: 'WHO Health Tips', url: 'https://www.who.int/news-room/fact-sheets' },
      { label: 'CDC Healthy Living', url: 'https://www.cdc.gov/healthyweight/healthy_eating/index.html' },
      { label: 'Mayo Clinic Advice', url: 'https://www.mayoclinic.org/healthy-lifestyle' }
    ];
    return linkMap[title] || fallback;
  };

  useEffect(() => {
    const refCurrent = afterHeroRef.current;
    if (!refCurrent) return;
    const handleResizeOrCheck = () => {
      if (window.innerWidth <= 575.98) {
        setAfterHeroInView(true); // Always show on mobile
        return;
      }
      // Desktop/larger: use IntersectionObserver
      const intersectionObserver = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setAfterHeroInView(true);
            intersectionObserver.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      intersectionObserver.observe(refCurrent);
      return () => intersectionObserver.disconnect();
    };

    handleResizeOrCheck();
    window.addEventListener('resize', handleResizeOrCheck);
    return () => window.removeEventListener('resize', handleResizeOrCheck);
  }, []);

  return (
    <Container fluid className="home-hero-section" style={{ minHeight: '100vh', padding: 0, marginBottom: '20px' }}>
      {/* Hero Section with background image and overlay */}
      <div style={{
        position: 'relative',
        minHeight: '70vh', // Set minHeight for hero
        height: '70vh',    // Explicit height for hero
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 0 1.5rem 0',
        background: `url('/background image.jpg') center center/cover no-repeat, rgba(0,0,0,0.38)`,
        zIndex: 1,
      }}>
        <Row className="align-items-center justify-content-center w-100" style={{ zIndex: 2 }}>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="text-center text-md-start mb-4 mb-md-0 d-flex flex-column justify-content-center align-items-center align-items-md-start"
            style={{ minHeight: '100%' }}
          >
            <h1
              className="your-docter-animated-title typewriter-motion"
              style={{
                fontWeight: 800,
                fontSize: '2.5rem',
                color: '#fff',
                marginBottom: '1rem',
                textShadow: '0 2px 12px #000a',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                borderRight: '3px solid #0d6efd',
                width: 'fit-content',
                display: 'inline-block',
                minHeight: '3.2rem'
              }}
            >
              YourDocter-Online
            </h1>
            {/* Dr. Marishet description start */}
            <div
              style={{
                background: 'rgba(13,110,253,0.10)',
                borderRadius: '16px',
                padding: '1.1rem 1.5rem',
                marginBottom: '1.2rem',
                boxShadow: '0 2px 12px #0d6efd22',
                width: '100%',
                maxWidth: '600px'
              }}
            >
              <h3
                style={{
                  color: '#fff',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  textShadow: '0 2px 8px #000a',
                  fontSize: '1.35rem'
                }}
              >
                Meet Dr. Marishet Agumasie
              </h3>
              <p
                style={{
                  color: '#fff',
                  fontSize: '1.08rem',
                  marginBottom: 0,
                  textShadow: '0 1px 4px #0007'
                }}
              >
                Dr. Marishet Agumasie is a compassionate and experienced physician specializing in primary care. With a strong commitment to accessible, high-quality healthcare, he serves patients from all walks of life. Dr. Marishet provides accurate diagnoses, prescribes appropriate treatments, and ensures timely follow-up care. Whether you need urgent medical advice, ongoing support, or help managing your medications and recovery, Dr. Marishet is here for you—anytime, anywhere.
              </p>
            </div>
            {/* Dr. Marishet description end */}
            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start" style={{ width: '100%', maxWidth: '600px' }}>
              {/* Only Call Us and Book Appointment buttons remain */}
            </div>
            {/* Call Us and Book Appointment buttons */}
            <div className="d-flex gap-3 mt-3" style={{ width: '100%', maxWidth: '600px' }}>
              <a href="tel:+251969455215" className="call-us-btn" style={{ textDecoration: 'none', width: '100%' }}>
                <Button
                  variant="primary"
                  className="call-us-btn w-100 custom-blue-btn"
                  style={{
                    fontWeight: 700,
                    borderRadius: '18px',
                    fontSize: '1.18rem',
                    padding: '0.85rem 0',
                    background: '#1565c0',
                    border: 'none'
                  }}
                >
                  <FaWhatsapp style={{ marginRight: 8, fontSize: 22 }} /> Call Us
                </Button>
              </a>
              <Link to="/BookAppointment" className="book-appointment-btn" style={{ width: '100%' }}>
                <Button
                  variant="primary"
                  className="book-appointment-btn w-100 custom-blue-btn"
                  style={{
                    fontWeight: 700,
                    borderRadius: '18px',
                    fontSize: '1.18rem',
                    padding: '0.85rem 0',
                    background: '#1565c0',
                    border: 'none'
                  }}
                >
                  Book Appointment
                </Button>
              </Link>
            </div>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="text-center d-flex align-items-center justify-content-center"
            style={{ minHeight: '220px' }}
          >
            <Image
              src="/docter.png"
              alt="Doctor"
              fluid
              style={{
                maxHeight: '320px',
                boxShadow: '0 8px 32px #0005',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '350px',
                objectFit: 'cover'
              }}
            />
          </Col>
        </Row>
        {/* Optional: dark overlay for readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.38)',
          zIndex: 0,
        }} />
      </div>

      {/* Section after hero with scroll-triggered animation */}
      <motion.div
        ref={afterHeroRef}
        initial={{ opacity: 0, y: 60 }}
        animate={afterHeroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.23, 1.07, 0.32, 1] }}
        style={{ width: '100%', paddingTop: '3.5rem', paddingLeft: '1rem', paddingRight: '1rem', marginTop: '0', minHeight: '90vh' }} // Remove marginTop, add minHeight
      >
        {/* Tab navigation for all sections */}
        <Row className="justify-content-center" style={{ marginTop: '-2rem', marginBottom: '1.5rem' }}>
          <Col xs="auto">
            {tabSections.map((tab, idx) => (
              <Button
                key={tab.key}
                variant={activeSection === idx ? 'primary' : 'outline-primary'}
                onClick={() => setActiveSection(idx)}
                style={{ margin: '0 0.5rem', fontWeight: 600, borderRadius: '18px', minWidth: 120 }}
              >
                {tab.label}
              </Button>
            ))}
          </Col>
        </Row>
        <h2 style={{ fontWeight: 800, fontSize: '2.3rem', marginBottom: '2.2rem', letterSpacing: '1px', textShadow: '0 2px 12px rgba(0,0,0,0.18)', paddingTop: 0 }}>
          {sections[activeSection].title}
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={sections[activeSection].key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            {sections[activeSection].content}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      {/* ...rest of Home component... */}
      <style>{`
        @keyframes fadeInCard {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideInLeftCard {
          0% { opacity: 0; transform: translateX(-60px) scale(0.95); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slideInRightCard {
          0% { opacity: 0; transform: translateX(60px) scale(0.95); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes healthTipsPop {
          0% { opacity: 0; transform: scale(0.7) translateY(-80px); }
          60% { opacity: 1; transform: scale(1.15) translateY(10px); }
          80% { transform: scale(0.95) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes healthTipsMotion {
          0% { transform: translateY(-10px) scale(1.05) rotate(-2deg); }
          20% { transform: translateY(10px) scale(1.08) rotate(2deg); }
          40% { transform: translateY(-8px) scale(1.03) rotate(-1deg); }
          60% { transform: translateY(8px) scale(1.07) rotate(1deg); }
          80% { transform: translateY(-6px) scale(1.04) rotate(-2deg); }
          100% { transform: translateY(-10px) scale(1.05) rotate(-2deg); }
        }
        .your-docter-animated-title.typewriter-motion {
          animation: typewriter 3.5s steps(16, end) 1s 1 normal both, blinkCaret 0.7s step-end infinite;
          border-right: 3px solid #0d6efd;
          white-space: nowrap;
          overflow: hidden;
          color: #0d6efd !important;
          text-shadow: 0 0 8px #0d6efd55, 0 0 16px #0d6efd22 !important;
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 16ch; }
        }
        @keyframes blinkCaret {
          from, to { border-color: transparent; }
          50% { border-color: #0d6efd; }
        }
        @keyframes blueGlow {
          0% {
            color: #0d6efd;
            text-shadow: 0 0 8px #0d6efd55, 0 0 16px #0d6efd22;
          }
          50% {
            color: #1976d2;
            text-shadow: 0 0 18px #1976d288, 0 0 32px #0d6efd44;
          }
          100% {
            color: #0d6efd;
            text-shadow: 0 0 8px #0d6efd55, 0 0 16px #0d6efd22;
          }
        }
        .health-tips-banner-animate {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 120px;
        }
        .health-tips-banner-animate-fixed {
          position: fixed;
          top: 40px;
          left: 0;
          width: 100vw;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .health-tips-animated-title {
          font-size: 3.5rem;
          font-weight: 900;
          color: #ffe066;
          letter-spacing: 2px;
          text-shadow: 0 6px 32px #000a, 0 2px 8px #0d6efd99;
          animation: healthTipsPop 1.2s cubic-bezier(0.23, 1.07, 0.32, 1) both;
          margin-bottom: 0;
          margin-top: 0;
        }
        .health-tips-animated-title-motion {
          font-size: 3.5rem;
          font-weight: 900;
          color: #0d6efd;
          letter-spacing: 2px;
          text-shadow: 0 6px 32px #0002, 0 2px 8px #0d6efd22;
          animation: healthTipsMotion 3.5s infinite cubic-bezier(0.23, 1.07, 0.32, 1);
          margin-bottom: 0;
          margin-top: 0;
          background: none;
          border-radius: 18px;
          padding: 0.5rem 2.5rem;
          box-shadow: none;
        }
        .animated-cards-container .first-aid-card {
          background: rgba(0,0,0,0.045) !important; /* much lighter background for readability */
          color: #222 !important;
          border: 0.1px solid #0d6efd !important;
          box-shadow: 0 4px 24px #0002, 0 2px 8px rgba(0,0,0,0.08) !important;
          outline: none !important;
        }
        .animated-cards-container .first-aid-card h4 {
          color: #0d6efd !important;
          text-shadow: none;
        }
        .animated-cards-container .first-aid-card p {
          color: #333 !important;
          text-shadow: none;
        }
        .animated-cards-container .first-aid-card.selected,
        .animated-cards-container .first-aid-card.selected:hover {
          background: #ffe066 !important;
          color: #333 !important;
          border-color: #0d6efd !important;
          box-shadow: 0 8px 32px #ffe06655, 0 2px 8px rgba(0,0,0,0.10) !important;
        }
        .animated-cards-container .first-aid-card:hover {
          background: #e3f6fc !important;
          color: #0d6efd !important;
          border-color: #0d6efd !important;
          box-shadow: 0 8px 32px #b3e5fc, 0 2px 8px #90caf9 !important;
          transform: scale(1.04);
          transition: background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          }
        .call-us-btn:hover, .call-us-btn:focus {
          background: linear-gradient(90deg, #0d6efd 0%, #111 100%) !important;
          color: #fff !important;
          box-shadow: 0 4px 24px #0d6efd55, 0 2px 8px #0003 !important;
        }
        .book-appointment-btn:hover, .book-appointment-btn:focus {
          background: linear-gradient(90deg, #0d6efd 0%, #111 100%) !important;
          color: #fff !important;
          box-shadow: 0 4px 24px #0d6efd55, 0 2px 8px #0003 !important;
        }
        .custom-blue-btn {
          background: #1565c0 !important;
          color: #fff !important;
          border: none !important;
          transition: background 0.2s, color 0.2s;
        }
        .custom-blue-btn:hover, .custom-blue-btn:focus {
          background: linear-gradient(90deg, #1565c0 0%, #111b2e 100%) !important;
          color: #fff !important;
          box-shadow: 0 4px 24px #1565c055, 0 2px 8px #0003 !important;
        }
        /* --- Mobile Responsive Styles (No Cute) --- */
        @media (max-width: 767px) {
          #home {
            min-height: unset !important;
            padding: 0 !important;
            background: url('/background image.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
          }
          .container, .container-fluid {
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin: 0 !important;
            width: 100vw !important;
            max-width: 100vw !important;
          }
          .row {
            margin: 0 !important;
            width: 100vw !important;
          }
          .col-md-5, .col-md-7, .col-12 {
            padding-left: 0 !important;
            padding-right: 0 !important;
            width: 100vw !important;
            max-width: 100vw !important;
          }
          .order-md-2 {
            order: 1 !important;
          }
          .order-md-1 {
            order: 2 !important;
          }
          .text-md-start {
            text-align: center !important;
          }
          .hero-doctor-img, .shadow {
            height: 200px !important;
            min-height: 120px !important;
            max-height: 220px !important;
            border-radius: 0 0 28px 28px !important;
            object-fit: cover !important;
            width: 100vw !important;
            max-width: 100vw !important;
            margin-bottom: 0.5rem !important;
            box-shadow: 0 8px 32px #0d6efd33, 0 2px 8px #0002 !important;
            border: none !important;
          }
          .mb-md-0 {
            margin-bottom: 0 !important;
          }
          .px-5 {
            padding-left: 0.7rem !important;
            padding-right: 0.7rem !important;
          }
          .display-5 {
            font-size: 1.5rem !important;
            padding-bottom: 0.5rem !important;
            color: #fff !important;
            text-shadow: 0 2px 8px rgba(0,0,0,0.7) !important;
          }
          .lead {
            font-size: 0.98rem !important;
            padding-bottom: 0.5rem !important;
            padding-left: 0.1rem !important;
            padding-right: 0.1rem !important;
            text-align: justify !important;
            color: #fff !important;
            background: rgba(0,0,0,0.10) !important;
            border-radius: 14px !important;
            box-shadow: 0 2px 8px #0d6efd22 !important;
          }
          .d-flex.gap-3.mt-3 {
            flex-direction: column !important;
            gap: 0.7rem !important;
            align-items: stretch !important;
          }
          .call-us-btn, .book-appointment-btn {
            width: 100% !important;
            min-width: unset !important;
            max-width: unset !important;
            font-size: 1rem !important;
            padding: 10px 0 !important;
            height: 44px !important;
            border-radius: 18px !important;
            background: #0d6efd !important;
            color: #fff !important;
            box-shadow: 0 2px 8px #0d6efd22 !important;
            border: none !important;
            transition: background 0.2s, color 0.2s, box-shadow 0.2s;
          }
          .call-us-btn:active, .book-appointment-btn:active {
            background: #1976d2 !important;
            color: #fff !important;
            box-shadow: 0 1px 4px #0d6efd22 !important;
          }
          /* Slider section */
          section[style*='minHeight: 100vh'] {
            padding: 1.2rem 0.2rem 1.2rem 0.2rem !important;
            min-height: unset !important;
            background: #fff !important;
            border-radius: 18px 18px 0 0 !important;
            box-shadow: 0 2px 12px #0d6efd22 !important;
            border: none !important;
          }
        }
        @media (max-width: 575.98px) {
          .container, .container-fluid, .row, .col-md-5, .col-md-7, .col-12 {
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .home-hero-section {
            padding: 0 !important;
            min-height: unset !important;
            overflow-x: hidden !important;
          }
          .home-hero-section > div[style*='position: relative'] {
            min-height: 60vh !important;
            height: auto !important;
            padding: 1.2rem 0.5rem 1.2rem 0.5rem !important;
            border-radius: 0 !important;
            overflow-x: hidden !important;
          }
          .your-docter-animated-title {
            font-size: 1.1rem !important;
            text-align: center !important;
            margin-bottom: 0.7rem !important;
            margin-top: 0.5rem !important;
            padding: 0 0.5rem !important;
            word-break: break-word !important;
            line-height: 1.25 !important;
            letter-spacing: 0.5px !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow-wrap: break-word !important;
            white-space: normal !important;
            display: block !important;
            box-sizing: border-box !important;
          }
          .home-hero-section h3 {
            font-size: 1.08rem !important;
            text-align: center !important;
            margin-bottom: 0.4rem !important;
          }
          .home-hero-section p {
            font-size: 0.97rem !important;
            text-align: justify !important;
            padding: 0.2rem 0.1rem !important;
            margin-bottom: 0 !important;
          }
          .d-flex.gap-3.mt-3 {
            flex-direction: column !important;
            gap: 0.7rem !important;
            align-items: stretch !important;
            width: 100% !important;
          }
          .call-us-btn, .book-appointment-btn {
            width: 100% !important;
            min-width: unset !important;
            max-width: unset !important;
            font-size: 1.08rem !important;
            padding: 12px 0 !important;
            height: 48px !important;
            border-radius: 18px !important;
            background: #0d6efd !important;
            color: #fff !important;
            box-shadow: 0 2px 8px #0d6efd22 !important;
            border: none !important;
            transition: background 0.2s, color 0.2s, box-shadow 0.2s;
            margin-bottom: 0.7rem !important;
            box-sizing: border-box !important;
          }
          .call-us-btn:active, .book-appointment-btn:active {
            background: #1976d2 !important;
            color: #fff !important;
            box-shadow: 0 1px 4px #0d6efd22 !important;
          }
          .mb-md-0 {
            margin-bottom: 0 !important;
          }
          .home-hero-section img, .hero-doctor-img, .shadow {
            height: 160px !important;
            min-height: 100px !important;
            max-height: 180px !important;
            border-radius: 0 0 18px 18px !important;
            object-fit: cover !important;
            width: 100% !important;
            max-width: 100% !important;
            margin-bottom: 0.7rem !important;
            box-shadow: 0 8px 32px #0d6efd33, 0 2px 8px #0002 !important;
            border: none !important;
            display: block !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>

      {/* Modal for card info */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.2rem' }}>{modalInfo.tip}</p>
          <div>
            <strong>More Information:</strong>
            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.7rem' }}>
              {modalInfo.links.map((link, i) => (
                <li key={i} style={{ marginBottom: '0.7rem' }}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0d6efd', textDecoration: 'underline', display: 'block', wordBreak: 'break-all' }}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
      </Modal>
      {/* Mobile responsive styles for hero section only */}
      <style>{`
        @media (max-width: 575.98px) {
          .home-hero-section {
            padding: 0 !important;
            min-height: unset !important;
            overflow-x: hidden !important;
            padding-top: 90px !important;
          }
          .home-hero-section > div[style*='position: relative'] {
            min-height: 60vh !important;
            height: auto !important;
            padding: 1.2rem 0.5rem 1.2rem 0.5rem !important;
            border-radius: 0 !important;
            overflow-x: hidden !important;
          }
          .your-docter-animated-title {
            font-size: 1.1rem !important;
            text-align: center !important;
            margin-bottom: 0.7rem !important;
            margin-top: 0.5rem !important;
            padding: 0 0.5rem !important;
            word-break: break-word !important;
            line-height: 1.25 !important;
            letter-spacing: 0.5px !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow-wrap: break-word !important;
            white-space: normal !important;
            display: block !important;
            box-sizing: border-box !important;
          }
          .home-hero-section h3 {
            font-size: 1.08rem !important;
            text-align: center !important;
            margin-bottom: 0.4rem !important;
          }
          .home-hero-section p {
            font-size: 0.97rem !important;
            text-align: justify !important;
            padding: 0.2rem 0.1rem !important;
            margin-bottom:  0 !important;
          }
          .d-flex.gap-3.mt-3 {
            flex-direction: column !important;
            gap: 0.7rem !important;
            align-items: stretch !important;
            width: 100% !important;
          }
          .call-us-btn, .book-appointment-btn {
            width: 100% !important;
            min-width: unset !important;
            max-width: unset !important;
            font-size: 1.08rem !important;
            padding:  12px 0 !important;
            height: 48px !important;
            border-radius: 18px !important;
            background: #0d6efd !important;
            color: #fff !important;
            box-shadow: 0 2px 8px #0d6efd22 !important;
            border: none !important;
            transition: background 0.2s, color 0.2s, box-shadow 0.2s;
            margin-bottom: 0.7rem !important;
            box-sizing: border-box !important;
          }
          .call-us-btn:active, .book-appointment-btn:active {
            background: #1976d2 !important;
            color: #fff !important;
            box-shadow: 0 1px 4px #0d6efd22 !important;
          }
          .mb-md-0 {
            margin-bottom: 0 !important;
          }
          .home-hero-section img, .hero-doctor-img, .shadow {
            height: 160px !important;
            min-height: 100px !important;
            max-height: 180px !important;
            border-radius: 0 0 18px 18px !important;
            object-fit: cover !important;
            width: 100% !important;
            max-width: 100% !important;
            margin-bottom: 0.7rem !important;
            box-shadow: 0 8px 32px #0d6efd33, 0 2px 8px #0002 !important;
            border: none !important;
            display: block !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </Container>
  );
}

export default Home;