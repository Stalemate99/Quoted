# Quoted

🪶 Quoted is a web application that allows you to create quotes and share your knowledge with the world. It is built using TypeScript, Next.js, Tailwind CSS, and Firebase.

## Features

- **Create Quotes**: Easily create quotes with Quoted's intuitive interface. ✍️
- **Share Knowledge**: Share your quotes and insights with others. 📤
- **User Authentication**: Securely sign up and log in to Quoted using your email and password. 🔑
- **Like and Comment**: Engage with other users by liking and commenting on their quotes. ❤️
- **Responsive Design**: Quoted is designed to be fully responsive and works seamlessly on desktop, tablets, and mobile devices. 📱

## Installation

To run Quoted locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/quoted.git
2. Install the dependencies:
  ```bash
  cd quoted
  npm install
  ```
3. Set up Firebase project and obtain your Firebase configuration.

4. Create a .env.local file in the root directory and add the following environment variables:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=<your-api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<your-measurement-id>
```

5. Start the development server:

```bash
npm run start
```
6. Open your browser and navigate to http://localhost:3000 to access Quoted.

## Technologies Used
- TypeScript
- Next.js
- Firebase
- Tailwind CSS

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request to the Quoted GitHub repository.

## License
This project is licensed under the MIT License.
