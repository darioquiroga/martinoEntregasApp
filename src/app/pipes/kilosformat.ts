import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'kilosFormat'
})
export class KilosFormat implements PipeTransform {
    transform(value: number,
        currencySign: string = ' KG',
        decimalLength: number = 0,
        chunkDelimiter: string = '.',
        decimalDelimiter:string = ',',
        chunkLength: number = 3): string {

        //value /= 100;

        var result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')'
        var num = value.toFixed(Math.max(0, ~~decimalLength));

        return (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter)+currencySign;
    }
}
