# Building app
FROM node:16-alpine AS builder
# default environments var
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ENV NODE_OPTIONS='--max_old_space_size=2048'
# custom environments var
ARG REACT_APP_PAGE_NAME
ARG REACT_APP_API_URL
ARG REACT_APP_API_TOKEN
ARG REACT_APP_TARGET_URL
ENV REACT_APP_PAGE_NAME=$REACT_APP_PAGE_NAME
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_API_TOKEN=$REACT_APP_API_TOKEN
ENV REACT_APP_TARGET_URL=$REACT_APP_TARGET_URL
# basic config
USER node
WORKDIR /home/node
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . /home/node/
RUN yarn build

# Starting webserver
FROM nginx:alpine
# labels
LABEL project="login-page"
# default environments var
ENV TZ='America/Fortaleza'
# basic config
WORKDIR /home/nginx
# mount app
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /home/node/build /usr/share/nginx/html
