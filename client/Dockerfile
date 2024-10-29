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

# Встановлюємо PORT зі значенням за замовчуванням
ENV PORT=${PORT:-5000}

# Запускаємо `serve` з використанням змінної PORT
CMD ["serve", "-s", "build", "-l", "$PORT"]
