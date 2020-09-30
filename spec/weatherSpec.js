//testing when using API & asynchronous data

//either of the following two testing methods will work

describe('getWeatherFor', () => {
    describe('when passed "Sydney"', () => {
        it('should return 25', () => {
           return getWeatherFor('Sydney')
            .then((temp) => {
                expect(temp).toBe(25);
            });
        });
    });
});

// this method is cleaner & will help when testing should getWeatherFor rejects (causes an error to be thrown in .catch() )

describe('getWeatherFor', () => {
    describe('when passed "Sydney"', () => {
        it('should resolve 25', () => {
            return expectAsync(getWeatherFor('Sydney')).toBeResolvedTo(25);
        });
    });
});

describe('when passed a city other than "Sydney" or "Melbourne"', () => {
    it('should reject with an error', () => {
        return expectAsync(getWeatherFor('London')).toBeRejectedWith('City London does not exist in our database');
        
    });
});

// adding in the case for Melbourne - note: the numbers used in the test must match those in the index.js file or the testing will fail

describe('getWeatherFor', ()  => {
    describe('when passed "Melbourne"', () => {
        it('should resolve 15', () => {
            return expectAsync(getWeatherFor('Melbourne')).toBeResolvedTo(15);
        })
    })
})