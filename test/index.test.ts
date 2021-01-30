import { assert } from 'chai'
import { secureElementManager } from '../lib/index'

suite('Functional', () => {
    suite('#secureElementManager', () => {
        test('should return `Hello world!`', () => {
            assert.isNotNull(secureElementManager)
            //assert.isTrue(secureElementManager instanceof SecureElementManager);
        })
    })
})
