# Starting webserver
FROM nginx:alpine
# labels
LABEL project="login-page"
LABEL template="form-with-passwordless-authentication"
# default environments var
ENV TZ='America/Fortaleza'
# basic config
WORKDIR /home/nginx
# mount app
COPY nginx.conf /etc/nginx/nginx.conf
COPY public /usr/share/nginx/html