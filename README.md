# AI PDF Form Extractor

## Overview

AI PDF Form Extractor is a Next.js application that extracts form fields from PDF documents and generates a dynamic, editable form interface. Users can interact with the extracted fields while the application highlights the corresponding location in the PDF and automatically scrolls to the selected field.

The application is designed to simplify reviewing and editing data extracted from PDF forms by maintaining synchronization between the document view and the generated form. It also provides a responsive experience across mobile, tablet, and desktop devices.
<img width="1870" height="902" alt="image" src="https://github.com/user-attachments/assets/d21d2821-df0a-4be0-acc3-aa5143b4caed" />
<img width="1887" height="815" alt="image" src="https://github.com/user-attachments/assets/6d088986-606f-421c-bd8e-2eac80296a23" />


## Features

* PDF document rendering using React PDF
* Dynamic form generation based on extracted field metadata
* Field-level synchronization between form inputs and PDF document
* Highlight corresponding PDF sections when a form field is selected
* Automatic scrolling to the highlighted field in the PDF
* Support for different field types including text inputs and checkboxes
* Responsive two-panel layout optimized for mobile, tablet, and desktop devices
* Loading state handling during document extraction
* Error handling for failed extraction requests
* Form state management using React Context API and Reducer
* Optimized rendering and improved user experience using local storage caching
* Zod-based schema validation for AI-generated JSON responses

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### PDF Processing

* React PDF
* PDF.js

### State Management

* React Context API
* useReducer

### AI Integration

* Gemini 3.5 Flash for PDF field extraction
  
### Validation
Zod
## Application Flow

```
PDF Document
     |
     ↓
AI Extraction API
     |
     ↓
Extracted Field JSON
     |
     ↓
Reducer Updates State
     |
     ↓
Dynamic Form + PDF Highlight Synchronization
```

## Project Structure

```
src
├── app
│   ├── api
│   │   └── extract
│   └── page.tsx
│
├── components
│   ├── PdfViewer.tsx
│   ├── DynamicForm.tsx
│   └── Layout.tsx
│
├── context
│   └── FormContext.tsx
│
├── utils
│   └── groupFields.ts
│
└── data
    └── mockFields.ts
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd ai-pdf-form-extractor
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the root directory and add required environment variables:

```env
GEMINI_API_KEY=your_api_key
```

Run the development server:

```bash
npm run dev
```

Open the application:

```
http://localhost:3000
```

## Implementation Highlights

### Dynamic Form Generation

The form fields are generated dynamically based on extracted field metadata instead of using hardcoded inputs. This allows the application to support different PDF form structures.

### PDF Field Highlighting

Each extracted field contains page information and bounding box coordinates. When a user focuses on a form field:

* The corresponding PDF page is identified
* The field location is calculated using bounding box coordinates
* A highlight overlay is rendered on the PDF
* The document automatically scrolls to the highlighted section

### Responsive Layout

The interface is designed to adapt smoothly across mobile, tablet, and desktop devices.

* On mobile devices, the layout stacks vertically for easier scrolling and interaction
* On tablet devices, the panels adjust to provide a balanced viewing experience
* On desktop devices, the two-panel layout displays the PDF viewer and form side by side for efficient workflow
### Validation

* Zod is used to validate AI-generated JSON responses before storing them in application state.
* Invalid responses are handled gracefully to prevent rendering errors.
* Type-safe schema validation improves application reliability and data consistency.
### Performance Optimization

* Local storage caching is used to reduce unnecessary data processing and improve user experience.
* State updates are optimized using Context API with Reducer pattern.
* Dynamic rendering prevents unnecessary hardcoded form structures.

## Future Improvements

* Support multiple PDF uploads
* Export completed forms
* Improve AI extraction confidence handling
* Add more field types and validation rules

## License

This project is created for demonstration and evaluation purposes.
