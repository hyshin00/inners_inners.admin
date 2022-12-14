FROM node:16.17.0 as builder

ENV WORKDIR=/inners-admin

WORKDIR $WORKDIR

COPY ./ $WORKDIR/

ARG version
ENV COMMITID=$version

RUN npm i -g pnpm

RUN pnpm install
RUN pnpm build

FROM nginx:alpine as prod

RUN mkdir /inners

COPY --from=builder /inners-admin/dist /inners-admin
COPY --from=builder /inners-admin/docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
