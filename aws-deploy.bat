call npm run build --prefix frontend

cd frontend
REM npm run build
cd ..
REM npm run build -- prefix frontend
REM http://koby5i-mern-address-book-fe.s3-website.eu-central-1.amazonaws.com
aws s3 cp ./frontend/build  s3://koby5i-mern-address-book-fe --recursive
aws s3 ls
