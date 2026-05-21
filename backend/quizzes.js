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
      },
      {
        text: "According to the first session, why are pleasant emotions important for flourishing?",
        options: [
          "Because they help build connection, creativity, and resilience",
          "Because they eliminate all negative emotions permanently",
          "Because they make us more productive than everyone else",
          "Because being happy all the time is the goal of Positive Psychology"
        ],
        correctIndex: 1
      }
    ]
  },

  {
    id: "wellbeing-masters",
    title: "Well-Being in Practice Masters",
    description: "Advanced well-being and leadership",
    questions: [
  {
    text: "According to the IE Center for Health & Well-being, well-being is…",
    options: [
      "A fixed state that we either have or don’t have",
      "A journey",
      "Mainly about productivity",
      "Reaching inbox zero and inner peace simultaneously"
    ],
    correctIndex: 1
  },
  {
    text: "The IE Center for Health & Well-being promotes well-being through…",
    options: [
      "Awareness, Knowledge, and Practice",
      "Success, Competition, and Performance",
      "Motivation, Talent, and Leadership",
      "Becoming your highest vibrational self"
    ],
    correctIndex: 0
  },
  {
    text: "Positive Psychology is the scientific study of…",
    options: [
      "Mental illness and disorders",
      "Emotions only",
      "What makes life worth living and flourishing",
      "How to smile professionally during group projects"
    ],
    correctIndex: 2
  },
  {
    text: "Which of the following is part of the PERMA-H framework?",
    options: [
      "Relationships",
      "Meaning",
      "Health",
      "All options are correct"
    ],
    correctIndex: 3
  },
  {
    text: "Learned helplessness is contrasted in the session with…",
    options: [
      "Motivation",
      "Agency",
      "Productivity",
      "Main-character energy"
    ],
    correctIndex: 1
  },
  {
    text: "According to the session, resilience is…",
    options: [
      "Avoiding challenges and discomfort",
      "The capacity to recover quickly, learn, and come out reinforced",
      "Ignoring negative emotions",
      "Pretending everything is fine with a positive mindset"
    ],
    correctIndex: 1
  },
  {
    text: "Unpleasant emotions are important because…",
    options: [
      "They should always be avoided",
      "They are signs of weakness",
      "They are essential survival signals with adaptive functions",
      "They make us more dramatic and mysterious"
    ],
    correctIndex: 2
  },
  {
    text: "Pleasant emotions can help us…",
    options: [
      "Broaden our visual field",
      "Build community and connection",
      "Increase creativity and curiosity",
      "All options are correct"
    ],
    correctIndex: 3
  },
  {
    text: "According to the session, AI should ideally be used to…",
    options: [
      "Replace human connection and reflection",
      "Enhance learning and support growth without weakening our ability to relate and reflect",
      "Eliminate the need for emotional intelligence",
      "Write emotionally deep discussion posts for us"
    ],
    correctIndex: 1
  },
  {
    text: "According to the session, PERMA-H includes “Health” because…",
    options: [
      "Well-being also depends on sleep, movement, and physical care",
      "Physical health has no connection to flourishing",
      "Productivity matters more than rest",
      "Drinking iced coffee counts as self-care"
    ],
    correctIndex: 0
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
          "Alcanzar inbox zero y paz interior al mismo tiempo"
        ],
        correctIndex: 1
      },
      {
        text: "El IE Center for Health & Well-being promueve el bienestar a través de…",
        options: [
          "Awareness, Knowledge y Practice",
          "Éxito, competencia y rendimiento",
          "Motivación, talento y liderazgo",
          "Convertirte en tu versión más “vibrational”"
        ],
        correctIndex: 0
      },
      {
        text: "La Psicología Positiva es el estudio científico de…",
        options: [
          "Las enfermedades mentales y trastornos",
          "Solo las emociones",
          "Lo que hace que la vida merezca la pena y el flourishing",
          "Cómo sonreír profesionalmente durante los trabajos en grupo"
        ],
        correctIndex: 2
      },
      {
        text: "¿Cuál de los siguientes elementos forma parte del modelo PERMA-H?",
        options: [
          "Relaciones",
          "Significado",
          "Salud",
          "Todas las opciones son correctas"
        ],
        correctIndex: 3
      },
      {
        text: "En la sesión, la indefensión aprendida (“learned helplessness”) se contrasta con…",
        options: [
          "Motivación",
          "Agency (capacidad de actuar/influir)",
          "Productividad",
          "Energía de protagonista de película"
        ],
        correctIndex: 1
      },
      {
        text: "Según la sesión, la resiliencia es…",
        options: [
          "Evitar los desafíos y el malestar",
          "La capacidad de recuperarse rápidamente, aprender y salir reforzado",
          "Ignorar las emociones negativas",
          "Fingir que todo va bien con mentalidad positiva"
        ],
        correctIndex: 1
      },
      {
        text: "Las emociones desagradables son importantes porque…",
        options: [
          "Siempre deben evitarse",
          "Son señales de debilidad",
          "Son señales esenciales de supervivencia con funciones adaptativas",
          "Nos hacen más dramáticos e interesantes"
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
          "Escribir por nosotros posts emocionalmente profundos para Blackboard"
        ],
        correctIndex: 1
      },
      {
        text: "Según la sesión, PERMA-H incluye “Health” porque…",
        options: [
          "El bienestar también depende del sueño, el movimiento y el cuidado físico",
          "La salud física no tiene relación con el flourishing",
          "La productividad es más importante que el descanso",
          "Beber iced coffee cuenta como autocuidado"
        ],
        correctIndex: 0
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
          "Becoming the most emotionally evolved person on campus",
          "Avoiding negative emotions"
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
          "The speed at which unread emails multiply overnight"
        ],
        correctIndex: 0
      },
      {
        text: "Multitasking is described in the session as…",
        options: [
          "A useful long-term skill",
          "A way to improve creativity",
          "Task switching that has a cost in energy and time",
          "A recommended study strategy for surviving finals week"
        ],
        correctIndex: 2
      },
      {
        text: "Which of the following was mentioned as a consequence of multitasking?",
        options: [
          "Suddenly becoming a productivity guru",
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
          "Studying 24/7 while drinking iced coffee"
        ],
        correctIndex: 1
      },
      {
        text: "According to the first session, AI should ideally be used to…",
        options: [
          "Replace our ability to think and reflect",
          "Eliminate the need for focus",
          "Enhance learning and human connection without weakening attention",
          "Manage all of our decisions automatically"
        ],
        correctIndex: 2
      },
      {
        text: "According to the first session, why is multitasking considered a myth?",
        options: [
          "Because the brain can only fully focus on one demanding task at a time",
          "Because multitasking is only possible after 3 coffees",
          "Because it helps us retain more information",
          "Because humans are naturally designed to focus on everything at once"
        ],
        correctIndex: 0
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
          "The study of becoming your “best self” on LinkedIn"
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
        text: "According to the first session, why can character strengths be especially helpful during difficult moments?",
        options: [
          "They help us navigate challenges using our inner resources",
          "They eliminate stress and uncertainty completely",
          "They make us naturally better than other people",
          "They unlock a secret level of emotional intelligence overnight"
        ],
        correctIndex: 0
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
      },
      {
        text: "According to the session, why might knowing your strengths be helpful?",
        options: [
          "It tells you which Hogwarts house you belong to",
          "It can help you understand how you naturally respond to challenges and relationships",
          "It guarantees career success and happiness",
          "It allows you to avoid all stress and discomfort"
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
        text: "According to the course, purpose is something…",
        options: [
          "That teachers can give you",
          "You discover and build for yourself",
          "That your family defines for you",
          "Hidden inside your LinkedIn profile"
        ],
        correctIndex: 1
      },
      {
        text: "The IE Center for Health & Well-being supports holistic human development based on…",
        options: [
          "Motivation and talent",
          "Drinking matcha and manifesting success",
          "Scientific knowledge",
          "Academic achievement"
        ],
        correctIndex: 2
      },
      {
        text: "According to the first session, why are the well-being workshops designed as a multi-year journey?",
        options: [
          "Because they are connected and build on each other over time",
          "Because students need something to do every year",
          "Because well-being can be developed through continued awareness, knowledge, and practice",
          "All options are correct except b"
        ],
        correctIndex: 3
      },
      {
        text: "Meaning in life includes which 3 dimensions mentioned in class?",
        options: [
          "Coherence, Purpose, and Significance",
          "Identity, Confidence, and a Perfect skincare routine",
          "Happiness, Success, and Balance",
          "Passion, Career, and Achievement"
        ],
        correctIndex: 0
      },
      {
        text: "Coherence refers to...",
        options: [
          "Feeling emotionally intense experiences",
          "Having a clear career path",
          "Living according to other people's expectations",
          "The degree to which life makes sense and feels structured"
        ],
        correctIndex: 3
      },
      {
        text: "Purpose is described as...",
        options: [
          "Becoming famous on social media",
          "A short-term personal goal",
          "A sense of long-term direction larger than yourself",
          "External validation from society"
        ],
        correctIndex: 2
      },
      {
        text: "According to the first session, around what percentage of people in their 20s show a singular passion or clear sense of the work they want to do?",
        options: [
          "20-23%",
          "10-12%",
          "99.9% after one motivational TikTok",
          "35-40%"
        ],
        correctIndex: 0
      },
      {
        text: "Passion can support purpose because it helps reveal...",
        options: [
          "What other people expect from us",
          "What energizes and excites us",
          "What guaranteess success",
          "Which café you should work from"
        ],
        correctIndex: 1
      },
      {
        text: "Values were described in the first session as...",
        options: [
          "Temporary emotions that influence behavior",
          "Skills than improve productivity",
          "Rules invented by productivity influencers online",
          "Deep principles and qualities hat guide our decisions"
        ],
        correctIndex: 3
      },
      {
        text: "According to the first session, meaning in life helps people...",
        options: [
          "Become successful faster than everyone else",
          "Feel connected to themselves, others, and the world",
          "Avoid all discomfort and uncertainty",
          "Always know exactly what they're doing in life"
        ],
        correctIndex: 1
      }
    ]
  }
];

module.exports = { quizzes };