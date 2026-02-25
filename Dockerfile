FROM node:20-alpine

RUN mkdir /app
WORKDIR /app
COPY ./frontend ./

# Install only production dependencies
RUN npm install

# Cloud Run requires listening on PORT env variable
ENV PORT=5173
EXPOSE 5173

RUN npm run dev
