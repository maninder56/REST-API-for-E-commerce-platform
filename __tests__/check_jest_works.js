// This test fails because 1 !== 2 

xit ('Testing to see if jest works', ()=>{
    expect(1).toBe(2)
})

// This test fails because 1 === 1

xit ('Testing to see if jest works 2', ()=>{
    expect(1).toBe(1)
})