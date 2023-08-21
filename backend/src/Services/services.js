const generateRandomSixDigitNumber = ()=> {
    return Math.floor(Math.random() * 900000) + 100000;
  }
  
  const randomSixDigitNumber = generateRandomSixDigitNumber();
  console.log(randomSixDigitNumber);
  


