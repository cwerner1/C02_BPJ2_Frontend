import {TestBed} from '@angular/core/testing';

import {WohnungService} from './wohnung.service';

describe('WohnungService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: WohnungService = TestBed.get(WohnungService);
        expect(service).toBeTruthy();
    });
});
