# QuickBid 🏷️

A dynamic and user-friendly **online auction platform** that connects **auctioneers** and **bidders** for real-time auctions. Empower your auction experience by participating in competitive bidding or hosting your own auctions!

## Key Features

### Auctioneer 
- [x] Create and manage auctions for items 📝
- [x] Set starting bids and reserve prices 💰
- [x] Add item descriptions, categories, and images 🖼️
- [x] Track highest bids in real time 📈
- [x] Receive commission for successful auctions 💼
- [x] Email notifications for auction results 📧
- [x] Publish and manage payment methods for buyers 💳
- [x] Monitor and verify payment proofs 🛡️

### Bidder 
- [x] Place bids on items of interest 💸
- [x] View auction item details, including condition and bid history 🔎
- [x] Receive notifications for winning bids 🏆
- [x] Connect with auctioneers for payments 🧾
- [x] Track and manage your bidding history 📊


## Tools and Technologies🚀

### **Frontend**
- React.js: For building a dynamic user interface.
- Vite: Frontend build tool for modern web projects.
- Tailwind CSS: For responsive and modern styling.
- Redux: For effective state management.
- React Router: For handling navigation between views.
- Axios: For making HTTP requests to the backend.

### **Backend**
- Node.js: Server-side runtime for building scalable applications.
- MongoDB: NoSQL database.
- Mongoose: ODM for interacting with MongoDB.
- Cron Jobs: For automated auction and payment management.
- JWT: For secure authentication.
- Cloudinary: For file storage.

## Project Setup Instructions ⚙️

## Prerequisites
Ensure that you have the following installed on your system:

- **Node.js** (v18.x or later)
- **NPM** or **Yarn**
- **MongoDB** (running locally or accessible via URI)

---

## Step 1: Clone the Repository
Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/tarungatla/QuickBid.git
cd quickbid
```

## Step 2: Setup the Backend

## 1. Navigate to the backend folder and install the dependencies:
```bash
cd backend
npm install
```
## 2. Create a config.env file in the backend folder and add the following environment variables (adjust according to your configuration):
```bash
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.txrhd.mongodb.net/
JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
SMTP_SERVICE=gmail
SMTP_PORT=465
SMTP_HOST=smtp.gmail.com
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_email_password
```


## 3. Run the backend server in development mode:
```bash
npm run dev
```

## Step 3: Setup the Frontend
## 1. Navigate to the frontend folder and install the dependencies:
```bash
cd frontend
npm install
```

## 2. Create a .env file in the frontend folder and configure environment variables.
```bash
VITE_serviceID=service_id
VITE_templateID=template_id
VITE_API_URL=your_api_url
```
## 3. Start the frontend development server:
```bash
npm run dev
```