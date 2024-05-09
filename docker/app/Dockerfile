FROM node:18-buster as builder

RUN mkdir -p /usr/src/next-nginx
WORKDIR /usr/src/next-nginx

COPY ../package.json package.josn

RUN npm install -g pnpm
RUN pnpm install

COPY ../../ .

RUN pnpm build

FROM nginx:1.25.4-alpine as production
ENV NODE_ENV production

RUN rm -rf /usr/src/share/nginx/html/*
COPY --from=builder /usr/src/next-nginx/out /usr/share/nginx/html
# COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]