# Використовуємо офіційний образ Node.js
FROM node:18-alpine

WORKDIR /app

# Копіюємо package.json та встановлюємо залежності
COPY package*.json ./
RUN npm install --omit=dev

# Копіюємо весь проєкт і збираємо фронтенд
COPY . .
RUN npm run build

# Встановлюємо `serve` для обслуговування статичних файлів
RUN npm install -g serve

# Задаємо значення порту, який Railway автоматично передає через змінну PORT
ENV PORT 5000

# Запускаємо `serve` з використанням змінної PORT, або 5000, якщо Railway її не надасть
CMD ["sh", "-c", "serve -s build -l ${PORT:-5000}"]
