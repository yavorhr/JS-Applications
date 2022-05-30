async function lockedProfile() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const response = await fetch(url);
    const data = await response.json();
    const profiles = Object.values(data);

    const main = document.getElementById('main');
    main.innerHTML = '';

    /*
age: 31
email: "john@users.bg"
username: "John"
    */
    for (const profile of profiles) {
        const divProfile = document.createElement('divProfile');
        divProfile.className = "profile";

        const img = document.createElement('img');
        img.setAttribute("src", "./iconProfile2.png");
        img.setAttribute = ("class", "userIcon");
        divProfile.appendChild(img);

        const labelLock = document.createElement('label');
        labelLock.textContent = 'Lock';
        divProfile.appendChild(labelLock);

        const lockCheckBox = document.createElement('input');
        lockCheckBox.setAttribute("type", "radio");
        lockCheckBox.setAttribute("name", `${profile.username}Locked`);
        lockCheckBox.setAttribute("value", "lock");
        lockCheckBox.checked = true;
        //Add eventListener of Lock button - if locked->show more button is disabled;
        lockCheckBox.addEventListener('change', (event) => {
            event.target.parentElement.querySelector('button').disabled = true;
        })
        divProfile.appendChild(lockCheckBox);

        const labelUnlock = document.createElement('label');
        labelUnlock.textContent = 'Unlock';
        divProfile.appendChild(labelUnlock);

        const unLockCheckBox = document.createElement('input');
        unLockCheckBox.setAttribute("type", "radio");
        unLockCheckBox.setAttribute("name", `${profile.username}Locked`);
        unLockCheckBox.setAttribute("value", "unlock");
        unLockCheckBox.checked = true;
        //Add eventListener -> if unlocked, show more button is enabled
        unLockCheckBox.addEventListener('change', (event) => {
            event.target.parentElement.querySelector('button').disabled = false;
        })
        divProfile.appendChild(unLockCheckBox);

        divProfile.appendChild(document.createElement('hr'));

        const labelUsername = document.createElement('label');
        labelUsername.textContent = 'Username';
        divProfile.appendChild(labelUsername);

        const inputUserName = document.createElement('input');
        inputUserName.setAttribute("type", "text");
        inputUserName.setAttribute("name", `${profile.username}Username`);
        inputUserName.setAttribute("value", `${profile.username}`);
        inputUserName.disabled = true;
        inputUserName.readOnly = true;
        divProfile.appendChild(inputUserName);

        const hiddenInfoDiv = document.createElement('div');
        hiddenInfoDiv.setAttribute('id', `${profile.username}`);

        hiddenInfoDiv.appendChild(document.createElement('hr'));

        const labelEMail = document.createElement('label');
        labelEMail.textContent = "Email";
        hiddenInfoDiv.appendChild(labelEMail);

        const inputEmail = document.createElement('input');
        inputEmail.setAttribute("type", "email");
        inputEmail.setAttribute("name", `${profile.email}Email`);
        inputEmail.setAttribute("value", profile.email);
        inputEmail.disabled = true;
        inputEmail.readOnly = true;
        hiddenInfoDiv.appendChild(inputEmail);

        const labelAge = document.createElement('label');
        labelAge.textContent = "Age";
        hiddenInfoDiv.appendChild(labelAge);

        const inputAge = document.createElement('input');
        inputAge.setAttribute("type", "email");
        inputAge.setAttribute("name", `${profile.age}Age`);
        inputAge.setAttribute("value", profile.age);
        inputAge.disabled = true;
        inputAge.readOnly = true;
        hiddenInfoDiv.appendChild(inputAge);

        divProfile.appendChild(hiddenInfoDiv);
        hiddenInfoDiv.style.display = 'none';

        const showMoreBtn = document.createElement('button');
        showMoreBtn.textContent = 'Show more'

        showMoreBtn.addEventListener('click', (event) => {
            if (hiddenInfoDiv.style.display == 'block') {
                hiddenInfoDiv.style.display = 'none';
                event.target.textContent = "Show more"
            } else {
                hiddenInfoDiv.style.display = "block";
                hiddenInfoDiv.style.display = "Hide it";
            }
        });

        divProfile.appendChild(showMoreBtn);
        main.appendChild(divProfile);

    }

}