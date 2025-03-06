# Medicator - Medication Tracking Application

## Overview

Medicator is an Angular-based web application designed to help users track their medications. The application allows users to:

- View a list of medications with detailed information
- Search for specific medications
- Add new medications with customizable dosage, frequency, and schedule
- Store medication data persistently using browser local storage

## Features

### Medication Management
- **List View**: Display all medications in a searchable, filterable table
- **Add Medication**: Form with validation for adding new medications
- **Medication Details**: Track medication name, dosage, units, days of the week, and specific times

### User Experience
- **Responsive Design**: Works on desktop and mobile devices
- **Search Functionality**: Quickly find medications by name
- **Modern UI**: Clean interface using ng-zorro-antd components and TailwindCSS
- **Offline Capability**: Works without internet connection after initial load

## Technology Stack

- **Framework**: Angular 19
- **UI Components**: ng-zorro-antd
- **Styling**: SCSS with TailwindCSS
- **State Management**: Angular Signals
- **Data Storage**: Local Storage
- **Build Tools**: Angular CLI

## Project Structure

```
src/
├── app/
│   ├── directives/        # Custom directives
│   ├── enums/             # Type enumerations
│   ├── features/          # Feature components
│   │   ├── add-medication-modal/
│   │   └── medication-list/
│   ├── models/            # Data models
│   ├── pipes/             # Custom pipes
│   └── services/          # Application services
├── assets/                # Static assets and mock data
└── styles/                # Global styles
```

## Getting Started

### Prerequisites

- Node.js (version 16.x or higher)
- npm (version 8.x or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/medicator.git
   cd medicator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Development

### Development Server

Run `ng serve` for a development server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Potential Improvements

- Add medication reminder functionality
- Implement user authentication for personalized medication lists
- Add photo upload for medication identification
- Integrate with a backend service for data synchronization across devices
- Create a mobile application using Capacitor or Cordova
- Implement a calendar view for medication schedules
- Add reporting/statistics features to track medication adherence

## License

This project is licensed under the MIT License - see the LICENSE file for details.
