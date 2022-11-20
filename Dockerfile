# Building app
FROM node:16-alpine AS builder
# default environments var
ARG nodeEnv
ENV NODE_ENV=$nodeEnv
ENV NODE_OPTIONS='--max_old_space_size=2048'
# custom environments var
ARG apiUrl
ARG apiToken
ENV REACT_APP_API_URL=$apiUrl
ENV REACT_APP_API_TOKEN=$apiToken
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