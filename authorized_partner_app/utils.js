//generate random usernname
function generateUsername() {
    const name = ['Hari', 'Ram', 'Mary', 'John', 'Harry', 'Mike'];
    return name[Math.floor(Math.random() * name.length)];
}

//generate random last name
function generateLastName() {
    const name = ['Shrestha', 'Sharma', 'Gurung', 'Thapa', 'Karki', 'Rai'];
    return name[Math.floor(Math.random() * name.length)];
}

//generate random email
function generateEmail(){
    const email = ['gmail.com', 'yahoo.com', 'yopmail.com', 'outmail.com']
    const randomEmail = email[Math.floor(Math.random() * email.length)]; 
    const randomNumber = Math.floor(Math.random() * 100000); 
    return `${generateUsername()}${randomNumber}@${randomEmail}`; 
}

//generate random valid phone number
function generatePhoneNumber() {
    return `98${Math.floor(10000000 + Math.random() * 90000000)}`;
}

//generate random password
function generatePassword(length = 8) {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*";

    const allChars = uppercase + lowercase + numbers + special;

    let password =
        uppercase[Math.floor(Math.random() * uppercase.length)] +
        lowercase[Math.floor(Math.random() * lowercase.length)] +
        numbers[Math.floor(Math.random() * numbers.length)] +
        special[Math.floor(Math.random() * special.length)];

    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    return password;
}

//generate random agency name, role, email, website, and address
function generateAgencyName() {
    const agencyNames = ['Tech Solutions', 'Creative Minds', 'InnovateX', 'Global Ventures', 'NextGen Agency'];
    return agencyNames[Math.floor(Math.random() * agencyNames.length)];
}

function generateRole() {
    const roles = ['Developer', 'Designer', 'Manager', 'Analyst', 'Consultant'];
    return roles[Math.floor(Math.random() * roles.length)];
}

function generateAgencyEmail() {
    const emailDomains = ['agency.com', 'business.org', 'enterprise.net', 'company.co'];
    const randomDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
    const randomNumber = Math.floor(Math.random() * 100000);
    return `${generateAgencyName().replace(/\s+/g, '').toLowerCase()}${randomNumber}@${randomDomain}`; 
}

function generateWebsite() {
    const websites = ['www.techsolutions.com', 'www.creativeminds.org', 'www.innovatex.net', 'www.globalventures.co', 'www.nextgenagency.io'];
    return websites[Math.floor(Math.random() * websites.length)];
}

function generateAddress() {
    const addresses = [
        'Kalanki, Kathmandu, Nepal',
        'Maharajgunj, Kathmandu, Nepal',
        'Bagbazar, Kathmandu, Nepal',
        'Balaju, Kathmandu, Nepal',
        'Syambhu, Kathmandu, Nepal',
    ];
    return addresses[Math.floor(Math.random() * addresses.length)]; 
}


module.exports = { generateUsername, generateLastName, generateEmail, generatePhoneNumber, generatePassword, generateAgencyName, generateRole, generateAgencyEmail, generateWebsite, generateAddress };