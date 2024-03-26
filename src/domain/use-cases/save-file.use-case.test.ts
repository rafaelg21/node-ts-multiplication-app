import fs from 'fs';
import { rimraf } from 'rimraf';
import { SaveFile } from "./save-file.use-case";



describe('SaveFileUseCase', () => {

    const custonOptions = {
        fileContent     : 'custon content',
        fileDestination : 'custon-outputs/file-destination',
        fileName        : 'custon-table-name',
    }

    const customFilePath = `${custonOptions.fileDestination}/${custonOptions.fileName}.txt`;

    // Con este codigo da un error 4058 y deja de ejecutar el test:watch
    /*afterEach(() => {
        const outputFolderExists = fs.existsSync('outputs');
        if(outputFolderExists) fs.rmSync('outputs', { recursive: true});  
        
        const customOutputFolderExists = fs.existsSync(custonOptions.fileDestination);
        if(customOutputFolderExists) fs.rmSync(custonOptions.fileDestination, { recursive: true});
    
    });*/

    afterAll(() => {
        // Clean up after each test
        const customOutputsBaseDir = custonOptions.fileDestination.split('/')[0];
        const outputsFolderExists = fs.existsSync('outputs');
        if (outputsFolderExists) {
          rimraf(`outputs`); // rimraf soluciona el problema de permisos para eliminar directorios
          // fs.rmSync(`outputs`, { recursive: true, force: true });
        }
     
        const customOutputsFolderExists = fs.existsSync(customOutputsBaseDir);
        if (customOutputsFolderExists) {
          rimraf(customOutputsBaseDir); // rimraf soluciona el problema de permisos para eliminar directorios
          // fs.rmSync(`${customOutputsBaseDir}`, {
          //   recursive: true,
          //   force: true,
          // });
        }
      });

    test('should save file witch values', () => {   
        
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content'
        }

        const result  =  saveFile.execute(options);      
        const fileExits   = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' } );

        expect(result).toBe(true);
        expect(fileExits).toBe(true);
        expect(fileContent).toBe(options.fileContent);


    });

    test('should save file with custom values', () => {

        const saveFile = new SaveFile();

        const result      = saveFile.execute(custonOptions);    
        const fileExits   = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' } );
        
        expect(result).toBe(true);
        expect(fileExits).toBe(true);
        expect(fileContent).toBe(custonOptions.fileContent);

    }); 

    test('should return if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs,'mkdirSync').mockImplementation(
                () => {throw new Error('Este es un mensaje de error desde el testing'); }
            ); 


        const result = saveFile.execute(custonOptions);
        
        expect(result).toBe(false);

        mkdirSpy.mockRestore();

    });


    test('should return if  file could not be created', () => {
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs,'writeFileSync').mockImplementation(
            () => {throw new Error('Este es un mensaje de error desde el testing escribiendo en el archivo'); }
        ); 


        const result = saveFile.execute({fileContent:"hola"});
        
        expect(result).toBe(false);

        writeFileSpy.mockRestore();

    });

 
});
