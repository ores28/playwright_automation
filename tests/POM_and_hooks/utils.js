//generate random usernname
function generateUsername() {
    const name = ['Bhumi', 'Sostika', 'Bigyan', 'Kritika', 'Bibek', 'Sulav'];
    return name[Math.floor(Math.random() * name.length)];
}

//generate random last name
function generateLastName() {
    const name = ['Shrestha', 'Sharma', 'Gurung', 'Thapa', 'Karki', 'Rai'];
    return name[Math.floor(Math.random() * name.length)];
}

//generate random password
function generatePassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 6; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

//generate random email
function generateEmail() {
    const domains = ['example.com', 'test.com', 'demo.com'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)]; // Randomly select a domain from the list eg kritika28@example.com
    return `${generateUsername()}${Math.floor(Math.random() * 1000)}@${randomDomain}`; // Generate a random email address using the username and a random number to ensure uniqueness
}

//generate day function
function generateDay() {
    return Math.floor(Math.random() * 28) + 1;
}

//generate month function
function generateMonth() {
    return Math.floor(Math.random() * 12) + 1;
}   

//generate year function
function generateYear() {
    return Math.floor(Math.random() * (2000 - 1950 + 1)) + 1950;
}

//generate random company name
function generateCompanyName() {
    const companies = ['Cloudmandap', 'TechWorld', 'GlobalSolutions', 'InnovateX', 'CreativeLabs'];
    return companies[Math.floor(Math.random() * companies.length)];
}

//generate random address
function generateAddress() {
    const addresses = ['123 Main St', '456 Oak Ave', '789 Pine Rd', '321 Elm St', '654 Maple Dr'];
    return addresses[Math.floor(Math.random() * addresses.length)];
}

//generate random city, state, country can be added similarly
function generateCity() {
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
    return cities[Math.floor(Math.random() * cities.length)];
}

function generateState() {
    const states = ['California', 'Texas', 'Florida', 'New York', 'Pennsylvania'];
    return states[Math.floor(Math.random() * states.length)];
}

function generateCountry() {
    const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany'];
    return countries[Math.floor(Math.random() * countries.length)];
}

//generate random zipcode
function generateZipcode() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}
//generate random phone number
function generatePhone_number() {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

// function generateUserData() {
//     return {
//         name: generateUsername(),
//         email: generateEmail(),
//         password: generatePassword(),
//         day: generateDay().toString(),
//         month: generateMonth().toString(),
//         year: generateYear().toString(),
//         firstName: generateUsername(),
//         lastName: generateLastName(),
//         company: generateCompanyName(),
//         address: generateAddress(),
//         state: generateState(),
//         city: generateCity(),
//         zipcode: generateZipcode(),
//         mobile: generatePhone_number()
//     };
// }


module.exports = { generateUsername, generateLastName, generatePassword, generateEmail, 
    generateDay, generateMonth, generateYear, generateCompanyName, generateAddress, generateCity, 
    generateState, generateCountry, generateZipcode, generatePhone_number};
