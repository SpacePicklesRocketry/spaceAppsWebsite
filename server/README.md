# LEO Satellite Hub - Backend API Server

## Description

Backend API server for the LEO Satellite Hub website. This Express.js application provides RESTful API endpoints for contact form submissions and FAQ management, with MongoDB as the database.

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **express-validator** - Request validation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Prerequisites

- Node.js (version 18+ recommended)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB connection string and other configuration values.

## Running the Server

### Development Mode
```bash
npm run dev
```
This uses nodemon for automatic server restart on file changes.

### Production Mode
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Contact Form
- **POST /api/contact** - Submit contact form
  - Required fields: `name`, `email`, `message`
  - Optional fields: `company`
  - Response: `{ success: true, message: string, data: { id: string } }`

### FAQ Management
- **GET /api/faq** - Retrieve all published FAQs
  - Response: `{ success: true, count: number, data: [{ id, question, answer }] }`

### Health Check
- **GET /api/health** - Server health status
  - Response: `{ status: 'ok', timestamp: string, uptime: number }`

## Project Structure

```
server/
├── config/           # Configuration files
│   └── database.js   # Database connection setup
├── controllers/       # Business logic and request handlers
│   ├── contactController.js
│   └── faqController.js
├── middleware/        # Custom middleware functions
│   ├── errorHandler.js
│   └── validateRequest.js
├── models/           # Mongoose schemas and models
│   ├── Contact.js
│   └── FAQ.js
├── routes/           # Express route definitions
│   ├── contactRoutes.js
│   └── faqRoutes.js
├── scripts/          # Utility scripts
│   └── seedFAQs.js   # Database seeding script
├── app.js            # Express application configuration
├── server.js         # Server entry point
└── package.json      # Dependencies and scripts
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/leo-satellite-hub` |
| `NODE_ENV` | Environment mode | `development` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |

## Database Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Update `MONGODB_URI` in `.env` to point to your local instance

### MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env` with your Atlas connection string

### Seeding Initial Data
To populate the database with initial FAQ data:
```bash
node scripts/seedFAQs.js
```

## Testing

The API endpoints can be tested using tools like:
- Postman
- curl
- Thunder Client (VS Code extension)

Example curl commands:
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Submit contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","message":"Test message"}'

# Get FAQs
curl http://localhost:5000/api/faq
```

## Deployment

### Environment Variables
Ensure all required environment variables are set in your production environment:
- `PORT` - Production server port
- `MONGODB_URI` - Production database connection string
- `NODE_ENV` - Set to `production`
- `CORS_ORIGIN` - Your frontend domain

### Database Connection
- Use MongoDB Atlas or a managed MongoDB service for production
- Ensure proper security settings and access controls
- Consider connection pooling for high-traffic applications

### CORS Configuration
Update `CORS_ORIGIN` to match your frontend domain in production.

## Error Handling

The server includes comprehensive error handling:
- Validation errors (400)
- Not found errors (404)
- Duplicate key errors (409)
- Server errors (500)
- Database connection errors

All errors return JSON responses with consistent format:
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

## Development

### Adding New Endpoints
1. Create controller function in appropriate controller file
2. Add route definition in routes file
3. Add validation middleware if needed
4. Update this README with endpoint documentation

### Database Schema Changes
1. Update Mongoose model in `/models`
2. Create migration script if needed
3. Update seeding scripts
4. Test thoroughly before deploying

## License

MIT
