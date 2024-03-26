import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { ServerApp } from './server-app';


describe('server app', () => {  

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        name: 'test-fielname',
        destination: 'test-destination'
    } 

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('sould create Server App instalçnce', () => {
    
            const serverApp = new ServerApp();
            expect(serverApp).toBeInstanceOf(ServerApp);
            expect( typeof ServerApp.run).toBe('function');
     });

     test('sould run ServerApp with options', () => {

         


        // const logSpy = jest.spyOn(console, 'log');
        // const createdTableSpy = jest.spyOn(CreateTable.prototype, 'execute')
        // const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');
     

        // ServerApp.run(options);
    
        // expect(logSpy).toHaveBeenCalledTimes(2); //Probamos que el log haya sido llamado 2 veces
        // expect(logSpy).toHaveBeenCalledWith('Server runnning...'); //Probamos que el primer los contenga este texto ServerRunning...
        // expect(logSpy).toHaveBeenLastCalledWith('File created!'); //Que el ultimo log sea ese en particular
        
        // expect(createdTableSpy).toHaveBeenCalledTimes(1); //Probamos que nuestro UseCase haya sido llamado por lo menos 1 vez
        // expect(createdTableSpy).toHaveBeenCalledWith({
        //     base: options.base, limit: options.limit
        // });

        // expect(saveFileSpy).toHaveBeenCalledTimes(1); //Probamos que esto haya sido llamado una vez
        // expect(saveFileSpy).toHaveBeenCalledWith({
        //     fileContent: expect.any(String),
        //     fileDestination: options.destination,
        //     fileName: options.name
        // });



     });
     
     test('should run with custom values mocked', () => {
    
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock   = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);
    
        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
    
    
        ServerApp.run(options);
    
        expect( logMock ).toHaveBeenCalledWith('Server running...');
        expect( createMock ).toHaveBeenCalledWith({"base": options.base, "limit": options.limit });
        expect( saveFileMock ).toHaveBeenCalledWith({
          fileContent: '1 x 2 = 2',
          fileDestination: options.destination,
          fileName: options.name,
        });
        expect( logMock ).toHaveBeenCalledWith('File created!');
        //expect( logErrorMock ).not.toBeCalledWith();
    
    
      });

});  

