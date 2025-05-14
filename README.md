# Jotter-Blog

A full-stack blog application with a Laravel API backend and a React frontend, featuring CRUD functionality for posts, user authentication, and a responsive UI with Tailwind CSS.

## 🚀 Installation

Install my-project with npm

### 1. Clone the Repository

```bash
  https://github.com/that-VeeJay/Jotter-blog.git
  cd jotter-blog
```

### 2. Backend Setup (Laravel API)

#### Navigate to the api directory
```bash
  cd api
```

#### Install dependencies
```bash
  composer install
```

#### Environment setup
```bash
  cp .env.example .env
  php artisan key:generate
```

#### Update the .env file with your database credentials:
```bash
  DB_CONNECTION=your_connection
  DB_HOST=your_host
  DB_PORT=your_port
  DB_DATABASE=your_database
  DB_USERNAME=your_root
  DB_PASSWORD=
```

#### Run database migrations
```bash
  php artisan migrate
```

#### Serve the API
```bash
  php artisan serve
```

### 3. Frontend Setup (React)

#### Navigate to the web directory
```bash
  cd ../web
```

#### Install dependencies
```bash
  npm install
```

#### Run the frontend
```bash
  npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
