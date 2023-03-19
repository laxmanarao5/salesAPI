# Sales API

### Description:-  
projectPulse is a projects tracking tool for organizations to track status of their projects. This project is in initial stage only backend is completed using nodejs 


### How to Install the project
Download the git repository manually or clone it by following command

```
git clone https://github.com/laxmanarao5/salesAPI
```
If you download manually extract the zip file.

then run the following command to install all the modules that are used in this project

```
  npm install
```
then start the server using below command

```
  nodemon server
```
### Configurations
  ``` create ".env " file and add the following details to the ".env" file
PORT=PORT_NUMBER
HOST=HOST_ADDRESS
DB_NAME=YOUR_DB_NAME
DB_USER=YOUR_DB_USER
DB_PASS=YOUR_DB_PASSWORD

```

## Overview

### APIs in this project:-

#### Initialize database
http://localhost/sales/initialize

#### Monthly report
http://localhost/sales/statistics/month/July

#### Bar graph
http://localhost/sales/items/month/July

#### Pie chart
http://localhost/sales/category/month/July

####  Final report
http://localhost/sales/sales-report/month/July
