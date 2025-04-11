# 1️⃣ Use official Node.js image
FROM node:18

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy all project files
COPY . .

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Expose the port (same as in server.js)
EXPOSE 3000

# 6️⃣ Start the app
CMD ["node", "server.js"]
