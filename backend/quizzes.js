const quizzes = [
  {
    id: "wellbeing-bachelors",
    title: "Well-Being in Practice Bachelors",
    description: "Well-being foundations and positive psychology",
    questions: [
      {
        text: "What are the 3 pillars of the IE Center for Health & Well-Being?",
        options: [
          "Body Balance, Party, and Religion",
          "Body Pump, Cross-fit, Zumba",
          "Body, Mind, Soul"
        ],
        correctIndex: 2
      },
      {
        text: "IE Center for Health & Well-Being is...",
        options: [
          "Balance, Appreciation, and Perspective",
          "Balance, Happiness, and Perspective",
          "Meaning, Thriving, and Positive State"
        ],
        correctIndex: 0
      },
      {
        text: "Positive Psychology is the scientific study of what makes life worth living...",
        options: ["False", "True"],
        correctIndex: 1
      },
      {
        text: "Positive Psychology aims for individuals and communities...",
        options: ["Thriving", "Survival"],
        correctIndex: 0
      },
      {
        text: "What is Resilience?",
        options: [
          "The capacity to recover quickly from difficulties",
          "The capacity to learn from difficulties",
          "The capacity to come out reinforced from difficulties",
          "All options are correct"
        ],
        correctIndex: 3
      },
      {
        text: "How do we build resilience?",
        options: [
          "By understanding our emotions",
          "By understanding our emotions' utility",
          "By understanding our emotions' impact on our well-being and behavior",
          "All options are correct"
        ],
        correctIndex: 3
      },
      {
        text: "Pleasant emotions...",
        options: [
          "Broaden our visual field",
          "Have a pro-social action response",
          "Create community",
          "All options are correct"
        ],
        correctIndex: 3
      },
      {
        text: "Unpleasant emotions...",
        options: [
          "Are connected to the upward spiral",
          "Essential for survival. They are signals",
          "Don't build resilience",
          "All options are correct"
        ],
        correctIndex: 1
      },
      {
        text: "I have agency to deal with my emotions.",
        options: ["True", "False"],
        correctIndex: 0
      }
    ]
  },

  {
    id: "wellbeing-masters",
    title: "Well-Being in Practice Masters",
    description: "Advanced well-being and leadership",
    questions: [
      {
        text: "According to the IE Center for Health & Well-being, well-being is...",
        options: [
          "A fixed state that we either have or don’t have",
          "A journey",
          "Mainly about productivity",
          "Only related to physical health"
        ],
        correctIndex: 1
      },
      {
        text: "The IE Center for Health & Well-being promotes well-being through...",
        options: [
          "Awareness, Knowledge, and Practice",
          "Success, Competition, and Performance",
          "Motivation, Talent, and Leadership",
          "Therapy, Coaching, and Mentoring"
        ],
        correctIndex: 0
      },
      {
        text: "Positive Psychology is the scientific study of...",
        options: [
          "Mental illness and disorders",
          "Emotions only",
          "What makes life worth living and flourishing",
          "Motivation in the workplace"
        ],
        correctIndex: 2
      },
      {
        text: "Which of the following is part of the PERMA-H framework?",
        options: ["Relationships", "Meaning", "Health", "All options are correct"],
        correctIndex: 3
      },
      {
        text: "Learned helplessness is contrasted in the session with...",
        options: ["Motivation", "Agency", "Productivity", "Intelligence"],
        correctIndex: 1
      },
      {
        text: "According to the session, resilience is...",
        options: [
          "Avoiding challenges and discomfort",
          "The capacity to recover quickly, learn, and come out reinforced",
          "Ignoring negative emotions",
          "Staying positive all the time"
        ],
        correctIndex: 1
      },
      {
        text: "Unpleasant emotions are important because...",
        options: [
          "They should always be avoided",
          "They are signs of weakness",
          "They are essential survival signals with adaptive functions",
          "They prevent resilience"
        ],
        correctIndex: 2
      },
      {
        text: "Pleasant emotions can help us...",
        options: [
          "Broaden our visual field",
          "Build community and connection",
          "Increase creativity and curiosity",
          "All options are correct"
        ],
        correctIndex: 3
      },
      {
        text: "According to the session, AI should ideally be used to...",
        options: [
          "Replace human connection and reflection",
          "Enhance learning and support growth without weakening our ability to relate and reflect",
          "Eliminate the need for emotional intelligence",
          "Automate all decision-making"
        ],
        correctIndex: 1
      }
    ]
  },

  {
    id: "bienestar-en-practica-master",
    title: "Bienestar en Práctica Máster",
    description: "Bienestar, psicología positiva y agency",
    questions: [
      {
        text: "Según el IE Center for Health & Well-being, el bienestar es…",
        options: [
          "Un estado fijo que tenemos o no tenemos",
          "Un viaje",
          "Principalmente productividad",
          "Solo relacionado con la salud física"
        ],
        correctIndex: 1
      },
      {
        text: "El IE Center for Health & Well-being promueve el bienestar a través de…",
        options: [
          "Awareness, Knowledge y Practice",
          "Éxito, competencia y rendimiento",
          "Motivación, talento y liderazgo",
          "Terapia, coaching y mentoring"
        ],
        correctIndex: 0
      },
      {
        text: "La Psicología Positiva es el estudio científico de…",
        options: [
          "Las enfermedades mentales y trastornos",
          "Solo las emociones",
          "Lo que hace que la vida merezca la pena y el flourishing",
          "La motivación en el trabajo"
        ],
        correctIndex: 2
      },
      {
        text: "¿Cuál de los siguientes elementos forma parte del modelo PERMA-H?",
        options: ["Relaciones", "Significado", "Salud", "Todas las opciones son correctas"],
        correctIndex: 3
      },
      {
        text: "En la sesión, la indefensión aprendida (“learned helplessness”) se contrasta con…",
        options: ["Motivación", "Agency (capacidad de actuar/influir)", "Productividad", "Inteligencia"],
        correctIndex: 1
      },
      {
        text: "Según la sesión, la resiliencia es…",
        options: [
          "Evitar los desafíos y el malestar",
          "La capacidad de recuperarse rápidamente, aprender y salir reforzado",
          "Ignorar las emociones negativas",
          "Mantenerse positivo todo el tiempo"
        ],
        correctIndex: 1
      },
      {
        text: "Las emociones desagradables son importantes porque…",
        options: [
          "Siempre deben evitarse",
          "Son señales de debilidad",
          "Son señales esenciales de supervivencia con funciones adaptativas",
          "Impiden desarrollar resiliencia"
        ],
        correctIndex: 2
      },
      {
        text: "Las emociones agradables pueden ayudarnos a…",
        options: [
          "Ampliar nuestro campo visual",
          "Crear comunidad y conexión",
          "Incrementar la creatividad y la curiosidad",
          "Todas las opciones son correctas"
        ],
        correctIndex: 3
      },
      {
        text: "Según la sesión, la IA debería utilizarse idealmente para…",
        options: [
          "Sustituir la conexión humana y la reflexión",
          "Potenciar el aprendizaje y apoyar el crecimiento sin debilitar nuestra capacidad de relacionarnos y reflexionar",
          "Eliminar la necesidad de inteligencia emocional",
          "Automatizar toda la toma de decisiones"
        ],
        correctIndex: 1
      }
    ]
  },

  {
    id: "attention-management",
    title: "Attention Management for Learning",
    description: "Attention, multitasking, and focus",
    questions: [
      {
        text: "Positive Psychology suggests that psychology should focus not only on fixing what is broken, but also on…",
        options: [
          "Increasing productivity",
          "Building what is strong",
          "Avoiding negative emotions",
          "Improving academic performance"
        ],
        correctIndex: 1
      },
      {
        text: "According to the session, we have agency over our attention and well-being.",
        options: ["True", "False"],
        correctIndex: 0
      },
      {
        text: "The “Great Acceleration” refers to…",
        options: [
          "The speed at which technology and modern life are accelerating",
          "The growth of universities worldwide",
          "The increase in attention span over time",
          "The reduction of distractions in daily life"
        ],
        correctIndex: 0
      },
      {
        text: "Multitasking is described in the session as…",
        options: [
          "A useful long-term skill",
          "A way to improve creativity",
          "Task switching that has a cost in energy and time",
          "A recommended study strategy"
        ],
        correctIndex: 2
      },
      {
        text: "Which of the following was mentioned as a consequence of multitasking?",
        options: [
          "Greater focus over time",
          "Better memory retention",
          "Mental and decision fatigue",
          "Increased creativity"
        ],
        correctIndex: 2
      },
      {
        text: "Attention is…",
        options: [
          "Unlimited and automatic",
          "Fixed and impossible to train",
          "A cognitive process that is limited, trainable, and influenced",
          "Only affected by technology"
        ],
        correctIndex: 2
      },
      {
        text: "According to the session, attention can be influenced by…",
        options: [
          "Personal habits",
          "Environmental conditions",
          "Digital and physical spaces",
          "All options are correct"
        ],
        correctIndex: 3
      },
      {
        text: "What is the main idea behind “Attention Management”?",
        options: [
          "Avoiding all distractions permanently",
          "Taking ownership of where and how we direct our focus",
          "Multitasking more efficiently",
          "Working longer hours"
        ],
        correctIndex: 1
      },
      {
        text: "According to the session, AI should ideally be used to…",
        options: [
          "Replace our ability to think and reflect",
          "Eliminate the need for focus",
          "Enhance learning and human connection without weakening attention",
          "Manage all of our decisions automatically"
        ],
        correctIndex: 2
      }
    ]
  },

  {
    id: "strengths-based-mindset",
    title: "Strengths-Based Mindset",
    description: "Character strengths, virtues, and flourishing",
    questions: [
      {
        text: "Positive Psychology is defined in the session as…",
        options: [
          "The study of mental illness and disorders",
          "The scientific study of how we can flourish",
          "The study of productivity and achievement",
          "The study of motivation only"
        ],
        correctIndex: 1
      },
      {
        text: "According to the session, we have agency over our well-being.",
        options: ["True", "False"],
        correctIndex: 0
      },
      {
        text: "Which of the following is NOT one of the six core virtues discussed in class?",
        options: ["Humanity", "Courage", "Intelligence", "Justice"],
        correctIndex: 2
      },
      {
        text: "When life feels flat or meaningless, we turn to ______ for awe, hope, gratitude, or something bigger than ourselves.",
        options: ["Temperance", "Wisdom", "Humanity", "Transcendence"],
        correctIndex: 3
      },
      {
        text: "Character strengths can help people…",
        options: [
          "Experience greater well-being",
          "Build stronger relationships",
          "Show greater resilience",
          "All options are correct"
        ],
        correctIndex: 3
      },
      {
        text: "According to the session, strengths are useful not only for success, but also for…",
        options: [
          "Navigating stress",
          "Supporting others",
          "Taking care of yourself",
          "All options are correct"
        ],
        correctIndex: 3
      },
      {
        text: "Which virtue includes strengths such as bravery, perseverance, honesty, and zest?",
        options: ["Humanity", "Courage", "Wisdom", "Justice"],
        correctIndex: 1
      },
      {
        text: "Which of the following strengths was mentioned as especially important in the age of AI?",
        options: [
          "Creativity and curiosity",
          "Judgment and perspective",
          "Love and kindness",
          "All options are correct"
        ],
        correctIndex: 3
      },
      {
        text: "What is the difference between a skill and a character strength, according to the session?",
        options: [
          "Skills are fixed while strengths can grow",
          "Strengths are more connected to values, identity, and how we naturally show up",
          "Skills are always more important than strengths",
          "There is no difference"
        ],
        correctIndex: 1
      }
    ]
  },

  {
    id: "purposeful-decisions",
    title: "Purposeful Decisions for Life's Journey",
    description: "Purpose, attention, and responsible decisions",
    questions: [
      {
        text: "Positive Psychology suggests that psychology should focus not only on fixing what is broken, but also on…",
        options: [
          "Increasing productivity",
          "Building what is strong",
          "Avoiding negative emotions",
          "Improving academic performance"
        ],
        correctIndex: 1
      },
      {
        text: "According to the session, we have agency over our attention and well-being.",
        options: ["True", "False"],
        correctIndex: 0
      },
      {
        text: "The “Great Acceleration” refers to…",
        options: [
          "The speed at which technology and modern life are accelerating",
          "The growth of universities worldwide",
          "The increase in attention span over time",
          "The reduction of distractions in daily life"
        ],
        correctIndex: 0
      },
      {
        text: "Multitasking is described in the session as…",
        options: [
          "A useful long-term skill",
          "A way to improve creativity",
          "Task switching that has a cost in energy and time",
          "A recommended study strategy"
        ],
        correctIndex: 2
      },
      {
        text: "Which of the following was mentioned as a consequence of multitasking?",
        options: [
          "Greater focus over time",
          "Better memory retention",
          "Mental and decision fatigue",
          "Increased creativity"
        ],
        correctIndex: 2
      },
      {
        text: "Attention is…",
        options: [
          "Unlimited and automatic",
          "Fixed and impossible to train",
          "A cognitive process that is limited, trainable, and influenced",
          "Only affected by technology"
        ],
        correctIndex: 2
      },
      {
        text: "According to the session, attention can be influenced by…",
        options: [
          "Personal habits",
          "Environmental conditions",
          "Digital and physical spaces",
          "All options are correct"
        ],
        correctIndex: 3
      },
      {
        text: "What is the main idea behind “Attention Management”?",
        options: [
          "Avoiding all distractions permanently",
          "Taking ownership of where and how we direct our focus",
          "Multitasking more efficiently",
          "Working longer hours"
        ],
        correctIndex: 1
      },
      {
        text: "According to the session, AI should ideally be used to…",
        options: [
          "Replace our ability to think and reflect",
          "Eliminate the need for focus",
          "Enhance learning and human connection without weakening attention",
          "Manage all of our decisions automatically"
        ],
        correctIndex: 2
      }
    ]
  }
];

module.exports = { quizzes };