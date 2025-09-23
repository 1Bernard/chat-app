# Full-Stack Chat Application

A real-time chat application built with Next.js (frontend) and Ruby on Rails (backend). The application allows users to create conversations, send messages, and receive AI-generated responses.

## Features

* Create and delete conversations
* Send messages in real-time
* AI bot responses with a 2-second delay
* Clean and responsive UI built with Material-UI and Tailwind CSS
* Dockerized for easy deployment

## Technologies

### Frontend

* Next.js 15.5.3
* TypeScript
* Material-UI (MUI)
* Tailwind CSS
* Axios for API calls
* SWR for data fetching

### Backend

* Ruby on Rails 8.0.2.1
* PostgreSQL (via Supabase or local Postgres)
* Fast JSON API for serialization
* RSpec for testing
* RSwag for API documentation

## Project Structure

```
chat-app/
├── backend/   # Rails API application
├── frontend/  # Next.js application
├── docker-compose.yml
├── .env       # Environment variables (not committed)
├── .env.example
└── README.md
```

## Setup and Running

### Prerequisites

* Docker and Docker Compose
* Supabase account (if using remote Postgres)
* Or a local PostgreSQL installation (if testing locally)

### Environment Variables

1. Copy the example file:

   ```bash
   cp .env.example .env
   ```

2. Choose one of the two database setups inside `.env`:

   * **Supabase**: Uncomment and provide your Supabase credentials.
   * **Local Postgres**: Keep the default values (`db`, `postgres`, `password`) if you are running with Docker.

### Using Docker (Recommended)

1. Clone the repository:

   ```bash
   git clone https://github.com/1Bernard/chat-app.git
   cd chat-app
   ```

2. Start the application:

   ```bash
   docker-compose up --build
   ```

3. Access the application:

   * Frontend: [http://localhost:3001](http://localhost:3001)
   * Backend API: [http://localhost:3000](http://localhost:3000)
   * API Documentation: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Local Development (Without Docker)

#### Backend

```bash
cd backend
bundle install
rails db:create db:migrate
rails server -p 3000
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:3001](http://localhost:3001) in your browser.

## API Documentation

The API documentation is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) when the Rails server is running. It is generated using RSwag and OpenAPI.

## Testing

#### Backend

```bash
cd backend
bundle exec rspec
```

#### Frontend

```bash
cd frontend
npm test
```

## Deployment

For production, ensure `.env` has the correct Supabase credentials (or local DB settings) and run:

```bash
docker-compose up -d --build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
