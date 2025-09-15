const greetingMessage = document.getElementById('greeting-message');
const greetingImage = document.getElementById('greeting-image');
const outputDiv = document.getElementById('output');
const cardContainer = document.querySelector('.card-container');
const controlButtons = document.querySelectorAll('.controls button');

greetingMessage.textContent = 'This is <b> plain text </b>!';
console.log('textContent demo:', greetingMessage.textContent);
outputDiv.innerHTML = 'This is <b> bold HTML </b>!';
console.log('innerHTML demo:', outputDiv.innerHTML);

function setGreetingSafe(text) {
	greetingMessage.textContent = text;
	console.log('Greeting safely set to:', text);
}
function setGreetingHTML(html) {
	greetingMessage.innerHTML = html;
	console.log('Greeting HTML set to:', html);
}

function setImage(src, alt = '', title = '') {
	greetingImage.setAttribute('src', src);
	greetingImage.setAttribute('alt', alt);
	greetingImage.setAttribute('title', title);
	console.log('Image src set to:', src);
	console.log('Image alt set to:', alt);
	console.log('Image title set to:', title);
}
function removeImageTitle() {
	greetingImage.removeAttribute('title');
	console.log('Image title attribute removed');
}

const greetings = [
	{
		message: 'Happy Birthday!',
		html: 'Happy <b>Birthday</b>!',
		img: 'https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg',
		alt: 'Birthday Cake',
		title: 'Birthday Greeting'
	},
	{
		message: 'Happy Holidays!',
		html: 'Happy <i>Holidays</i>!',
		img: 'https://images.pexels.com/photos/716738/pexels-photo-716738.jpeg',
		alt: 'Holiday Scene',
		title: 'Holiday Greeting'
	},
	{
		message: 'Thank You!',
		html: '<span style="color:var(--jungle-accent)">Thank You!</span>',
		img: 'https://images.pexels.com/photos/2072165/pexels-photo-2072165.jpeg',
		alt: 'Thank You Card',
		title: 'Thank You Greeting'
	},
	{
		message: 'Good Morning!',
		html: 'Good <b>Morning</b>!',
		img: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
		alt: 'Sunrise',
		title: 'Morning Greeting'
	},
	{
		message: 'Good Night!',
		html: 'Good <b>Night</b>!',
		img: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg',
		alt: 'Night Sky',
		title: 'Night Greeting'
	}
];

function changeGreeting(index) {
	const g = greetings[index];
	setGreetingHTML(g.html);
	setImage(g.img, g.alt, g.title);
	outputDiv.textContent = g.message;
	console.log('Greeting changed to:', g);
}

function randomGreeting() {
	const idx = Math.floor(Math.random() * greetings.length);
	changeGreeting(idx);
	console.log('Random greeting triggered');
}

function personalizeGreeting() {
	let name = prompt('Enter your name:');
	if (name) {
		setGreetingHTML(`Hello, <b>${name}</b>! 🌿`);
		setImage('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', 'Jungle', 'Personalized Greeting');
		outputDiv.textContent = `Personalized greeting for ${name}`;
		console.log('Personalized greeting for:', name);
	} else {
		outputDiv.textContent = 'No name entered.';
		console.log('Personalization cancelled');
	}
}

document.getElementById('btn-hello').onclick = () => changeGreeting(0);
document.getElementById('btn-good-morning').onclick = () => changeGreeting(3);
document.getElementById('btn-good-night').onclick = () => changeGreeting(4);

const btnRandom = document.createElement('button');
btnRandom.textContent = 'Random Greeting';
btnRandom.onclick = randomGreeting;
document.querySelector('.controls').appendChild(btnRandom);

const btnPersonalize = document.createElement('button');
btnPersonalize.textContent = 'Personalize';
btnPersonalize.onclick = personalizeGreeting;
document.querySelector('.controls').appendChild(btnPersonalize);

// Initial greeting
changeGreeting(0);

