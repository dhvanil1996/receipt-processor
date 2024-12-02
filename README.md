# Receipt Processor Instructions 

# Copy, Paste, and Run these commands one line at a time in your local machine 
# Running Locally: 
- git clone https://github.com/dhvanil1996/receipt-processor.git
- cd receipt-processor
- npm install
- npm start 

# Running with Docker 
- docker build -t receipt-processor .
- docker run -p 3000:3000 receipt-processor


# URL for App
- http://localhost:3000

# GET Request 
- URL: /receipts/{id}/points
- Method: GET

Example: 
- GET http://localhost:3000/receipts/adb6b560-0eef-42bc-9d16-df48f30e89b2/points

Response: 
- Status Code: 200 Ok
- Body: A JSON object containing the points awarded for the receipt 

# POST Request  
- URL: /receipts/process
- Method: POST
- Body: The receipt details in JSON format 

Example:
- POST http://localhost:3000/receipts/process

Response: 
- Status Code: 200 Ok
- Body: A JSON object containing the receipt ID 