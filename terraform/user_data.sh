#!/bin/bash

set -e

apt-get update

apt-get install -y docker.io nginx

systemctl enable docker
systemctl start docker

systemctl enable nginx
systemctl start nginx

usermod -aG docker ubuntu