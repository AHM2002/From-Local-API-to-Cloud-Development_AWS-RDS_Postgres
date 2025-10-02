# 📸 Photography Store API  

A full-stack **service & product-based API** built for a Photography Store business.  
This project demonstrates secure **API development**, **cloud deployment (AWS)**, and **database integration**, combining both service endpoints (wedding photography, portrait sessions, editing) and product endpoints (albums, frames, prints).  

---

## 🚀 Features  
- Service & product-based API (services, bookings, categories, products)  
- Secure authentication & authorization with **JWT**  
- Role-based access control (**Admin vs Customer**)  
- Deployed on **AWS Elastic Beanstalk** with auto-scaling  
- **PostgreSQL on AWS RDS** with proper network security  
- **Production-grade security** (bcrypt, Helmet, CORS, rate-limiting)  
- **Optimized & scalable** cloud-ready architecture  

---

## 📑 API Planning  

| Endpoint             | Method | Description                          | Status   |
|----------------------|--------|--------------------------------------|----------|
| GET /services        | GET    | List all services                    | ✅ |
| GET /services/:id    | GET    | Get single service                   | ✅ |
| POST /services       | POST   | Create service (Admin)               | ✅ |
| PUT /services/:id    | PUT    | Update service (Admin)               | ✅ |
| DELETE /services/:id | DELETE | Delete service (Admin)               | ✅ |
| POST /auth/register  | POST   | Register user                        | ✅ |
| POST /auth/login     | POST   | Login & get JWT                      | ✅ |
| GET /users/me        | GET    | Get current user (secured)           | ✅ |
| GET /bookings        | GET    | List bookings (Admin only)           | ✅ |
| POST /bookings       | POST   | Create booking (Customer)            | ✅ |
| GET /categories      | GET    | List service categories              | ✅ |
| POST /services/bulk  | POST   | Bulk add services (Admin only)       | ✅ |

---

## 🛠️ Tech Stack  
- **Backend:** Node.js, Express  
- **ORM:** Sequelize  
- **Database:** PostgreSQL (AWS RDS)  
- **Auth:** JWT, bcrypt  
- **Security:** Helmet, CORS, Rate Limiter  
- **Middleware:** Role-based access control  

---

## 🔐 Security Implementations  

- **Dotenv** → stores secrets (DB credentials, JWT secret) securely  
- **Bcrypt** → password hashing for secure storage  
- **JWT** → token-based stateless authentication  
- **Role-based middleware** → enforces admin vs customer privileges  
- **Helmet** → secure HTTP headers against attacks  
- **CORS** → restricts API access to trusted origins  
- **Rate Limiting** → prevents brute force & DDoS attacks  
- **Sequelize ORM** → protects against SQL injection  
- **AWS Security Groups** → restrict DB access only to EB instances  

---

## ⚡ Deployment & Optimization  

- Migrated from **SQLite → PostgreSQL (AWS RDS)**  
- Added **connection pooling** in Sequelize  
- Added **Procfile + start script** for EB deployment  
- Implemented `/health` endpoint for monitoring  
- Configured **Elastic Beanstalk Auto-Scaling (1–4 instances)**  
- Enabled **Multi-AZ RDS** for high availability  

---

## 📬 API Examples  

- `POST /auth/register` → Register user  
- `POST /auth/login` → Login (JWT token)  
- `GET /services` → List services  
- `POST /bookings` → Create booking (Customer)  
- `GET /bookings` → View all bookings (Admin only)  

---

## 🔮 Future Enhancements  

- **GraphQL (Apollo Server)** → Flexible queries, avoid over-fetching  
- **Redis (ElastiCache)** → Caching for faster performance  

---

## 🛠️ Run Locally  

```bash
# Clone repo
git clone https://github.com/yourusername/photography_store_api.git
cd photography_store_api

# Install dependencies
npm install

# Setup environment variables
DB_HOST=...
DB_USER=...
DB_PASS=...
JWT_SECRET=...

# Start server
npm start
