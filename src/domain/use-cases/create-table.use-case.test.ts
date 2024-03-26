import { CreateTable } from "./create-table.use-case";
import { Options } from './save-file.use-case';


describe("CreateTableUseCase", () => {

   test("Should create a table with default values", () => {
        const createTable = new CreateTable();

        const table = createTable.execute({ base: 2 });
        const rows = table.split('\n').length;        

        expect( createTable ).toBeInstanceOf( CreateTable );
        expect( table ).toContain('2  x  1  =  2');
        expect( table ).toContain('2  x  10  =  20');
        expect( rows ).toBe(10);        
   });

   test('should create a table with custom values', () => {

        const createTable = new CreateTable();
    
        const options = {
            base: 3,
            limit: 20
        }
        
        const table = createTable.execute(options);
        const rows = table.split('\n').length;        
        //console.log(table);

        expect(table).toContain(`3  x  1  =  3\n3  x  2  =  6\n3  x  3  =  9\n3  x  4  =  12\n3  x  5  =  15\n3  x  6  =  18\n3  x  7  =  21\n3  x  8  =  24\n3  x  9  =  27\n3  x  10  =  30\n3  x  11  =  33\n3  x  12  =  36\n3  x  13  =  39\n3  x  14  =  42\n3  x  15  =  45\n3  x  16  =  48\n3  x  17  =  51\n3  x  18  =  54\n3  x  19  =  57\n3  x  20  =  60`);
        expect(rows).toBe(options.limit);

   });



});