import { slugify } from "@/lib/slugify";

export const courses = [
  {
    id: 1,
    title: "Diploma in Generative AI & Prompt Engineering",
    level: "diploma",
    category: "generative-ai",
    duration: "12 Months",

    rating: 4.8,
    students: 2850,
    price: "₹1,25,000",
    originalPrice: "₹1,40,000",
    discount: "11% off",
    monthlyPrice: "₹10,417",
    monthlyPayments: 12,
    image: "https://via.placeholder.com/600x300?text=Generative+AI+Diploma",
    description: "Perfect for beginners, 12th-pass students, and career switchers. Build strong foundations in AI/ML, Python, prompt engineering, LLMs, RAG, and hands-on projects in text, vision, and multimodal AI with portfolio and placement support.",
    fullDescription: "This comprehensive 12-month diploma program takes beginners from zero to job-ready in Generative AI. Learn Python for AI, prompt engineering mastery, core LLM concepts, and build real-world projects in language, vision, and multimodal AI. Graduates receive a professional portfolio and are prepared for roles like AI Developer, Prompt Engineer, or GenAI Specialist.",
    instructor: {
      name: "Shagun Srivastava",
      title: "Lead Instructor – Generative AI",
      bio: "Experienced AI educator with expertise in LLMs, prompt engineering, and applied GenAI.",
      image: "/Nigapepic/manjeet.webp",
      credentials: ["10+ Years in AI Education", "Built 50+ GenAI Projects"]
    },
    topics: ["Python for AI", "Prompt Engineering", "LLMs", "Generative Models", "Computer Vision", "Multimodal AI", "Project Portfolio"],
    whatYouWillLearn: [
      "Python programming for AI applications",
      "Advanced prompt engineering techniques",
      "Understanding and using Large Language Models",
      "Text-to-image & image-to-text generation",
      "Multimodal AI systems",
      "Building complete GenAI applications",
      "Professional portfolio creation",
      "Job-ready skills for AI roles"
    ],
    modulesByMonth: [
      {
        month: 1,
        title: "Foundations of AI & Python",
        topics: ["Python Basics for AI", "Data Structures & Libraries", "Intro to AI/ML Concepts", "Git & Version Control"],
        hours: 60
      },
      {
        month: 2,
        title: "Mathematics & Data for AI",
        topics: ["Linear Algebra & Calculus Basics", "Probability & Statistics", "Data Handling with Pandas", "Visualization for AI"],
        hours: 55
      },
      {
        month: 3,
        title: "Prompt Engineering Fundamentals",
        topics: ["Core Prompting Techniques", "Chain-of-Thought & Few-Shot", "Role Prompting", "Prompt Optimization"],
        hours: 60
      },
      {
        month: 4,
        title: "Large Language Models",
        topics: ["Transformer Architecture", "LLM Families (GPT, LLaMA, etc.)", "Inference & API Usage", "Fine-tuning Basics"],
        hours: 65
      },
      {
        month: 5,
        title: "Generative AI – Text",
        topics: ["Text Generation", "Summarization & Rewriting", "Chatbot Development", "RAG Systems"],
        hours: 60
      },
      {
        month: 6,
        title: "Computer Vision with Generative AI",
        topics: ["Diffusion Models", "Stable Diffusion", "Image Editing & Inpainting", "Vision-Language Models"],
        hours: 62
      },
      {
        month: 7,
        title: "Multimodal AI",
        topics: ["CLIP & BLIP", "GPT-4V / LLaVA-style models", "Multimodal Prompting", "Video Generation Basics"],
        hours: 60
      },
      {
        month: 8,
        title: "Advanced Prompt Frameworks",
        topics: ["Tree-of-Thoughts", "ReAct & Agent Frameworks", "Self-Consistency Prompting", "Prompt Chaining"],
        hours: 55
      },
      {
        month: 9,
        title: "Fine-tuning & Deployment",
        topics: ["LoRA & QLoRA", "Model Quantization", "Deploying LLMs (vLLM, TGI)", "API Development"],
        hours: 65
      },
      {
        month: 10,
        title: "Capstone Project – Phase 1",
        topics: ["Project Ideation", "Data Collection", "Model Selection & Prompt Design", "Initial Implementation"],
        hours: 70
      },
      {
        month: 11,
        title: "Capstone Project – Phase 2",
        topics: ["Advanced Features", "User Interface Integration", "Evaluation & Testing", "Documentation"],
        hours: 70
      },
      {
        month: 12,
        title: "Portfolio & Career Preparation",
        topics: ["Portfolio Building", "GitHub Showcase", "Interview Prep", "Job Application Strategy"],
        hours: 65
      }
    ],
    requirements: ["12th pass or equivalent", "Basic computer skills", "Laptop with 8GB+ RAM", "10–12 hours/week commitment"],
    targetAudience: ["Beginners", "12th-pass students", "Career switchers to AI", "Anyone serious about GenAI career"],
    includes: ["200+ hours of content", "40+ hands-on projects", "GPU access", "Lifetime access", "Diploma certificate", "Job assistance", "Professional portfolio"],
    reviews: [
      { name: "Priya Sharma", rating: 5, comment: "NIGAPE gave me the confidence to build and present real GenAI projects in interviews.", date: "2025-12-05" }
    ]
  },
  {
    id: 2,
    title: "Advanced Generative AI & Prompt Engineering",
    level: "advanced",
    category: "generative-ai",
    duration: "20 Weeks (160 Hours)",
    // mode: "Hybrid Learning",
    level: "Professional Certificate",
    students: 920,
    price: "₹95,000",
    originalPrice: "₹1,05,000",
    discount: "10% off",
    monthlyPrice: "₹15,833",
    monthlyPayments: 6,
    image: "https://via.placeholder.com/600x300?text=Advanced+GenAI",
    description: "Master advanced LLMs, prompt engineering, AI agents, RAG, automation, and enterprise-grade Generative AI through real projects designed for career-ready skills.",
    fullDescription: "Designed for learners with basic AI knowledge, this 6-month advanced program covers state-of-the-art generative models, fine-tuning techniques, advanced prompting, agentic systems, and production deployment of GenAI solutions.",
    instructor: {
      name: "Miss. Shagun",
      title: "Lead Instructor – Advanced GenAI",
      bio: "Master in AI | Former Lead AI Researcher | Expert in LLMs & Prompt Engineering",
      image: "/shagun.png",
      credentials: ["Master in AI", "15+ Years Experience", "Published in top AI conferences"]
    },
    topics: ["Advanced LLMs", "Fine-tuning", "Prompt Frameworks", "Agentic AI", "Multimodal Systems", "Production Deployment"],
    whatYouWillLearn: [
      "State-of-the-art LLM architectures",
      "Efficient fine-tuning (LoRA, QLoRA)",
      "Advanced prompt engineering frameworks",
      "Building autonomous AI agents",
      "Multimodal model integration",
      "Production-grade GenAI deployment"
    ],
    modulesByMonth: [
      {
        month: 1,
        title: "Advanced LLM Architectures",
        topics: ["Mixture-of-Experts", "Sparse & Efficient Transformers", "Latest Open Models", "Scaling Laws"],
        hours: 65
      },
      {
        month: 2,
        title: "Fine-tuning & Customization",
        topics: ["Full vs PEFT Fine-tuning", "LoRA/QLoRA Mastery", "Instruction Tuning", "RLHF Basics"],
        hours: 70
      },
      {
        month: 3,
        title: "Advanced Prompt Engineering",
        topics: ["Tree-of-Thoughts", "ReAct & Tool Use", "Self-Consistency", "Automatic Prompt Optimization"],
        hours: 65
      },
      {
        month: 4,
        title: "Agentic & Autonomous Systems",
        topics: ["AI Agents Architecture", "Tool Integration", "Memory & Planning", "Multi-Agent Systems"],
        hours: 68
      },
      {
        month: 5,
        title: "Multimodal & Production Systems",
        topics: ["Vision-Language Models", "Video Generation", "Inference Optimization", "Deployment (vLLM, TGI, Triton)"],
        hours: 65
      },
      {
        month: 6,
        title: "Capstone & Industry Project",
        topics: ["Enterprise-grade GenAI Solution", "System Design", "Production Deployment", "Final Presentation"],
        hours: 80
      }
    ],
    requirements: ["Basic AI/ML knowledge", "Python proficiency", "Understanding of LLMs", "12+ hours/week"],
    targetAudience: ["Intermediate AI learners", "Professionals upgrading skills", "Those aiming for senior GenAI roles"],
    includes: ["140+ hours of advanced content", "25+ complex projects", "GPU credits", "Advanced certificate", "Mentorship"],
    reviews: [
      { name: "Rahul Verma", rating: 5, comment: "The advanced track helped me lead Prompt Engineering and AI automation initiatives at work.", date: "2025-12-01" }
    ]
  },
  {
    id: 3,
    title: "AI Literacy for Everyone",
    level: "beginner",
    category: "ai-literacy",
    duration: "1.5 Months",
    // mode: "Online Live + Recorded",  
    rating: 4.9,
    students: 4200,
    price: "₹12,999",
    originalPrice: "₹15,000",
    discount: "13% off",
    monthlyPrice: "₹12,999",
    monthlyPayments: 1,
    image: "https://via.placeholder.com/600x300?text=AI+Literacy",
    description: "No coding required. Learn essential AI concepts, practical prompting, and real-world applications for students and non-tech professionals.",
    fullDescription: "Perfect introduction to AI for school/college students and non-technical professionals. Understand how AI works, master effective prompting, and explore AI applications across industries – no coding needed.",
    instructor: {
      name: "Team NIGAPE",
      title: "AI Literacy Faculty",
      bio: "Expert educators simplifying AI for everyone",
      image: "/Nigapepic/me.webp",
      credentials: ["Certified AI Educators"]
    },
    topics: ["AI Basics", "Prompting Skills", "AI Tools", "Ethics & Applications"],
    whatYouWillLearn: [
      "What is AI and how it works today",
      "How to talk to AI effectively",
      "Using ChatGPT, Gemini, Claude & more",
      "AI in daily life & careers",
      "Responsible AI usage"
    ],
    modulesByMonth: [
      {
        month: 1,
        title: "Understanding AI (Weeks 1–3)",
        topics: ["What is AI?", "History of AI", "Current AI Landscape", "How LLMs Work"],
        hours: 20
      },
      {
        month: 1.5,
        title: "Practical AI Skills (Weeks 4–6)",
        topics: ["Mastering Prompts", "Using Top AI Tools", "AI for Studies & Work", "AI Ethics & Safety"],
        hours: 25
      }
    ],
    requirements: ["Basic computer skills", "Curiosity about AI"],
    targetAudience: ["School & college students", "Non-technical professionals", "Parents", "Anyone new to AI"],
    includes: ["45+ hours of content", "Interactive sessions", "AI tool practice", "Certificate of Completion"],
    reviews: [
      { name: "Ananya Rao", rating: 5, comment: "As a beginner, this course made AI practical and useful for my college work and internships.", date: "2025-11-28" }
    ]
  },
  {
    id: 4,
    title: "Generative AI for Professionals",
    level: "professional",
    category: "generative-ai",
    duration: "4 Months",
    // mode: "Hybrid Learning",
    rating: 4.8,
    students: 1850,
    price: "₹68,000",
    originalPrice: "₹75,000",
    discount: "9% off",
    monthlyPrice: "₹17,000",
    monthlyPayments: 4,
    image: "https://via.placeholder.com/600x300?text=GenAI+for+Professionals",
    description: "Practical GenAI skills for working professionals. Learn to apply generative AI in business – text, image, data analysis, automation, and decision-making.",
    fullDescription: "Designed for working professionals who want to integrate GenAI into their current role or pivot to AI-focused positions. Focus on practical business applications, prompt engineering, and real-world use cases.",
    instructor: {
      name: "Miss. Shagun",
      title: "Lead Instructor – GenAI for Business",
      bio: "Master in AI | Industry veteran in AI transformation",
      image: "/shagun.png",
      credentials: ["Master in AI", "15+ Years Experience"]
    },
    topics: ["Business GenAI", "Prompt Engineering", "AI Automation", "Data Analysis with AI", "AI Decision Making"],
    whatYouWillLearn: [
      "GenAI applications in business",
      "Advanced business prompting",
      "Automating workflows with AI",
      "AI-powered data insights",
      "Building AI-first processes"
    ],
    modulesByMonth: [
      {
        month: 1,
        title: "GenAI Business Fundamentals",
        topics: ["GenAI in Industry", "Key Use Cases", "Prompt Engineering for Business", "Tool Overview"],
        hours: 50
      },
      {
        month: 2,
        title: "Text & Content Generation",
        topics: ["Marketing & Copywriting", "Reports & Summarization", "Customer Support AI", "Legal & HR Use Cases"],
        hours: 55
      },
      {
        month: 3,
        title: "Visual & Data GenAI",
        topics: ["Image Generation for Business", "Data Visualization with AI", "AI Analytics & Insights", "No-Code AI Tools"],
        hours: 55
      },
      {
        month: 4,
        title: "Implementation & Projects",
        topics: ["Building AI Workflows", "Capstone Business Project", "ROI of GenAI", "Change Management"],
        hours: 60
      }
    ],
    requirements: ["Working professional", "Basic computer skills", "8–10 hours/week"],
    targetAudience: ["Mid-level professionals", "Managers", "Business analysts", "Career pivoters"],
    includes: ["120+ hours content", "15+ business projects", "Employer-recognized certificate", "Implementation toolkit"],
    reviews: [
      { name: "Vikram Malhotra", rating: 5, comment: "I applied the cohort learnings directly to automate reporting and improve team productivity.", date: "2025-11-25" }
    ]
  },
  {
    id: 5,
    title: "NLP Professional",
    level: "professional",
    category: "nlp",
    duration: "4 Months",
    // mode: "Hybrid Learning",
    rating: 4.7,
    students: 780,
    price: "₹72,000",
    originalPrice: "₹80,000",
    discount: "10% off",
    monthlyPrice: "₹18,000",
    monthlyPayments: 4,
    image: "https://via.placeholder.com/600x300?text=NLP+Professional",
    description: "Master Natural Language Processing – from text processing to transformer models and real-world NLP applications.",
    fullDescription: "Become an NLP specialist. Learn text processing, transformer architectures, and build production-grade NLP systems like chatbots, sentiment analyzers, and more.",
    instructor: {
      name: "Shagun Srivastava",
      title: "Lead Instructor – NLP",
      bio: "NLP expert with experience building enterprise language systems",
      image: "/Nigapepic/manjeet.webp",
      credentials: ["10+ Years in NLP", "Built 30+ NLP Solutions"]
    },
    topics: ["Text Processing", "Transformers", "Chatbots", "Sentiment Analysis", "RAG", "Text Generation"],
    whatYouWillLearn: [
      "Advanced text preprocessing",
      "Transformer architecture mastery",
      "Building conversational AI",
      "RAG systems for accurate answers",
      "Production NLP deployment"
    ],
    modulesByMonth: [
      {
        month: 1,
        title: "NLP Foundations",
        topics: ["Text Processing Pipeline", "Tokenization & Embeddings", "Classical NLP", "Evaluation Metrics"],
        hours: 55
      },
      {
        month: 2,
        title: "Transformers & LLMs",
        topics: ["Attention Mechanism", "BERT & RoBERTa", "GPT-style Models", "Fine-tuning Transformers"],
        hours: 60
      },
      {
        month: 3,
        title: "Advanced NLP Applications",
        topics: ["Chatbots & Dialog Systems", "RAG & Knowledge Bases", "Text Classification & NER", "Summarization & Translation"],
        hours: 65
      },
      {
        month: 4,
        title: "Projects & Deployment",
        topics: ["End-to-End NLP Projects", "Production Deployment", "Monitoring NLP Systems", "Capstone Project"],
        hours: 70
      }
    ],
    requirements: ["Python knowledge", "Basic ML understanding"],
    targetAudience: ["Aspiring NLP Engineers", "Data Scientists specializing in text"],
    includes: ["180+ hours content", "20+ NLP projects", "Certificate", "Portfolio"],
    reviews: [
      { name: "Kavya Iyer", rating: 5, comment: "I now build chatbots and RAG workflows with clear deployment practices taught at NIGAPE.", date: "2025-12-02" }
    ]
  },
  {
    id: 6,
    title: "Computer Vision Professional",
    level: "professional",
    category: "computer-vision",
    duration: "4 Months",
    // mode: "Hybrid Learning",
    rating: 4.8,
    students: 650,
    price: "₹75,000",
    originalPrice: "₹82,000",
    discount: "9% off",
    monthlyPrice: "₹18,750",
    monthlyPayments: 4,
    image: "https://via.placeholder.com/600x300?text=Computer+Vision",
    description: "Master computer vision – CNNs, object detection, segmentation, image generation, and real-world CV projects.",
    fullDescription: "Become a computer vision specialist. Learn CNNs, object detection, segmentation, generative vision models, and build industry-grade applications.",
    instructor: {
      name: "Miss. Shagun",
      title: "Lead Instructor – Computer Vision",
      bio: "Master in AI | Expert in vision models & generative AI",
      image: "/shagun.png",
      credentials: ["Master in AI", "15+ Years Experience"]
    },
    topics: ["CNNs", "Object Detection", "Segmentation", "Image Generation", "Vision Transformers", "Multimodal Vision"],
    whatYouWillLearn: [
      "Advanced CNN architectures",
      "State-of-the-art object detection",
      "Semantic & instance segmentation",
      "Diffusion models for image generation",
      "Vision-language models"
    ],
    modulesByMonth: [
      {
        month: 1,
        title: "CV Fundamentals",
        topics: ["Image Processing", "CNN Architecture", "Transfer Learning", "Data Augmentation"],
        hours: 55
      },
      {
        month: 2,
        title: "Object Detection & Segmentation",
        topics: ["YOLO, Faster R-CNN", "Mask R-CNN", "SAM & Segment Anything", "Instance Segmentation"],
        hours: 60
      },
      {
        month: 3,
        title: "Generative Vision & Advanced Topics",
        topics: ["Diffusion Models", "Stable Diffusion Fine-tuning", "Vision Transformers", "Video Understanding"],
        hours: 65
      },
      {
        month: 4,
        title: "Projects & Deployment",
        topics: ["Industry-grade CV Projects", "Model Optimization", "Edge Deployment", "Capstone Project"],
        hours: 70
      }
    ],
    requirements: ["Python & basic ML knowledge"],
    targetAudience: ["Aspiring CV Engineers", "Professionals in healthcare, automotive, robotics"],
    includes: ["190+ hours", "25+ CV projects", "GPU access", "Certificate"],
    reviews: [
      { name: "Aditya Kapoor", rating: 5, comment: "The hands-on labs and mentor reviews helped me ship production-ready vision projects.", date: "2025-11-30" }
    ]
  },
  {
    id: 7,
    title: "Deep Learning Professional",
    level: "advanced",
    category: "deep-learning",
    duration: "20 Weeks (160 Hours)",
    // mode: "Hybrid Learning",
    rating: 4.9,
    students: 520,
    price: "₹82,000",
    originalPrice: "₹90,000",
    discount: "9% off",
    monthlyPrice: "₹20,500",
    monthlyPayments: 4,
    image: "https://via.placeholder.com/600x300?text=Deep+Learning",
    description: "In-depth deep learning: neural networks, CNNs, RNNs, GANs, transformers, reinforcement learning basics, and large model architectures.",
    fullDescription: "Master the foundations and frontiers of Deep Learning to build next-generation AI systems. This intensive program transforms technical professionals into expert Deep Learning practitioners capable of designing, implementing, and deploying sophisticated neural networks across diverse domains and applications.",
    instructor: {
      name: "Miss. Shagun",
      title: "Lead Instructor – Deep Learning",
      bio: "Master in AI | Research background in deep learning architectures",
      image: "/shagun.png",
      credentials: ["Master in AI", "15+ Years Experience"]
    },
    topics: ["Neural Networks", "CNNs", "RNNs/LSTMs", "GANs", "Transformers", "Reinforcement Learning"],
    whatYouWillLearn: [
      "Deep understanding of neural architectures",
      "Building models from scratch",
      "Advanced optimization techniques",
      "Research-level deep learning",
      "Modern large-scale architectures"
    ],
    modulesByMonth: [ /* Note: Since modulesByMonth uses month numbers 1-5 for the new 20-week structure, kept as-is with updated titles/topics/hours from detailed curriculum. Adjusted to fit 5 modules over 20 weeks. */
      {
        month: 1,
        title: "Mathematical Foundations & Neural Network Basics",
        topics: [
          "Math for Deep Learning",
          "Neural Network Fundamentals",
          "Backpropagation & Optimization",
          "Regularization & Training Dynamics"
        ],
        hours: 60
      },
      {
        month: 2,
        title: "Computer Vision & Convolutional Networks",
        topics: [
          "CNNs & Architectures",
          "Object Detection",
          "Image Segmentation",
          "GANs & Image Generation"
        ],
        hours: 65
      },
      {
        month: 3,
        title: "Sequential Data & Recurrent Networks",
        topics: [
          "RNNs, LSTMs, GRUs",
          "Sequence-to-Sequence Learning",
          "Attention & Transformers",
          "Time Series & Forecasting"
        ],
        hours: 70
      },
      {
        month: 4,
        title: "Transformer Revolution & Modern AI",
        topics: [
          "Transformer Architecture",
          "Pre-trained Language Models",
          "Vision Transformers & Multimodal AI",
          "Large Language Models (LLMs)"
        ],
        hours: 75
      },
      {
        month: 5,
        title: "Advanced Topics, Production & Research",
        topics: [
          "Generative & Creative AI",
          "Advanced Architectures",
          "Model Optimization & Deployment",
          "Research & Capstone"
        ],
        hours: 80
      }
    ],
    requirements: ["Strong Python & math background", "Basic ML knowledge"],
    targetAudience: ["Aspiring AI researchers", "Deep learning engineers", "R&D professionals"],
    includes: ["200+ hours", "30+ advanced projects", "GPU resources", "Advanced certificate"],
    reviews: [
      { name: "Sarthak Jain", rating: 5, comment: "This program gave me the depth and project rigor I needed for AI research-track roles.", date: "2025-12-04" }
    ]
  },
{
  id: 8,
  title: "Advanced Certification in Generative AI & Prompt Engineering",
  level: "certification",
  category: "generative-ai",
  duration: "6 Months",
  rating: 4.8,
  students: 1100,
  price: "₹85,000",
  originalPrice: "₹95,000",
  discount: "11% off",
  monthlyPrice: "₹14,167",
  monthlyPayments: 6,
  image: "https://via.placeholder.com/600x300?text=Advanced+Certification+GenAI",
  description:
    "An industry-recognized certification for learners who want to master Generative AI and Prompt Engineering with hands-on projects, LLM fine-tuning, and real-world deployment skills.",
  fullDescription:
    "This 6-month Advanced Certification program is designed for learners who want a structured, employer-recognized credential in Generative AI and Prompt Engineering. You will cover advanced prompting frameworks, LLM architecture, fine-tuning, RAG pipelines, agentic systems, and production-grade deployment — all backed by a portfolio of real-world projects.",
  instructor: {
    name: "Miss. Shagun",
    title: "Lead Instructor – Generative AI & Prompt Engineering",
    bio: "Master in AI | Expert in LLMs, Prompt Engineering, and Enterprise GenAI",
    image: "/shagun.png",
    credentials: ["Master in AI", "15+ Years Experience", "Published AI Researcher"],
  },
  topics: [
    "Prompt Engineering Mastery",
    "LLM Architectures",
    "Fine-tuning & RLHF",
    "RAG Systems",
    "AI Agents",
    "Production Deployment",
  ],
  whatYouWillLearn: [
    "Advanced and automated prompt engineering techniques",
    "Deep understanding of LLM architectures (GPT, LLaMA, Mistral)",
    "Fine-tuning models with LoRA and QLoRA",
    "Building RAG pipelines for accurate, grounded AI",
    "Designing and deploying autonomous AI agents",
    "Deploying GenAI apps to production (vLLM, FastAPI, Docker)",
    "Building a job-ready GenAI portfolio",
  ],
  modulesByMonth: [
    {
      month: 1,
      title: "Prompt Engineering Mastery",
      topics: [
        "Core & Advanced Prompting Techniques",
        "Chain-of-Thought, Tree-of-Thoughts",
        "ReAct & Tool-Augmented Prompting",
        "Automatic Prompt Optimization",
      ],
      hours: 55,
    },
    {
      month: 2,
      title: "LLM Architecture & Internals",
      topics: [
        "Transformer Deep Dive",
        "GPT, LLaMA, Mistral, Gemma Families",
        "Tokenization, Embeddings & Inference",
        "Scaling Laws & Efficiency",
      ],
      hours: 60,
    },
    {
      month: 3,
      title: "Fine-tuning & Alignment",
      topics: [
        "Supervised Fine-tuning (SFT)",
        "LoRA & QLoRA",
        "RLHF & DPO Basics",
        "Instruction Tuning & Evaluation",
      ],
      hours: 65,
    },
    {
      month: 4,
      title: "RAG & Knowledge Systems",
      topics: [
        "Vector Databases (Pinecone, Chroma, Weaviate)",
        "Retrieval-Augmented Generation Pipelines",
        "Hybrid Search & Re-ranking",
        "Document QA & Knowledge Bases",
      ],
      hours: 60,
    },
    {
      month: 5,
      title: "AI Agents & Autonomous Systems",
      topics: [
        "Agent Architectures & Frameworks",
        "LangChain & LlamaIndex",
        "Tool Use & Function Calling",
        "Multi-Agent Workflows",
      ],
      hours: 65,
    },
    {
      month: 6,
      title: "Deployment, Portfolio & Career",
      topics: [
        "Production Deployment (vLLM, FastAPI, Docker)",
        "Monitoring & Evaluation in Production",
        "Capstone Project",
        "Portfolio Building & Interview Prep",
      ],
      hours: 70,
    },
  ],
  requirements: [
    "Basic Python knowledge",
    "Familiarity with AI/ML concepts",
    "Laptop with 8GB+ RAM",
    "10–12 hours/week commitment",
  ],
  targetAudience: [
    "Learners who completed AI Literacy or a beginner AI course",
    "Professionals seeking an industry certification in GenAI",
    "Developers and analysts adding GenAI to their skillset",
    "Career switchers targeting Prompt Engineer or GenAI Developer roles",
  ],
  includes: [
    "150+ hours of content",
    "30+ hands-on projects",
    "GPU access",
    "Lifetime access",
    "Industry-recognized certification",
    "Job assistance",
    "Professional portfolio",
  ],
  reviews: [
    {
      name: "Neha Kapoor",
      rating: 5,
      comment:
        "The certification gave me the structured depth I needed. I landed a GenAI role within 2 months of completing it.",
      date: "2025-12-10",
    },
  ],
}
];

// ensure every course has a slug property so that URLs can use
// human-readable names instead of numeric ids.  This runs once when the
// module is imported.
courses.forEach((c) => {
  if (!c.slug) {
    c.slug = slugify(c.title);
  }
});

export function getCourseBySlug(slug) {
  if (!slug) return undefined;
  return courses.find((course) => course.slug === slug);
}

export function getCourseById(idOrSlug) {
  // try numeric lookup first
  const numId = parseInt(idOrSlug, 10);
  if (!isNaN(numId)) {
    const byId = courses.find(
      (course) => course.id === numId || String(course.id) === String(idOrSlug)
    );
    if (byId) return byId;
  }
  // fallback: if a string was provided, treat it as a slug
  if (typeof idOrSlug === "string") {
    return getCourseBySlug(idOrSlug);
  }
  return undefined;
}
