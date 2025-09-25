export const departments = [
  {
    name: "CSE",
    fullName: "Computer Science Engineering",
    description: "Study materials for programming, algorithms, software engineering, and more.",
    count: 89,
    available: true,
    color: "blue"
  },
  {
    name: "ECE",
    fullName: "Electronics & Communication Engineering",
    description: "Circuit design, communication systems, and digital electronics.",
    count: 67,
    available: false,
    color: "purple"
  },
  {
    name: "ME",
    fullName: "Mechanical Engineering",
    description: "Thermodynamics, mechanics, manufacturing, and design engineering.",
    count: 43,
    available: false,
    color: "green"
  },
  {
    name: "CE",
    fullName: "Civil Engineering",
    description: "Structural engineering, construction management, and infrastructure.",
    count: 32,
    available: false,
    color: "orange"
  },
  {
    name: "EE",
    fullName: "Electrical Engineering",
    description: "Power systems, control systems, and electrical machines.",
    count: 45,
    available: false,
    color: "red"
  }
];

export const CSE_Notes = [
  {
    semester: 1,
    available: true,
    subjects: [
      { name: "Physics-I", available: true, fileId: "" },
      { name: "Mathematics-IA", available: true, fileId: "" },
      { name: "Basic Electrical Engineering", available: true, fileId: "" }
    ]
  },
  {
    semester: 2,
    available: false,
    subjects: [
      { name: "Chemistry-I", available: false, fileId: "" },
      { name: "Mathematics-II", available: false, fileId: "" },
      { name: "Programming for Problem Solving", available: false, fileId: "" }
    ]
  },
  {
    semester: 3,
    available: true,
    subjects: [
      { name: "Analog and Digital Electronics", available: true, fileId: "" },
      { name: "Data Structures & Algorithms", available: true, fileId: "" },
      { name: "Computer Organisation", available: true, fileId: "" },
      { name: "Mathematics-III (Differential Calculus)", available: true, fileId: "" },
      { name: "Economics for Engineers (Humanities-II)", available: true, fileId: "" }
    ]
  },
  {
    semester: 4,
    available: true,
    subjects: [
      { name: "Discrete Mathematics", available: false, fileId: "" },
      { name: "Computer Architecture", available: true, fileId: "" },
      { name: "Formal Language & Automata Theory", available: false, fileId: "" },
      { name: "Design & Analysis of Algorithms", available: true, fileId: "" }
    ]
  },
  {
    semester: 5,
    available: true,
    subjects: [
      { name: "Software Engineering", available: true, fileId: "" },
      { name: "Compiler Design", available: true, fileId: "" },
      { name: "Operating Systems", available: true, fileId: "" },
      { name: "Object Oriented Programming", available: true, fileId: "" },
      { name: "Artificial Intelligence", available: true, fileId: "" },
      { name: "Introduction to Industrial Management (Humanities-III)", available: true, fileId: "" }
    ]
  },
  {
    semester: 6,
    available: true,
    subjects: [
      { name: "Database Management Systems", available: true, fileId: "" },
      { name: "Computer Networks", available: true, fileId: "" },
      { name: "Image Processing", available: true, fileId: "" },
      { name: "Data Warehousing and Data Mining", available: true, fileId: "" },
      { name: "Numerical Methods", available: true, fileId: "" },
      { name: "Research Methodology", available: true, fileId: "" }
    ]
  },
  {
    semester: 7,
    available: true,
    subjects: [
      { name: "Machine Learning", available: true, fileId: "" },
      { name: "Multi-Media System", available: true, fileId: "" },
      { name: "Cyber Security", available: true, fileId: "" },
      { name: "Project Management", available: true, fileId: "" }
    ]
  },
  {
    semester: 8,
    available: false,
    subjects: [
      { name: "Capstone Project", available: false, fileId: "" },
      { name: "Open Elective II", available: false, fileId: "" },
      { name: "Professional Elective", available: false, fileId: "" },
      { name: "Dissertation / Internship", available: false, fileId: "" },
      { name: "Value & Ethics / HSMC Subject", available: false, fileId: "" }
    ]
  }
];

export const CSE_PYQs = [
  {
    semester: 1,
    available: true,
    years: [
      {
        year: 2023,
        available: false,
        subjects: [
          { name: "Physics-I", available: false, fileId: "physics1_id" },
          { name: "Mathematics-IA", available: false, fileId: "math1a_id" },
          { name: "Basic Electrical Engineering", available: false, fileId: "bee_id" }
        ]
      },
      {
        year: 2024,
        available: true,
        subjects: [
          { name: "Physics-I", available: true, fileId: "physics1_id" },
          { name: "Mathematics-IA", available: false, fileId: "math1a_id" },
          { name: "Basic Electrical Engineering", available: true, fileId: "bee_id" }
        ]
      },
      {
        year: 2025,
        available: true,
        subjects: [
          { name: "Physics-I", available: true, fileId: "physics1_id" },
          { name: "Mathematics-IA", available: true, fileId: "math1a_id" },
          { name: "Basic Electrical Engineering", available: true, fileId: "bee_id" }
        ]
      }
    ]
  },
  {
    semester: 2,
    available: false,
    years: [
      {
        year: 2023,
        available: false,
        subjects: [
          { name: "Chemistry-I", available: false, fileId: "" },
          { name: "Mathematics-II", available: false, fileId: "" },
          { name: "Programming for Problem Solving", available: false, fileId: "" }
        ]
      }
    ]
  },
  {
    semester: 3,
    available: true,
    years: [
      {
        year: 2025,
        available: true,
        subjects: [
          { name: "Analog and Digital Electronics", available: true, fileId: "1Ju0kLfioDkpYpF3OeTtit2TbWVyu0HvV" },
          { name: "Data Structures & Algorithms", available: true, fileId: "1o-VZR3eOS2T3c9Zr3e4I-6s9nbSTTzmy" },
          { name: "Computer Organisation", available: true, fileId: "1k7qNIvUUFvS6jtFIUl9X52S8unxei7t_" },
          { name: "Mathematics-III (Differential Calculus)", available: true, fileId: "1yC3uuykUFhs-liDDLePrCXzwH5ij_Uuj" },
          { name: "Economics for Engineers (Humanities-II)", available: true, fileId: "1qUnLUJ0jwAVsD_AFNookd7cw-_xck4PZ" }
        ]
      }
    ]
  },
  {
    semester: 4,
    available: true,
    years: [
      {
        year: 2023,
        available: true,
        subjects: [
          { name: "Discrete Mathematics", available: false, fileId: "" },
          { name: "Computer Architecture", available: true, fileId: "ca_id" },
          { name: "Formal Language & Automata Theory", available: false, fileId: "" },
          { name: "Design & Analysis of Algorithms", available: true, fileId: "daa_id" }
        ]
      }
    ]
  },
  {
    semester: 5,
    available: true,
    years: [
      {
        year: 2023,
        available: true,
        subjects: [
          { name: "Software Engineering", available: true, fileId: "se_id" },
          { name: "Compiler Design", available: true, fileId: "compiler_id" },
          { name: "Operating Systems", available: true, fileId: "os_id" },
          { name: "Object Oriented Programming", available: true, fileId: "oop_id" },
          { name: "Artificial Intelligence", available: true, fileId: "ai_id" },
          { name: "Introduction to Industrial Management (Humanities-III)", available: true, fileId: "iim_id" }
        ]
      }
    ]
  },
  {
    semester: 6,
    available: true,
    years: [
      {
        year: 2023,
        available: true,
        subjects: [
          { name: "Database Management Systems", available: true, fileId: "dbms_id" },
          { name: "Computer Networks", available: true, fileId: "cn_id" },
          { name: "Image Processing", available: true, fileId: "ip_id" },
          { name: "Data Warehousing and Data Mining", available: true, fileId: "dwdm_id" },
          { name: "Numerical Methods", available: true, fileId: "nm_id" },
          { name: "Research Methodology", available: true, fileId: "rm_id" }
        ]
      }
    ]
  },
  {
    semester: 7,
    available: true,
    years: [
      {
        year: 2024,
        available: true,
        subjects: [
          { name: "Machine Learning", available: true, fileId: "19CNsumlV9K1KN7AwFce3t6h2lgKpbnOT" },
          { name: "Multi-Media System", available: true, fileId: "1Zbw3NymTPGgwa5ceEH51RgosF1zGFfVn" },
          { name: "Cyber Security", available: true, fileId: "1A-5_5N438XjBKgKeBXirYp4yZ2kwPPei" },
          { name: "Project Management & Entrepreneurship", available: true, fileId: "1TOJV_-TjclL2J4I6gCRjNLi2PNNvnqKj" }
        ]
      },
      {
        year: 2023,
        available: true,
        subjects: [
          { name: "Machine Learning", available: true, fileId: "148Z0owHjHmvgzNp8r_g10TAQyNXM-YdI" },
          { name: "Multi-Media System", available: true, fileId: "148W5__TvWYoUEBSOqwoRVw6-fENgqrWV" },
          { name: "Cyber Security", available: true, fileId: "1qYUyEXNmu8rtf6Hj7cRTSxRrr8_-pmiR" },
          { name: "Project Management & Entrepreneurship", available: true, fileId: "1pQWelNu_gmvHCRw7LkR5LUdu86je2ty0" }
        ]
      }
    ]
  },
  {
    semester: 8,
    available: false,
    years: [
      {
        year: 2023,
        available: false,
        subjects: [
          { name: "Capstone Project", available: false, fileId: "" },
          { name: "Open Elective II", available: false, fileId: "" },
          { name: "Professional Elective", available: false, fileId: "" },
          { name: "Dissertation / Internship", available: false, fileId: "" },
          { name: "Value & Ethics / HSMC Subject", available: false, fileId: "" }
        ]
      }
    ]
  }
];

export const CSE_Organizers = [
  {
    semester: 1,
    available: true,
    subjects: [
      { name: "Physics-I", available: true, fileId: "" },
      { name: "Mathematics-IA", available: true, fileId: "" },
      { name: "Basic Electrical Engineering", available: true, fileId: "" }
    ]
  },
  {
    semester: 2,
    available: false,
    subjects: [
      { name: "Chemistry-I", available: false, fileId: "" },
      { name: "Mathematics-II", available: false, fileId: "" },
      { name: "Programming for Problem Solving", available: false, fileId: "" }
    ]
  },
  {
    semester: 3,
    available: true,
    subjects: [
      { name: "Analog and Digital Electronics", available: true, fileId: "" },
      { name: "Data Structures & Algorithms", available: true, fileId: "" },
      { name: "Computer Organisation", available: true, fileId: "" },
      { name: "Mathematics-III (Differential Calculus)", available: true, fileId: "" },
      { name: "Economics for Engineers (Humanities-II)", available: true, fileId: "" }
    ]
  },
  {
    semester: 4,
    available: true,
    subjects: [
      { name: "Discrete Mathematics", available: false, fileId: "" },
      { name: "Computer Architecture", available: true, fileId: "" },
      { name: "Formal Language & Automata Theory", available: false, fileId: "" },
      { name: "Design & Analysis of Algorithms", available: true, fileId: "" }
    ]
  },
  {
    semester: 5,
    available: true,
    subjects: [
      { name: "Software Engineering", available: true, fileId: "" },
      { name: "Compiler Design", available: true, fileId: "" },
      { name: "Operating Systems", available: true, fileId: "" },
      { name: "Object Oriented Programming", available: true, fileId: "" },
      { name: "Artificial Intelligence", available: true, fileId: "" },
      { name: "Introduction to Industrial Management (Humanities-III)", available: true, fileId: "" }
    ]
  },
  {
    semester: 6,
    available: true,
    subjects: [
      { name: "Database Management Systems", available: true, fileId: "" },
      { name: "Computer Networks", available: true, fileId: "" },
      { name: "Image Processing", available: true, fileId: "" },
      { name: "Data Warehousing and Data Mining", available: true, fileId: "" },
      { name: "Numerical Methods", available: true, fileId: "" },
      { name: "Research Methodology", available: true, fileId: "" }
    ]
  },
  {
    semester: 7,
    available: true,
    subjects: [
      { name: "Machine Learning", available: true, fileId: "1Zqx_J8-sec-sAlFQaMTWFffyBquzPv8h" },
      { name: "Multi-Media System", available: true, fileId: "d/1s-DO72aCh6QLYZ_riPWKUv-enj42Srhs" },
      { name: "Cyber Security", available: true, fileId: "1_yjVF46dD5CVsqAsNoZHiKVJqIBPVenC" },
      { name: "Project Management", available: true, fileId: "1YVf5XE1kowIXH7eBFTTbIaHe_Fum6ZKk" }
    ]
  },
  {
    semester: 8,
    available: false,
    subjects: [
      { name: "Capstone Project", available: false, fileId: "" },
      { name: "Open Elective II", available: false, fileId: "" },
      { name: "Professional Elective", available: false, fileId: "" },
      { name: "Dissertation / Internship", available: false, fileId: "" },
      { name: "Value & Ethics / HSMC Subject", available: false, fileId: "" }
    ]
  }
];

// Banner Data for Homepage

export const sem7BannerCards = [
  {
    title: "Artificial Intelligence",
    subject: "Advanced concepts, algorithms, and practical applications",
    href: "/btech/cse/7/notes/ai",
    icon: "🤖",
    isNew: true,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Software Engineering",
    subject: "SDLC, project management, and design patterns",
    href: "/btech/cse/7/notes/se",
    icon: "⚙️",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Compiler Design",
    subject: "Lexical analysis, parsing, and code optimization",
    href: "/btech/cse/7/notes/cd",
    icon: "🔧",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Network Security",
    subject: "Cryptography, protocols, and security implementation",
    href: "/btech/cse/7/notes/ns",
    icon: "🔒",
    color: "from-red-500 to-red-600"
  },
  {
    title: "Machine Learning",
    subject: "Algorithms, neural networks, and data analysis",
    href: "/btech/cse/7/notes/ml",
    icon: "🧠",
    isNew: true,
    color: "from-orange-500 to-orange-600"
  }
];

export const placementBannerCards = [
  {
    title: "Data Structures & Algorithms",
    subject: "Essential DSA concepts and coding interview prep",
    href: "/placement/coding/dsa",
    icon: "📊",
    isNew: true,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "System Design",
    subject: "Design scalable systems for tech interviews",
    href: "/placement/interview/system-design",
    icon: "🏗️",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    title: "Aptitude & Reasoning",
    subject: "Quantitative aptitude and logical reasoning",
    href: "/placement/aptitude",
    icon: "🧮",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Mock Interviews",
    subject: "Practice with real interview scenarios",
    href: "/placement/interview/mock",
    icon: "🎤",
    color: "from-purple-500 to-purple-600"
  }
];