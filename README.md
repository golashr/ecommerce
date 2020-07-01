# ECommerce Application 
This application demonstrates a small functionality of calculating the total estimated cost of a shopping cart on an e-commerce portal. 
It has one microservice '**ecommerce-server**' and frontend '**ecommerce-client**'. It deals with 4 SKUs which are inserted into MongoDB as part of the initialisation of the '**ecommerce-server**' service and frontend fetches it at the time of the launch.   

It contains a docker-compose file which can be used to deploy the service seemlessly on any given box.

Here is the price list to begin with..
| SKU |    Name     |     Price |
| --- | :---------: | --------: |
| ipd | Super iPad  |  \$549.99 |
| mbp | MacBook Pro | \$1399.99 |
| atv |  Apple TV   |  \$109.50 |
| vga | VGA adapter |   \$30.00 |

Some additional discounts are offered on the launch day!

- The website offers to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will pay the price of 2 only
- The brand new Super iPad will have a bulk discounted applied, where the price will drop to \$499.99 each, if someone buys more than 4
- The website will bundle in a free VGA adapter free of charge with every MacBook Pro sold

## Example scenarios

SKUs Scanned: atv, atv, atv, vga
Total expected: \$249.00

SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd
Total expected: \$2718.95

SKUs Scanned: mbp, vga, ipd
Total expected: \$1949.98

## Getting Started

### Clone the repo and install the project

- git clone https://github.com/golashr/ecommerce.git
- cd ecommerce

**Further setup steps**
1. Create docker network by running this command

   ```
   docker network create -d bridge --subnet 172.19.240.0/24 --gateway 172.19.240.1 ecommerce_net

   ```

2. Run the ecommerce-server by running
   **docker-compose up -d**

   This will start 
   - **ecommerce-server** docker instance, ready to serve on **3001**
   - **mongoDB** docker instance, ready to serve on **27017**
   - **Swagger** UI docker instance, ready to serve on **3999**

3. Run following commands
   - Run the ecommerce-server on dev mode
    ```
    npm run dev
    ```
   - Run the ecommerce-server on test mode and see the test results
    ```
    npm run test
    ```
   - Run the ecommerce-server on test mode to check code coverage
    ```
    npm run coverage
    ```  
4. Swagger UI page to interact with APIs exposed by ecommerce-server    
  Visit [localhost:3999](http://localhost:3999)

5. Launch the frontend to deal with the server    
  Visit [locallhost:3000](http://localhost:3000)

## **Usages**
There are **3 core endpoints** exposed.
- ### **getSKUs**  
  This API will fetch all 4 SKUs along with their price and image path (pressumably can be used on the front end).  Consume it via   
  [**Browser**](http://localhost:3001/api/v1/getSKUs)    
  **Postman** with endpoint - [http://localhost:3001/api/v1/getSKUs](http://localhost:3001/api/v1/getSKUs) or via     
  [**Swagger console**](http://localhost:3999)   

- ### **checkout**  
  This API will calculate total price all SKUs in the cart as part of the checkout process. Consume it via   
  **Postman** with endpoint - [http://localhost:3001/api/v1/checkout](http://localhost:3001/api/v1/checkout) or via      
  [**Swagger console**](http://localhost:3999)     
  The format of the API request body with content-type:application/json
  ```
  [
    {
      "sku": "ipd",
      "number" : 1
    },
    {
      "sku": "mbp",
      "number" : 1
    }
  ]
  ```
  The schema is described in the swagger console more and gets validated at the API call!

- ### **updateSKUs**  
  This API is provided for **administrators** to update price of SKUs to support the market price and offer discounts. Consume it via   
  **Postman** with endpoint - [http://localhost:3001/api/v1/updateSKUs](http://localhost:3001/api/v1/updateSKUs) or via      
  [**Swagger console**](http://localhost:3999)   
  The format of the API request body with content-type:application/json
  ```
  [
    {
      "sku": "ipd",
      "price": 749.99
    },
    {
      "sku": "mbp",
      "price": 1999.99
    }
  ]
  ```
  The schema is described in the swagger console more and gets validated at the API call!

  ## **Additionals endpoints**
- ### **\\**  
  This call is just to check the availability of the ecommerce-server. Consume it via   
  [**Browser**](http://localhost:3001/)    
  **Postman** - [**http://localhost:3001/**](http://localhost:3001/)    

- ### **ping**  
  This call is just to check to ping the ecommerce-server and check the health of it. Consume it via   
  [**Browser**](http://localhost:3001/ping)    
  **Postman** - [**http://localhost:3001/ping**](http://localhost:3001/ping)    

## **Further**
- Alternatively, the server can be implemented via cloud serverless technologies e.g. AWS Lambda, DynamoDB, API Gateway, Route 53 and S3. To be followed soon.    
- JWT Authentication can be implemented    
