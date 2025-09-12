const departments = [
  {
    name: "CSE",
    fullName: "Computer Science Engineering",
    description: "Study materials for programming, algorithms, software engineering, and more",
    count: 89,
    available: true,
    color: "blue"
  },
  {
    name: "ECE",
    fullName: "Electronics & Communication Engineering",
    description: "Circuit design, communication systems, and digital electronics",
    count: 67,
    available: false,
    color: "purple"
  },
  {
    name: "ME",
    fullName: "Mechanical Engineering",
    description: "Thermodynamics, mechanics, manufacturing, and design engineering",
    count: 43,
    available: false,
    color: "green"
  },
  {
    name: "CE",
    fullName: "Civil Engineering",
    description: "Structural engineering, construction management, and infrastructure",
    count: 32,
    available: false,
    color: "orange"
  },
  {
    name: "EE",
    fullName: "Electrical Engineering",
    description: "Power systems, control systems, and electrical machines",
    count: 45,
    available: false,
    color: "red"
  }
];

const CSE = [
  {
    semester: 1,
    available: true,
    subjects: [
      { name: "Physics‑I", available: true, pdfLink: "https://example.com/physics1.pdf" },
      { name: "Mathematics – IA", available: true, pdfLink: "https://example.com/math1a.pdf" },
      { name: "Basic Electrical Engineering", available: true, pdfLink: "https://example.com/bee.pdf" }
    ]
  },
  {
    semester: 2,
    available: false,
    subjects: [
      { name: "Chemistry‑I", available: false, pdfLink: "#" },
      { name: "Mathematics – II", available: false, pdfLink: "#" },
      { name: "Programming for Problem Solving", available: false, pdfLink: "#" }
    ]
  },
  {
    semester: 3,
    available: true,
    subjects: [
      { name: "Analog and Digital Electronics", available: true, pdfLink: "https://example.com/ade.pdf" },
      { name: "Data Structures & Algorithms", available: true, pdfLink: "https://example.com/dsa.pdf" },
      { name: "Computer Organisation", available: true, pdfLink: "https://example.com/co.pdf" },
      { name: "Mathematics‑III (Differential Calculus)", available: true, pdfLink: "https://example.com/math3.pdf" },
      { name: "Economics for Engineers (Humanities‑II)", available: true, pdfLink: "https://example.com/economics.pdf" }
    ]
  },
  {
    semester: 4,
    available: true,
    subjects: [
      { name: "Discrete Mathematics", available: false, pdfLink: "#" },
      { name: "Computer Architecture", available: true, pdfLink: "#" },
      { name: "Formal Language & Automata Theory", available: false, pdfLink: "#" },
      { name: "Design & Analysis of Algorithms", available: true, pdfLink: "#" }
    ]
  },
  {
    semester: 5,
    available: true,
    subjects: [
      { name: "Software Engineering", available: true, pdfLink: "https://example.com/se.pdf" },
      { name: "Compiler Design", available: true, pdfLink: "https://example.com/compiler.pdf" },
      { name: "Operating Systems", available: true, pdfLink: "https://example.com/os.pdf" },
      { name: "Object Oriented Programming", available: true, pdfLink: "https://example.com/oop.pdf" },
      { name: "Artificial Intelligence", available: true, pdfLink: "https://example.com/ai.pdf" },
      { name: "Introduction to Industrial Management (Humanities III)", available: true, pdfLink: "https://example.com/iim.pdf" }
    ]
  },
  {
    semester: 6,
    available: true,
    subjects: [
      { name: "Database Management Systems", available: true, pdfLink: "https://example.com/dbms.pdf" },
      { name: "Computer Networks", available: true, pdfLink: "https://example.com/cn.pdf" },
      { name: "Image Processing", available: true, pdfLink: "https://example.com/ip.pdf" },
      { name: "Data Warehousing and Data Mining", available: true, pdfLink: "https://example.com/dwdm.pdf" },
      { name: "Numerical Methods", available: true, pdfLink: "https://example.com/nm.pdf" },
      { name: "Research Methodology", available: true, pdfLink: "https://example.com/rm.pdf" }
    ]
  },
  {
    semester: 7,
    available: true,
    subjects: [
      { name: "Machine Learning", available: true, pdfLink: "https://example.com/ml.pdf" },
      { name: "Multi-Media System", available: true, pdfLink: "https://example.com/mms.pdf" },
      { name: "Cyber Security", available: true, pdfLink: "https://example.com/cybersecurity.pdf" },
      { name: "Project Management", available: true, pdfLink: "https://example.com/projectmgmt.pdf" }
    ]
  },
  {
    semester: 8,
    available: false,
    subjects: [
      { name: "Capstone Project", available: false, pdfLink: "#" },
      { name: "Open Elective II", available: false, pdfLink: "#" },
      { name: "Professional Elective", available: false, pdfLink: "#" },
      { name: "Dissertation / Internship", available: false, pdfLink: "#" },
      { name: "Value & Ethics / HSMC subject", available: false, pdfLink: "#" }
    ]
  }
];

const pyqCSE = [
  {
    semester: 1,
    available: true,
    pyqs: [
      {
        year: 2023,
        available: false,
        subjects: [
          { name: "Physics-I", available: false, fileId: "physics1_id" },
          { name: "Mathematics – IA", available: false, fileId: "math1a_id" },
          { name: "Basic Electrical Engineering", available: false, fileId: "bee_id" }
        ]
      },
      {
        year: 2024,
        available: true,
        subjects: [
          { name: "Physics-I", available: true, fileId: "physics1_id" },
          { name: "Mathematics – IA", available: false, fileId: "math1a_id" },
          { name: "Basic Electrical Engineering", available: true, fileId: "bee_id" }
        ]
      },
      {
        year: 2025,
        available: true,
        subjects: [
          { name: "Physics-I", available: true, fileId: "physics1_id" },
          { name: "Mathematics – IA", available: true, fileId: "math1a_id" },
          { name: "Basic Electrical Engineering", available: true, fileId: "bee_id" }
        ]
      }
    ]
  },
  {
    semester: 2,
    available: false,
    pyqs: [
      {
        year: 2023,
        available: false,
        subjects: [
          { name: "Chemistry-I", available: false, fileId: "" },
          { name: "Mathematics – II", available: false, fileId: "" },
          { name: "Programming for Problem Solving", available: false, fileId: "" }
        ]
      }
    ]
  },
  {
    semester: 3,
    available: true,
    pyqs: [
      {
        year: 2023,
        available: true,
        subjects: [
          { name: "Analog and Digital Electronics", available: true, fileId: "ade_id" },
          { name: "Data Structures & Algorithms", available: true, fileId: "dsa_id" },
          { name: "Computer Organisation", available: true, fileId: "co_id" },
          { name: "Mathematics-III (Differential Calculus)", available: true, fileId: "math3_id" },
          { name: "Economics for Engineers (Humanities-II)", available: true, fileId: "economics_id" }
        ]
      }
    ]
  },
  {
    semester: 4,
    available: true,
    pyqs: [
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
    pyqs: [
      {
        year: 2023,
        available: true,
        subjects: [
          { name: "Software Engineering", available: true, fileId: "se_id" },
          { name: "Compiler Design", available: true, fileId: "compiler_id" },
          { name: "Operating Systems", available: true, fileId: "os_id" },
          { name: "Object Oriented Programming", available: true, fileId: "oop_id" },
          { name: "Artificial Intelligence", available: true, fileId: "ai_id" },
          { name: "Introduction to Industrial Management (Humanities III)", available: true, fileId: "iim_id" }
        ]
      }
    ]
  },
  {
    semester: 6,
    available: true,
    pyqs: [
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
    pyqs: [
      {
        year: 2024,
        available: true,
        subjects: [
          { name: "Machine Learning", available: true, fileId: "19CNsumlV9K1KN7AwFce3t6h2lgKpbnOT" },
          { name: "Multi-Media System", available: true, fileId: "1Zbw3NymTPGgwa5ceEH51RgosF1zGFfVn" },
          { name: "Cyber Security", available: true, fileId: "1A-5_5N438XjBKgKeBXirYp4yZ2kwPPei" },
          { name: "Project Management & Entrepreneurship", available: true, fileId: "1TOJV_-TjclL2J4I6gCRjNLi2PNNvnqKj" }
        ]
      }
    ]
  },
  {
    semester: 8,
    available: false,
    pyqs: [
      {
        year: 2023,
        available: false,
        subjects: [
          { name: "Capstone Project", available: false, fileId: "" },
          { name: "Open Elective II", available: false, fileId: "" },
          { name: "Professional Elective", available: false, fileId: "" },
          { name: "Dissertation / Internship", available: false, fileId: "" },
          { name: "Value & Ethics / HSMC subject", available: false, fileId: "" }
        ]
      }
    ]
  }
];

export { CSE, departments, pyqCSE };

