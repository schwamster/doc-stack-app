import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mapIterator', pure: false })
export class MapIteratorPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value).map(key => value[key]);
    }
}