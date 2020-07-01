#!/bin/bash
cd ecommerce-server
echo "Building ecommerceserver service docker image"
sudo docker build . -t golra03/ecommerceserver:latest -t golra03/ecommerceserver:v1.1 

echo "pushing ecommerceserver service docker image to the Docker hub"
sudo docker push golra03/ecommerceserver:latest
sudo docker push golra03/ecommerceserver:v1.1