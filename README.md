# budget-node
A budgeting app backend made with Node.js and Yoga.

Deployment with heroku: https://infinite-bayou-49937.herokuapp.com/

## Installation

This project uses prisma, so you must have a prisma account, remove the endpoint variable's content in prisma/prisma.yml, after that run the command prisma deploy on the folder root. Also must have yarn installed locally, or npm.

1. Clone the project: ```git clone https://github.com/EdmilDM/budget-node.git```
2. Install dependencies ```yarn install ```
3. Make .env file with APP_SECRET variable for token generation and verification for JWT.
4. Run index.js ```yarn start ```
