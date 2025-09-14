# MediCode Bridge - Healthcare IT Platform

A modern healthcare IT platform that bridges traditional AYUSH medicine with global healthcare standards, featuring NAMASTE terminology integration with WHO ICD-11 Traditional Medicine Module 2.

## Features

- **Disease Search System**: Real-time search for diseases with dual coding (NAMASTE + ICD-11 TM2)
- **Responsive Design**: Professional healthcare-focused design with glassmorphism effects
- **AI Chatbot**: Interactive assistant for code mappings and queries
- **API Documentation**: Comprehensive REST API documentation
- **Multi-page Navigation**: Landing, Features, API Docs, Use Cases, and Contact pages

## Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with glassmorphism effects and cyan/blue theme
- **Typography**: Inter font family for modern, professional appearance

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd medicode-bridge
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**:
   ```bash
   python app.py
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
medicode-bridge/
├── app.py                 # Flask backend application
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── css/
│   │   └── styles.css    # Main stylesheet
│   └── js/
│       └── app.js        # Frontend JavaScript
└── README.md             # This file
```

## API Endpoints

### Search Diseases
- **Endpoint**: `GET /api/search?q={query}`
- **Description**: Search for diseases and get NAMASTE and ICD-11 codes
- **Response**: JSON with disease information

### Chatbot
- **Endpoint**: `GET /api/chatbot?message={message}`
- **Description**: Get responses from the AI assistant
- **Response**: JSON with chatbot response

## Features Details

### Disease Search
- Real-time search functionality
- Displays both NAMASTE (AYUSH) and ICD-11 TM2 codes
- Error handling for invalid searches
- Responsive results display

### Navigation
- Single-page application with dynamic content loading
- Mobile-responsive navigation with hamburger menu
- Smooth transitions between pages
- Keyboard shortcuts (Ctrl/Cmd + 1-5) for quick navigation

### Chatbot Widget
- Fixed position chatbot in bottom-right corner
- Real-time messaging interface
- Context-aware responses about medical codes
- Easy toggle open/close functionality

### Contact Form
- Functional contact form with validation
- Success/error message handling
- Form reset after submission
- Professional styling with glassmorphism effects

## Styling Features

- **Glassmorphism Effects**: Backdrop blur and transparency throughout
- **Cyan/Blue Color Scheme**: Professional healthcare-oriented colors
- **Responsive Design**: Mobile-first approach with responsive grids
- **Smooth Animations**: Hover effects and transitions
- **Modern Typography**: Inter font family for readability

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- Built with vanilla JavaScript for better performance and no framework dependencies
- CSS uses modern features like backdrop-filter and CSS Grid
- Flask backend provides simple REST API endpoints
- Modular CSS and JavaScript for maintainability

## Future Enhancements

- Database integration for persistent storage
- User authentication and authorization
- Extended disease database
- Advanced search filters
- Export functionality for search results
- PWA features with service worker

## License

This project is for demonstration purposes. Please ensure compliance with healthcare data regulations when implementing in production environments.