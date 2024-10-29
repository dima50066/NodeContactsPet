# Використовуємо офіційний образ Node.js
FROM node:18-alpine

WORKDIR /app

# Копіюємо package.json та встановлюємо залежності
COPY package*.json ./
RUN npm install --omit=dev

# Копіюємо весь проєкт і збираємо фронтенд
COPY . .
RUN npm run build

# Використовуємо сервер для обслуговування статичних файлів
RUN npm install -g serve
EXPOSE 5000
CMD ["serve", "-s", "build", "-l", "5000"]
