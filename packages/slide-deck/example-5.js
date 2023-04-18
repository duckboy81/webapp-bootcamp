
// No hints


function trimItems(array) {
    for (let i = 0; i < array.length; i++){
        array[i] = array[i].slice(0, 10);
    }
}

trimItems(['My cool string', 'Whoa there', 2]);




/**
 * @param {(string)[]} array
 */
function trimItemsWithJsDoc(array) {
    for (let i = 0; i < array.length; i++){
        array[i] = array[i].slice(0, 10);
    }
}

trimItemsWithJsDoc(['My cool string', 'Whoa there', 2]);




