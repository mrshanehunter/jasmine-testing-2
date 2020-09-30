//Testing the "happy path" for login's index.js - all working / no errors

describe('login', () => {
    describe('when the user logs in successfully', () => {
        it('should resolve a token', () => {
            const response = { token: '123' };  //creates a response object with the response we want the promise that Api.login() returns to give us
            const loginValue = new Promise ((resolve, reject) => {  //this creates the promise that Api.login is going to return (read up on promises in the Promise MDN article)
                resolve(response);
            });

            spyOn(Api, 'login').and.returnValue(loginValue);  //This modifies Api.login and returns the promise value we created (loginValue) instead of calling the real API 

            return expectAsync(login('test', 'test')).toBeResolvedTo(response.token); //return expectAsync is used here because we're telling Jasmine to wait for our promise to resolve, and we're checking it resolves to the response.token.
                                                                                        //it won't matter what email / password  is passed to login() since we've used a SPY to ALWAYS resolve with the token we created
        });
    });
});

// Testing for when the Api.login() function resolves with an error

describe('when the user uses an incorrect email', () => {
    it('should reject with an error message', () => {
        const response = { error: 'user not found' };  //setting the response to be an object with error as the property & user not found as the value - this triggers the right part of the login function we want to test
        const loginValue = new Promise((resolve, reject) => {  //same as before - creating a promise we give to Api.login() to return using our Spy.  Resolving the response we just created
            resolve(response);
        });

        spyOn(Api,'login').and.returnValue(loginValue);  //same as previous test - spying on Api.login() and setting the return value to loginValue (we created)

        return expectAsync(login('test', 'test'))
        .toBeRejectedWithError("Oops! Incorrect username or password. Check your details and try again."); //using return expectAsync() as before - to tell Jasmine to wait for our promise to be resolved before continuing on
                                                                                                           // different matcher in this case - .toBeRejectedWithError() checks that the login rejects with the correct error             
    });
});

// Testing for when a password is not passed to to login.

describe('when the user uses an incorrect password', () => {
    it('should reject with an error message', () => {
        const response = { error: 'Missing password', };
        const passwordValue = new Promise((resolve, reject) => {
            resolve(response);
        });

        spyOn(Api,'login').and.returnValue(passwordValue);

        return expectAsync(login('test', 'test')).toBeRejectedWithError("Oops! Missing password, make sure to fill in your password and try again.")

    })
})
