FROM node:24-bookworm-slim AS build
WORKDIR /app
ARG NEXT_PUBLIC_SITE_INDEXABLE=true
ARG NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/parcerias-amandastamboni/30min
ENV NEXT_PUBLIC_SITE_INDEXABLE=$NEXT_PUBLIC_SITE_INDEXABLE
ENV NEXT_PUBLIC_CALENDLY_URL=$NEXT_PUBLIC_CALENDLY_URL
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-bookworm-slim AS runtime
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3001 BENE_DATA_DIR=/data
WORKDIR /app
COPY --from=build /app/dist/standalone ./dist/standalone
RUN mkdir -p /data && chown -R node:node /data
USER node
EXPOSE 3001
VOLUME ["/data"]
CMD ["node", "dist/standalone/server.js"]