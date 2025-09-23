# Full-Stack Chat Application

A real-time chat application built with Next.js (frontend) and Ruby on Rails (backend). The application allows users to create conversations, send messages, and receive AI-generated responses.

<img width="1915" height="943" alt="Screenshot 2025-09-23 135810" src="https://github.com/user-attachments/assets/5aa2c17d-4ae5-4a08-ab1a-5688b445ef7c" />
<img width="1917" height="938" alt="Screenshot 2025-09-23 135837" src="https://github.com/user-attachments/assets/de05c7c2-a322-4c38-8162-109ae28a918b" />
<img width="381" height="828" alt="Screenshot 2025-09-23 135931" src="https://github.com/user-attachments/assets/dd7b87a2-3f42-4ac7-8aa9-491ad418cf8e" />
<img width="379" height="828" alt="Screenshot 2025-09-23 140031" src="https://github.com/user-attachments/assets/277a6d46-2e71-46ef-9894-860b3d9fa5ea" />
<img width="387" height="828" alt="Screenshot 2025-09-23 140056" src="https://github.com/user-attachments/assets/f628030e-4eca-41e5-b923-3af1c5c17e2d" />
<img width="1673" height="936" alt="Screenshot 2025-09-23 164714" src="https://github.com/user-attachments/assets/43eccb49-f1d8-4f31-a71e-1097e5f2d782" />

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

1. Clone the repository and enter the project folder:

   ```bash
   git clone https://github.com/1Bernard/chat-app.git
   cd chat-app
   ```

2. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

3. Choose one of the two database setups inside `.env`:

   * **Supabase**: Uncomment and provide your Supabase credentials.
   * **Local Postgres**: Keep the default values (`db`, `postgres`, `password`) if you are running with Docker.

### Using Docker (Recommended)

1. Start the application:

   ```bash
   docker-compose up --build
   ```

2. Access the application:

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
