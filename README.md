# Film Stats Dashboard

Film Stats Dashboard is a React application built with TypeScript and Vite. It visualizes movie data fetched from TheMovieDB API, featuring interactive charts and data tables.

## Features

- Interactive line and bar charts using @nivo.
- Data table displaying film details (title, release date, vote average, and original language).
- Dynamic year filtering for personalized data views.
- Responsive user interface styled with Tailwind CSS.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the project root with:
   ```
   VITE_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

- `src/`: Contains React components, assets, and utility functions.
- `vite.config.ts`: Vite configuration.
- `tsconfig.app.json`: TypeScript configuration.

## Usage

- Open your browser and navigate to `http://localhost:5000`.
- Use the provided form to filter data by year.
- View the interactive charts and table to explore film statistics.

## Deployment

To build the production bundle:

```
npm run build
```

Then, deploy the generated files from the `dist` folder using your preferred hosting service.

## License

[MIT](LICENSE)
