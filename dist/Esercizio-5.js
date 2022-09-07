"use strict";
const surprisingFact = "The bumblebee bat is the world's smallest mammal";
console.log("Surprising fact: ", surprisingFact);
console.error("surprisingFactError:", surprisingFact);
//Challenge 2 :
const familyTree = [
    {
        name: "Person 1",
        children: [
            {
                name: "Person 2",
                children: [
                    {
                        name: "Person 3",
                        children: [
                            {
                                name: "Person 4",
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
console.log(JSON.stringify(familyTree, null, 2));
console.dir(familyTree, { depth: null });
//Challenge 3:
function importantTask() {
    console.count("importantTaskCount:");
}
importantTask();
importantTask();
importantTask();
importantTask();
console.countReset("importantTaskCount:");
importantTask();
importantTask();
//# sourceMappingURL=Esercizio-5.js.map