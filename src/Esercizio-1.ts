const fs = require('node:fs');

fs.writeFile('./txt/message.txt', 'Hello world!', 'utf8', (err: { message: any; })=>{
    if(err){
        console.error(err.message)
    }
    console.log("File scritto con successo!")
});