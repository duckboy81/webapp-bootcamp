const wheels = 4;
const doors = 4;
const color = '#FFF';

const myCar = {
    numWheels: wheels,
    numDoors: doors,
    paintColor: color
}

const randomString = `Demo the debugger with my ${doors}-door car`;

function coolFunction(inputString) {
    // Add a random number to the end of the string
    const newRandomString = inputString + Math.floor(Math.random() * 100);

    return newRandomString;
}

const coolNewString = coolFunction(randomString);

console.log('Done demoing!');