let selectedContact;

function showMyContacts() {
	const myContacts = document.getElementById('myContacts');
	myContacts.style.display = 'block';

	let contacts = listContacts();
	console.log(contacts);
	let html = '';

	contacts.map((contact) => {
		html += `<li>
								<div class="contact">
									<img src="/assets/${contact.image}" />
									<div class="contact__details">
										<span>${contact.name} ${contact.surname}</span>
										<a href="tel:${contact.phone}">${contact.phone}</a>
										<a href="mailto: ${contact.email}"> ${contact.email} </a>
									</div>
								</div>
								<div class="contact__more" onclick="showMenu(${contact.id});">
									<span class="material-symbols-outlined"> more_vert </span>
								</div>
							</li>  `;
		return html;
	});
	document.getElementById('mycontacts-list').innerHTML = html;
}
function hideMyContacts() {
	const myContacts = document.getElementById('myContacts');
	myContacts.style.display = 'none';
}

function showContactDetails() {
	const contactDetails = document.getElementById('contactDetails');
	contactDetails.style.display = 'block';
}

function hideContactsDetails() {
	const contactDetails = document.getElementById('contactDetails');
	contactDetails.style.display = 'block';
}

function showMenu(id) {
	document.querySelector('.contact__actions').classList.add('contact__actions--active');
	selectedContact = id;
}

function hideMenu() {
	document.querySelector('.contact__actions').classList.remove('contact__actions--active');
}

function deleteContact() {
	removeContact(selectedContact);
	showMyContacts();
}

//hide when you click outside
document.addEventListener('mouseup', function (e) {
	var buttons = document.querySelectorAll('.contact__more');
	buttons.forEach((button) => {
		if (!button.contains(e.target)) {
			document.querySelector('.contact__actions').classList.remove('contact__actions--active');
		}
	});
});

showMyContacts();
