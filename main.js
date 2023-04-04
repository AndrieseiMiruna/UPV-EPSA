let selectedContact;

function showMyContacts() {
	const myContacts = document.getElementById('myContacts');
	myContacts.style.display = 'block';

	let contacts = listContacts();
	console.log(contacts);

	fillContactsDOM(contacts);
}

function fillContactsDOM(contacts) {
	let html = '';
	contacts.map((contact) => {
		let imageSrc = 'assets/default-image.png';

		if (contact.image && typeof contact.image !== 'undefined') {
			imageSrc = contact.image;
		}
		html += `<li>
								<div class="contact">
									<img src="${imageSrc}" />
									<div class="contact__details">
										<span>${contact.name ? contact.name : ''} ${contact.surname ? contact.surname : ''}</span>
										<a href="tel:${contact.phone ? contact.phone : ''}">${contact.phone ? contact.phone : ''}</a>
										<a href="mailto: ${contact.email ? contact.email : ''}">${contact.email ? contact.email : ''} </a>
									</div>
								</div>
								<div class="contact__more" onclick="showMenu(${contact.id ? contact.id : 000});">
									<span class="material-symbols-outlined"> more_vert </span>
								</div>
							</li>  `;
		return html;
	});
	document.getElementById('mycontacts-list').innerHTML = html;
}

async function getInputsAddContact() {
	if (document.getElementById('contactDetails').dataset.type === "add") {
		let contact = {};
		contact.email = document.getElementById('email').value;
		contact.surname = document.getElementById('surname').value;
		contact.name = document.getElementById('name').value;
		contact.phone = document.getElementById('phone').value;

		const inputElement = document.getElementById('picture');
		const file = inputElement.files[0];

		if (!file) {
			addContact(contact);
			return;
		}

		const formData = new FormData();
		formData.append('upload_preset', 'uggybj0b');
		formData.append('file', file);

		try {
			const response = await fetch('https://api.cloudinary.com/v1_1/dyeuh8mxt/image/upload', {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();
			contact.image = data.url;
			console.log('Image uploaded:', data.url);
		} catch (error) {
			console.error('Upload error:', error);
		}

		addContact(contact);
		showMyContactsScreen();
	}
	else {
		editContact()
	}
}

function showMyContactsScreen() {
	const contactDetails = document.getElementById('contactDetails');
	const myContacts = document.getElementById('myContacts');
	contactDetails.style.display = 'none';
	myContacts.style.display = 'block';
	showMyContacts();
}

function showContactDetailsScreenForEditing() {
	generalContactDetailsScreen();

	//precomplete with old values
	const oldData = JSON.parse(localStorage.getItem('bd'));
	console.log(typeof oldData);
	const selectedContactData = oldData[selectedContact];
	console.log(selectedContactData);
	document.getElementById('email').value = selectedContactData.email;
	document.getElementById('surname').value = selectedContactData.surname;
	document.getElementById('name').value = selectedContactData.name;
	document.getElementById('phone').value = selectedContactData.phone;

	//add dataset for the next step
	const contactDetails = document.getElementById('contactDetails');
	contactDetails.dataset.type = 'edit';
}

function showContactDetailsScreen() {
	generalContactDetailsScreen();
	const contactDetails = document.getElementById('contactDetails');
	contactDetails.dataset.type = "add";
	document.getElementById('email').value = '';
	document.getElementById('surname').value = '';
	document.getElementById('name').value = '';
	document.getElementById('phone').value = '';
}

function generalContactDetailsScreen() {
	const contactDetails = document.getElementById('contactDetails');
	const myContacts = document.getElementById('myContacts');
	contactDetails.style.display = 'block';
	myContacts.style.display = 'none';
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

async function editContact() {
	console.log('editContact')
	console.log(selectedContact);

	const updatedContact = {};
	updatedContact.email = document.getElementById('email').value;
	updatedContact.surname = document.getElementById('surname').value;
	updatedContact.name = document.getElementById('name').value;
	updatedContact.phone = document.getElementById('phone').value;

	updateContact(selectedContact, updatedContact);
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


function filterContacts(searchText) {
	let contacts = listContacts();

	const filteredContacts = contacts.filter((contact) => {
		const name = contact.name.toLowerCase();
		const email = contact.email.toLowerCase();
		const searchTextLowerCase = searchText.toLowerCase();
		return name.includes(searchTextLowerCase) || email.includes(searchTextLowerCase);
	});
	return filteredContacts;

}

document.getElementById('search').addEventListener('keyup', (event) => {
	const searchText = event.target.value;
	filterContacts(searchText);
	fillContactsDOM(filterContacts(searchText));
});


function printContacts() {
	let contacts = listContacts();
	const printWindow = window.open('', '', 'height=600,width=800');
	printWindow.document.write(
		`<html>
      <head>
        <title style="font-family: Arial, sans-serif;">BMAn- SizeX Order #212111</title>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            text-align: left;
            padding: 8px;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            ${contacts
			.map((contact) => {
				return `<tr>
                <td>${contact.name ? contact.name : ''} </td>
                <td>${contact.surname ? contact.surname : ''}</td>
                <td>${contact.phone ? contact.phone : ''}</td>
                <td>${contact.email ? contact.email : ''}</td>
              </tr>`;
			})
			.join('')}
          </tbody>
        </table>
      </body>
    </html>`
	);
	printWindow.document.close();
	printWindow.print();
}

showMyContacts();
