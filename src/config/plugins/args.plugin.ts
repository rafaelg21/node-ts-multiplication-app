
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
.option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    description: 'Multiplications table base'
})
.option('l',{
    alias:'limit',
    type: 'number',
    default:10,
    description: 'Multiplications table limit'
})
.option('s', {
    alias:'show',
    type: 'boolean',
    default:false,
    description: 'Show Multiplication table'
})
.option('n', {
    alias:'name',
    type: 'string',
    default:'multiplication-table',
    description: 'File name'
})
.option('d', {
    alias:'destination',
    type: 'string',
    default:'outputs',
    description: 'File destination'
})
.check((argv, options)=> {
    if(argv.b < 1) {
        throw new Error('Base must be greater than 0');
    }
    if(argv.l < 1) {
        throw new Error('Limit must be greater than 0');
    }

    return true;
})
.parseSync()
