//Any async function returns a promise implicitly, 
//and the resolve value of the promise will be whatever you return from the function 
//(which is the string "done" in our case).
/*
const makeRequest = async () => {
    console.log(await getJSON())
    return "done"
  }
  
  const makeRequest = async () => {
    const value1 = await promise1()
    const value2 = await promise2(value1)
    return promise3(value1, value2)
  }


const makeRequest = async () => {
    await callAPromise()
    await callAPromise()
    await callAPromise()
    await callAPromise()
    await callAPromise()
    throw new Error("oops");
  }
  
  makeRequest()
    .catch(err => {
      console.log(err);
      // output
      // Error: oops at makeRequest (index.js:7:9)
    })

  makeRequest() */

  