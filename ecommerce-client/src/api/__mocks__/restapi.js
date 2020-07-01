const fs = require('fs');

export const get = (config) => new Promise((resolve, reject) => {
  // Get userID from supplied url string
//   const lastSlash = url.lastIndexOf('/')
//   const userID = url.substring(lastSlash + 1)
  // Load user json data from a file in de subfolder for mock data
  fs.readFile(`./src/api/__mockData__/getskus.json`, 'utf8', (err, data) => {
    console.log(`data - ${data}`);
    if (err) reject(err)
    // Parse the data as JSON and put in the key entity (just like the request library does)
      resolve(
        { 
          response : {
            response: {
                data : {
                  success: true,
                  timestamp: Date.now(),
                  message:"<h1>The list of SKUs rahulllllllllll are retrieved by ECommerce service.</h1>",
                  data,
                }
            }
          }
        }
      );
  })
});

// export default get;
