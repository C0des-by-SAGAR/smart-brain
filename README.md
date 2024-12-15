# Smart Brain

Smart Brain is a web application that detects faces in images using the Clarifai API. Users can input the URL of an image, and the application will identify and highlight any faces present. 

## Features

- **Face Detection**: Input an image URL to detect faces within the image.
- **User Ranking**: Users' ranks are updated based on the number of images they process.

## Technologies Used

### Front-End

- HTML5
- CSS3
- React.js

### Back-End

- Node.js
- Express.js
- PostgreSQL

### NPM Packages

- Create-React-App
- Tachyons
- react-tilt
- particles.js
- Bcrypt
- PostgreSQL
- Knex
- Body Parser
- Cors
- Express

## Installation

To set up the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/C0des-by-SAGAR/smart-brain.git
   cd smart-brain
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Application**:

   ```bash
   npm start
   ```

   The application will run in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

1. **Enter Image URL**: Paste the URL of an image containing a face into the input field.
2. **Detect Face**: Click the 'Detect' button to process the image.
3. **View Results**: The application will display the image with a bounding box around the detected face(s).

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes.
4. Commit the changes: `git commit -m 'Add feature'`.
5. Push to the branch: `git push origin feature-name`.
6. Submit a pull request.
