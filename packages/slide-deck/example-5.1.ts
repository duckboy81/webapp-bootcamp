

function trimItemsWithTypescript(array: string[]) {
    for (let i = 0; i < array.length; i++){
        array[i] = array[i].slice(0, 10);
    }
}

trimItemsWithTypescript(['My cool string', 'Whoa there', 22222]);



