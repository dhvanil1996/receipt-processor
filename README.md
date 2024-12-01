# Copy, Paste, and Run these commands one line at a time in your local machine 

# Running Locally: 
git clone https://github.com/dhvanil1996/receipt-processor.git
cd receipt-processor
npm install
npm start 

# Running with Docker 
docker build -t receipt-processor .
docker run -p 3000:3000 receipt-processor


# URL for App
http://localhost:3000