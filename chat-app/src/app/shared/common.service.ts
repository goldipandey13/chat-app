
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class CommonService {
    isloggedInChanges: Subject<any> = new Subject<any>();

    constructor() { }

}
