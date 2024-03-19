import fs from 'fs';
import { yarg } from "./config/plugins/args.plugin";

const {b:base, l:limit, s:showTable} = yarg;

let content: string = "";

content+=`
===========================================                    
             Tabla del ${base}
===========================================\n\n`;         

for(let i:number =1; i<=limit; i++) {
    content+=`${base}  x  ${i}  =  ${base * i} \n`;    
}
const outputsPath = `outputs`;

if(showTable)
    console.log(content); 

fs.mkdirSync(outputsPath, { recursive: true}); 
fs.writeFileSync(`${outputsPath}/tabla-${base}.txt`, content);
console.log("File created!"); 