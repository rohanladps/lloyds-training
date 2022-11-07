import {of} from 'rxjs';
import {concatWith} from 'rxjs/operators'

const observable1 = of(1, 2, 3);
const observable2 = of(4, 5, 6);
const source = observable1.pipe(concatWith(observable2));
source.subscribe(x => console.log(x));