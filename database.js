let bd = {};
if (localStorage.getItem('bd')) bd = JSON.parse(localStorage.getItem('bd'));


function addContact(contact) {
	console.log('addContact();');
	console.log(contact);
	if (!contact) throw new Error('Contact is required');
	if (!contact.email) throw new Error('Email is required');
	if (!contact.name) throw new Error('Name is required');
	if (!contact.surname) throw new Error('Surname is required');
	if (!contact.phone) throw new Error('Phone is required');
	
	contact.id = Date.now();
	bd[contact.id] = contact;
	localStorage.setItem('bd', JSON.stringify(bd));
	return contact;
}

function updateContact(id, data) {
	console.log(`updateContact(${id})`);
	bd[contact.email] = data;
	bd[contact.name] = data;
	bd[contact.phone] = data;
	bd[contact.surname] = data;
}

function removeContact(id) {
	console.log(`removeContact(${id});`);

	if (!id) throw new Error('Missing error');
	delete bd[id];
	localStorage.setItem('bd', JSON.stringify(bd));
}

function listContacts(query) {
	console.log('listContacts()');

	let returnContacts = [];
	for (let id in bd) {
		returnContacts.push(bd[id]);
	}
	return returnContacts;
}
