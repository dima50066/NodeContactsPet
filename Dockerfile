# Використовуємо офіційний образ Node.js на базі Alpine
FROM node:18-alpine AS base

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо файли package.json та package-lock.json до контейнера
COPY package*.json ./

# Встановлюємо всі залежності, включаючи dev-залежності, щоб зібрати документацію
RUN npm install

# Копіюємо всі файли проєкту
COPY . .

# Команда для збірки Swagger-документації
RUN npm run build-docs

# Видаляємо dev-залежності після збірки документації для оптимізації образу
RUN npm prune --omit=dev

# Виставляємо порт для доступу до сервера
EXPOSE 3000

# Команда для запуску додатка
CMD ["npm", "run", "start"]
