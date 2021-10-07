# Calculator

<img src="ScreenShot.png" width="600">

## Table of Contents
1. [Description](#description)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Technologies](#technologies)

## Description
- Supports additions, substractions, multiplications, divisions, and parentheses.
- An operation can be created from the keyboard or from clicking the buttons (keyboard is available in mobile version by tapping on the operation area).
- Pressing '=' or Enter submits the operation to be solved, result will appear in the top section.
- All Clear button ('AC') clears both result and operation fields, Clear button ('C', once an operation is entered) clears only the operation field.

### API
 <code>/calculator</code> endpoint handles GET (query parameters) and POST (JSON data) requests.

## Requirements
- Node ^6.13.0

## Installation
1. Clone repository
2. Install dependencies (from within the Calculator directory):
```sh
npm install
```
3. Create the bundle file:
```sh
npm run build (development mode)
```
```sh
npm run prod (production mode)
```
4. Start the server:
```sh
npm start
```
5. Application available at http://localhost:3000

### Access from command line
1. Node command (by running calculate.js):
   - Access the <code>calculate()</code> function
   - Invoke function on string operation
   - Example command (from calculator directory):
```sh
node -e 'require("./server/calculator/calculate.js").calculate('1+1')'
```

2. API call: <code>/calculator</code>
- POST request (JSON data):
   - Set Content-Type header to <code>application/json</code>
   - Enter operation in JSON format (key="operation"):\
   <code>'{"operation":[string operation]}'</code>
   - Example cURL command:
```sh
curl -X POST http://localhost:3000/calculator -H "Content-Type: application/json" -d '{"operation":"1+1"}' -w '\n'
```
  ...returns 2

- GET request (query parameter):
  - Include ?operation query followed by URL encoded string:\
<code>[base url]/calculator?operation=[URL encoded string]</code>
  - Example cURL command:
```sh
curl -X GET http://localhost:3000/calculator?operation=1%2B1
```
  ...returns 2

### Test command
```sh
npm test
```

## Technologies
- AWS EC2
- Axios
- Babel
- CSS
- Express.js
- HTML
- Jest
- Node.js
- sinful-math
- React & ReactDOM
- Webpack
