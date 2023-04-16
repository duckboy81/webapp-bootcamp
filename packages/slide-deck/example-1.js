// noinspection JSCheckFunctionSignatures



/** Find square root of input provided by STDIN */
process.stdin.on("data", inputVal => {
    try {
        const inputNumber = Number(inputVal);
        const sqrt = Math.sqrt(inputNumber);
        console.log(`The square root of ${inputNumber} is ${sqrt}`);
    } catch (e) {
        console.error("Invalid Input");
    }
});