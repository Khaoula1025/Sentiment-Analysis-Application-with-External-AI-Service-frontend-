FROM node:20-alpine AS builder

WORKDIR /app

# Accept build argument
ARG BACKEND_URL=http://backend:8000

# Set as environment variable
ENV BACKEND_URL=$BACKEND_URL

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build 

FROM node:20-alpine AS runner

WORKDIR /app

# Set environment variable in runner stage too
ENV BACKEND_URL=http://backend:8000

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["npm","start"]