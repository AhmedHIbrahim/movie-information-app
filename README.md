# Movie Information App

This is a React application built with TypeScript that provides information about movies.

## Features

- Search for movies
- View movie details
- Responsive design

## Technologies Used

- React
- TypeScript
- Redux
- Tailwind

## App Preview
![image](https://github.com/user-attachments/assets/62b4c088-05ab-422b-802b-2f898ef93371)



## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ahmedhibrahim/movie-information-app.git
    cd movie-information-app
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
### API Key Setup

This application uses the [OMDb API](http://www.omdbapi.com/) to fetch movie data. You will need to obtain an API key from OMDb to use the app.

1. Go to the [OMDb API website](http://www.omdbapi.com/apikey.aspx) and sign up to get your free API key.

2. Create a `.env` file in the root of the project and add your API key:
    ```plaintext
    REACT_APP_OMDB_API_KEY=your_api_key_here
    ```


### Running the App

1. Start the development server:
    ```bash
    npm start
    # or
    yarn start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

