# ApnaGrad 📚
*ApnaGrad - Apna Success*

A comprehensive platform for students to access study materials, practice questions, and generate certificates. Built with Next.js and modern web technologies.

## Features ✨

- **📚 Comprehensive Notes**: Access curated notes from top students and professors across all subjects and semesters
- **🎯 Previous Year Questions**: Practice with organized previous year questions to ace your exams with confidence
- **🏆 Digital Certificates**: Generate professional certificates for MAR points, participation, and achievements
- **⚡ Smart Search**: Find exactly what you need with intelligent search across all study materials
- **📱 Mobile Friendly**: Study anywhere, anytime with responsive design optimized for all devices
- **🔄 Regular Updates**: Get the latest syllabus updates and fresh content uploaded by the community

## Tech Stack 🛠️

- **Frontend**: Next.js 15.5.3, React 19.1.0
- **Styling**: Tailwind CSS 4
- **Backend**: Appwrite (Integration in progress)
- **Linting**: ESLint with Next.js configuration

## Getting Started 🚀

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/apnagrad.git
cd apnagrad
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts 📝

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Project Structure 📁

```
src/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── certificate/       # Certificate generation
│   ├── dashboard/         # User dashboard
│   ├── notes/            # Notes by department/semester
│   ├── organizer/        # Study organizer
│   ├── premium/          # Premium features
│   └── pyqs/             # Previous year questions
├── components/           # Reusable React components
├── lib/                 # Utility functions and configurations
└── assets/             # Static assets
```

## Key Pages 🗺️

- **Home (`/`)**: Landing page with features and search
- **Notes (`/notes`)**: Browse notes by department and semester
- **PYQs (`/pyqs`)**: Previous year questions organized by year
- **Dashboard (`/dashboard`)**: User dashboard and profile
- **Certificate (`/certificate`)**: Generate digital certificates
- **Auth (`/auth`)**: Login, register, and password reset

## Components 🧩

- **SearchBar**: Intelligent search functionality
- **NoteCard**: Display individual notes
- **NoteGrid**: Grid layout for notes
- **PDFViewer**: View PDF documents
- **CertificateForm**: Certificate generation form
- **Navbar & Footer**: Navigation and site information

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements 🚧

- Complete Appwrite backend integration
- User authentication and profiles
- File upload and management
- Advanced search and filtering
- Mobile app development
- Collaborative study features

## License 📄

This project is private and not licensed for public use.

## Support 💬

For support and questions, please contact the development team or create an issue in the repository.

---

Made with ❤️ for students by students