var expect = require('expect');

var {generateMessage} = require('./message')

describe('generateMessage', () => {
	it('should generate the correct message', () =>{
		var from = 'Jen';
		var text = 'Some message';
		var message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message.from).toBe('Jen');
		expect(message.text).toBe('Some message');
	})
})