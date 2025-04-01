// const getString = window.location.search;
// console.log(getString);

const myInfo = new URLSearchParams(window.location.search);
console.log(myInfo);

console.log(myInfo.get('first'))
console.log(myInfo.get('last'))
console.log(myInfo.get('ordinance'))
console.log(myInfo.get('date'))
console.log(myInfo.get('location'))
console.log(myInfo.get('phone'))
console.log(myInfo.get('email'))

document.querySelector('#user-info').innerHTML = `
<p>Appointment for ${myInfo.get('first')} ${myInfo.get('last')}</p>
<p>Proxy: ${myInfo.get('ordinance')} on the date: ${myInfo.get('date')} in ${myInfo.get('location')} Temple</p>
<p>Your phone: ${myInfo.get('phone')}</p>
<p>Your email: ${myInfo.get('email')}</p>

`
