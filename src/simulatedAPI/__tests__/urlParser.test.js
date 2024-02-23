import {parseUrl} from "../urlParser";

describe('URL Parser tests', ()=>{
    it('should parse query params', () => {
        const url1 = '/rest/api/user?id=user_1';
        expect(parseUrl(url1)).toEqual({
            endpoint: '/rest/api/user',
            queryParams: {
                'id': ['user_1']
            }
        })

        const url2 = '/rest/api/user?id=user_1&id=user_2&dateFrom=12345&dateTo=7654';
        expect(parseUrl(url2)).toEqual({
            endpoint: '/rest/api/user',
            queryParams: {
                'id': ['user_1', 'user_2'],
                'dateFrom': ['12345'],
                'dateTo': ['7654']
            }
        })

        const url3 = '/rest/api/user';
        expect(parseUrl(url3)).toEqual({
            endpoint: '/rest/api/user',
            queryParams: {}
        })
    });
})