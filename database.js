let contacts = [
	{
		id: '1111112222222221',
		name: 'John',
		surname: 'Doe',
		email: 'joe@gmail.com',
		phone: '123456789',
		image: 'avatar.png',
	},
];

function addContact(contact) {
	console.log('addContact();');

	if (!contact) throw new Error('Contact is required');
	if (!contact.email) throw new Error('Email is required');
	if (!contact.name) throw new Error('Name is required');
	if (!contact.surname) throw new Error('Surname is required');
	if (!contact.phone) throw new Error('Phone is required');

	contact.id = Date.now();
	contact[contact.id] = contact;
	contacts.push(contact);
	return contact;
}

function updateContact(id, data) {}

function removeContact(id) {
	console.log(`removeContact(${id});`);
	if (!id) throw new Error('Id is required');
	// console.log(`removeContact(${id});`);
	// delete contacts[id];
	contacts.pop([id]);
}

function listContacts(query) {
	console.log('listContacts()');

	let ret = [];
	for (let id in contacts) {
		ret.push(contacts[id]);
	}

	return ret;
}
