# Geometry Review System

A comprehensive geometry testing system built with Next.js, TypeScript, and Supabase. This system provides both general geometry testing capabilities and question-based testing with database integration.

## Features

### 🎯 General Geometry Testing
- **Free-form geometry field** for testing geometric constructions
- **Interactive tools**: Points, segments, lines, circles, and eraser
- **Physical tools**: Draggable ruler, triangle, and protractor
- **Export/Import**: Save and load constructions as JSON files
- **Construction history**: Track multiple construction attempts
- **Comprehensive help system** with tool explanations

### 📚 Question-Based Testing
- **Database-driven questions** from Supabase
- **Question-agnostic tester** that works with any question structure
- **Session tracking** with time measurement
- **Attempt scoring** and feedback system
- **User management** with anonymous and registered users

### 🗄️ Database Integration
- **Supabase backend** for questions, attempts, and sessions
- **Sample question seeding** for testing
- **Admin interface** for database management
- **Real-time data synchronization**

## System Architecture

### Components

1. **GeneralGeometryTester** (`/app/components/GeneralGeometryTester.tsx`)
   - Free-form geometry testing field
   - Enhanced with export/import functionality
   - Construction history tracking
   - Comprehensive help system

2. **QuestionBasedTester** (`/app/components/QuestionBasedTester.tsx`)
   - Question-agnostic testing component
   - Supabase integration for questions and attempts
   - Session and time tracking
   - Dynamic validation based on question constraints

3. **GeometryConstructionTester** (`/app/components/GeometryConstructionTester.tsx`)
   - Original specific question implementation (Question 9)
   - Hardcoded validation logic
   - Maintained for backward compatibility

### Pages

1. **Home Page** (`/app/page.tsx`)
   - Main navigation hub
   - Links to all testing modes
   - Admin access

2. **Questions List** (`/app/questions/page.tsx`)
   - Browse available questions from database
   - Question metadata display
   - Difficulty and tag filtering

3. **Individual Question** (`/app/questions/[id]/page.tsx`)
   - Dynamic route for specific questions
   - Question-based tester integration

4. **Admin Panel** (`/app/admin/page.tsx`)
   - Database management interface
   - Sample question seeding
   - Question list and statistics

### Database Schema

The system uses the following Supabase tables:

#### `gq_questions`
- `id` (uuid, primary key)
- `code` (text, unique) - Question identifier
- `title` (text) - Question title
- `prompt_md` (text) - Markdown question prompt
- `max_score` (integer, default 3) - Maximum possible score
- `givens` (jsonb) - Given geometric objects
- `constraints` (jsonb) - Validation constraints
- `difficulty` (int, 1-5) - Question difficulty
- `tags` (text[]) - Question tags
- `created_at/updated_at` (timestamptz)

#### `gq_attempts`
- `id` (uuid, primary key)
- `question_id` (uuid) - References gq_questions
- `session_id` (text) - Session identifier
- `state` (jsonb) - Construction state
- `score` (numeric) - Achieved score
- `passed` (boolean) - Whether attempt passed
- `feedback` (jsonb) - Validation feedback
- `student_id` (text) - Student identifier
- `is_complete` (boolean, default false)
- `time_spent` (int, default 0) - Time in seconds
- `created_at/updated_at` (timestamptz)

#### `sessions`
- `id` (uuid, primary key)
- `user_id` (uuid) - References users
- `question_id` (uuid) - References gq_questions
- `session_data` (jsonb) - Session metadata
- `is_active` (boolean, default true)
- `created_at/updated_at` (timestamptz)

#### `users`
- `id` (uuid, primary key)
- `email` (text, unique)
- `name` (text)
- `role` (text, default 'student')
- `created_at/updated_at` (timestamptz)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd geometry_review
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   - Create the tables according to the schema above
   - Enable Row Level Security (RLS) on all tables
   - Set up appropriate policies for your use case

5. **Run the development server**
```bash
npm run dev
   ```

6. **Seed sample questions**
   - Navigate to `/admin`
   - Click "Přidat ukázkové úlohy" to add sample questions

## Usage

### General Testing
1. Navigate to "Obecné testování" from the home page
2. Use the toolbar to select tools (point, segment, line, circle, eraser)
3. Toggle physical tools (ruler, triangle, protractor) as needed
4. Save constructions and export them as JSON files
5. Import previously saved constructions

### Question-Based Testing
1. Navigate to "Databáze úloh" from the home page
2. Select a question from the list
3. Read the question prompt and requirements
4. Use the same tools as in general testing
5. Click "Uložit" to submit your attempt
6. View your score and feedback

### Admin Functions
1. Navigate to "Správa" from the home page
2. Add sample questions to the database
3. View all questions and their metadata
4. Monitor question statistics

## Question Format

Questions are stored in the database with the following structure:

### Givens (JSON)
```json
{
  "points": {
    "A": { "x": 2, "y": 6 },
    "B": { "x": 6, "y": 6 }
  },
  "lines": {
    "p": { "p1": { "x": 0, "y": 4 }, "p2": { "x": 8, "y": 4 } }
  },
  "circles": {
    "c": { "center": "A", "radius": 3 }
  }
}
```

### Constraints (JSON)
```json
{
  "requiredPoints": 2,
  "requiredSegments": 3,
  "requiredLines": 1,
  "requiredCircles": 1,
  "minScore": 2
}
```

## Development

### Adding New Questions

1. **Via Admin Interface**
   - Use the admin panel to add questions through the UI

2. **Via Database**
   - Insert directly into the `gq_questions` table
   - Follow the schema structure for givens and constraints

3. **Programmatically**
   - Use the `seedSampleQuestions()` function in `lib/supabase-helpers.ts`
   - Add new questions to the `sampleQuestions` array

### Customizing Validation

The validation logic in `QuestionBasedTester.tsx` can be extended to handle more complex validation rules. The current implementation provides basic validation based on:

- Required number of points, segments, lines, circles
- Minimum score thresholds
- Custom validation functions can be added

### Extending Tools

New geometric tools can be added by:

1. Adding new tool types to the toolbar
2. Implementing tool logic in the `handleClick` function
3. Adding corresponding UI elements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please:
1. Check the documentation above
2. Review the code comments
3. Open an issue in the repository
4. Contact the development team

## Future Enhancements

- [ ] Advanced validation algorithms
- [ ] Collaborative construction sharing
- [ ] Real-time multiplayer sessions
- [ ] Advanced geometric theorem checking
- [ ] Mobile app version
- [ ] Integration with learning management systems