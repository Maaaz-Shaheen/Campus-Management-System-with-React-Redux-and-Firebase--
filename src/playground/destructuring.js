// OBJECT DESTRUCTURING


// const person = {
//     name : "Ma'aaz",
//     age: 17,
//     location : {
//         city : "Karachi",
//         temp: 18,
//     },
// };

// const {name: firstName = "Anonymous", age} = person;
// const {city, temp: temperature} = person.location;

// console.log(`${firstName} is ${age}.`);

// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}`);
// };

// CHALLENGE
// const book = {
//     title : "Ego is the Enemy",
//     author: "Ryan Holiday",
//     publisher : {
//         name: "Penguin",
//     },
// };

// const { name: publisherName = "Self-Published"} = book.publisher;

// console.log(publisherName);


// ARRAY DESTRUCTURING

// const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

// const [, city, state] = address;
// console.log(`You are in ${city}, ${state}`);

// CHALLENGE

const items = ["Coffee (iced)", "$2.00", "$3.50", "$2.75" ];

const [itemName, , mediumPrice] = items;
console.log(`A medium ${itemName}} costs ${mediumPrice}`);



