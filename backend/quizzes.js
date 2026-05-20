const quizzes = [
  {
    id: "health",
    title: "Health and Well-being",
    description: "Basic healthy habits",
    questions: [
      {
        text: "How many hours of sleep are usually recommended for adults?",
        options: ["4-5", "6", "7-9", "10-12"],
        correctIndex: 2
      },
      {
        text: "What helps the most in a healthy routine?",
        options: ["Only supplements", "Consistency", "Skipping meals", "Not moving"],
        correctIndex: 1
      },
      {
        text: "What is most important when exercising?",
        options: ["Staying hydrated", "Competing", "Sweating a lot", "Running fast"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "nutrition",
    title: "Basic Nutrition",
    description: "Balanced eating and habits",
    questions: [
      {
        text: "Which food group provides protein?",
        options: ["Legumes", "Sugar", "Soft drinks", "Pastries"],
        correctIndex: 0
      },
      {
        text: "Which is usually a better daily drink?",
        options: ["Water", "Energy drink", "Soda", "Sugary smoothie"],
        correctIndex: 0
      },
      {
        text: "What is worth prioritizing?",
        options: ["Fruit and vegetables", "Ultra-processed foods", "Candy", "Sauces"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "exercise",
    title: "Exercise and Movement",
    description: "Physical activity and health",
    questions: [
      {
        text: "What is a benefit of exercise?",
        options: ["Better mood", "Always more tiredness", "Less oxygen", "Worse sleep"],
        correctIndex: 0
      },
      {
        text: "What is recommended before training?",
        options: ["Warm up", "Sleep", "Stop drinking water", "Eat only sweets"],
        correctIndex: 0
      },
      {
        text: "What helps you stay consistent?",
        options: ["Realistic goals", "Copying others", "Training nonstop", "Skipping rest"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "sleep",
    title: "Sleep and Rest",
    description: "Rest quality",
    questions: [
      {
        text: "What usually improves sleep?",
        options: ["A fixed routine", "Screens until bedtime", "Caffeine late at night", "Bright light"],
        correctIndex: 0
      },
      {
        text: "What should you avoid before going to bed?",
        options: ["Screens", "Breathing", "Relaxing", "Darkness"],
        correctIndex: 0
      },
      {
        text: "Rest helps you to…?",
        options: ["Recover energy", "Worsen memory", "Lose strength", "Reduce concentration"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "stress",
    title: "Stress Management",
    description: "Stress, calm, and self-care",
    questions: [
      {
        text: "What can help reduce stress?",
        options: ["Deep breathing", "Arguing more", "Sleeping less", "Always isolating yourself"],
        correctIndex: 0
      },
      {
        text: "What is useful when you feel overwhelmed?",
        options: ["Short breaks", "Keep going without stopping", "Look at more screens", "Ignore tiredness"],
        correctIndex: 0
      },
      {
        text: "What usually helps organize your mind?",
        options: ["Planning", "Always improvising", "Accumulating tasks", "Not prioritizing"],
        correctIndex: 0
      }
    ]
  },
  {
    id: "digital",
    title: "Digital Habits",
    description: "Healthy screen use",
    questions: [
      {
        text: "What helps rest your eyes?",
        options: ["Breaks", "Looking closely nonstop", "Max brightness", "Not blinking"],
        correctIndex: 0
      },
      {
        text: "What should you do with your phone at night?",
        options: ["Reduce use", "Use it more", "Sleep with notifications on", "Turn the volume up"],
        correctIndex: 0
      },
      {
        text: "What is better for focusing?",
        options: ["One task at a time", "Opening 10 apps", "Constantly switching chats", "Watching videos while studying"],
        correctIndex: 0
      }
    ]
  }
];

module.exports = { quizzes };