# Microservices in Nodejs
This project is basic demo of Microservices in Nodejs, Along with API gatway. In this project we have three Microservices, as slisted below
1. [User Service](https://github.com/ShankyTiwari/Microservices-in-Nodejs/tree/master/UserService)
2. [Product Service](https://github.com/ShankyTiwari/Microservices-in-Nodejs/tree/master/ProductService)
3. [Order Service](https://github.com/ShankyTiwari/Microservices-in-Nodejs/tree/master/OrderService)

## User Service
This service will implement the User related APIs.

## Product Service
This service will implement the Product related APIs.

## Order Service
This service will implement the Order related APIs.

## API gateway
An [API Gateway](https://github.com/ShankyTiwari/Microservices-in-Nodejs/tree/master/APIGateway) where you will add Rate Limit and other Authentications.

## Execution
docker run -d --link mongodb:mongodb --link userservice:userservice --link orderservice:orderservice --link productservice:productservice -p 8000:8000 --name apiservice  apiservice
docker run -d --link mongodb:mongodb --link userservice:userservice --link productservice:productservice -p 2000:2000 --name orderservice  orderservice
docker run -d --link mongodb:mongodb --link userservice:userservice -p 3000:3000 --name productservice  productservice
docker run -d --link mongodb:mongodb -p 4000:4000 --name userservice  userservice