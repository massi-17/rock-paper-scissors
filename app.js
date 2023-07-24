//modal
const modalOverlay = document.getElementById('modal-overlay')
const rulesBtn = document.querySelector('.rules')
const closeBtn = document.getElementById('close')
const wrapper = document.getElementById('wrapper')

rulesBtn.addEventListener('click', (event) => {
	modalOverlay.style.display = 'block'
	wrapper.style.display = 'none'
})

closeBtn.addEventListener('click', (event) => {
	modalOverlay.style.display = 'none'
	wrapper.style.display = 'flex'
})

//game logic
//dom
const rock = document.getElementById('rock')
const paper = document.getElementById('paper')
const scissors = document.getElementById('scissors')
const triangle = document.querySelector('.bg-main')
const cpuContainer = document.querySelector('.container-cpu')
const cpu = document.getElementById('cpu')
const outline = document.querySelectorAll('.cpu-outline')
const topper = document.querySelector('.top')
//data
const handShapes = ['rock', 'paper', 'scissors']
let houseChoice = undefined
let housePick = undefined
//event listener
rock.addEventListener('click', getPicks)
paper.addEventListener('click', getPicks)
scissors.addEventListener('click', getPicks)

//function
function getCpuPick() {
	setTimeout(() => {
		houseChoice = getRandomHandShapes()
		cpu.classList.add(houseChoice)

		getWinner(houseChoice)
		getWinnerOutline()
	}, 1500)
}

function getRandomHandShapes() {
	housePick = Math.floor(Math.random() * 3)
	houseChoiceString = handShapes[housePick].toString()

	return houseChoiceString
}
let userChoice = undefined

function getPicks(e) {
	userChoice = e.target.id
	rock.style.display = userChoice == 'rock' ? 'block' : 'none'
	paper.style.display = userChoice == 'paper' ? 'block' : 'none'
	scissors.style.display = userChoice == 'scissors' ? 'block' : 'none'

	if (userChoice == 'paper') {
		outline[0].classList.remove('hidden')
	} else if (userChoice == 'scissors') {
		outline[1].classList.remove('hidden')
	} else if (userChoice == 'rock') {
		outline[2].classList.remove('hidden')
	}

	triangle.style.display = 'none'
	cpuContainer.style.display = 'flex'

	getCpuPick()
}

let winner = undefined

function getWinner(cpuChoice) {
	console.log(`housechoice: ${houseChoice}`)
	console.log(`userchoice: ${userChoice}`)

	if (userChoice == 'paper' && cpuChoice == 'rock') {
		paper.classList.add('winner-paper')
		winner = 'user'
	} else if (userChoice == 'rock' && cpuChoice == 'scissors') {
		rock.classList.add('winner-rock')
		winner = 'user'
	} else if (userChoice == 'scissors' && cpuChoice == 'paper') {
		scissors.classList.add('winner-scissors')
		winner = 'user'
	} else if (userChoice == 'rock' && cpuChoice == 'paper') {
		cpu.classList.add(`winner-${cpuChoice}`)
		winner = 'cpu'
	} else if (userChoice == 'scissors' && cpuChoice == 'rock') {
		cpu.classList.add(`winner-${cpuChoice}`)
		winner = 'cpu'
	} else if (userChoice == 'paper' && cpuChoice == 'scissors') {
		cpu.classList.add(`winner-${cpuChoice}`)
		winner = 'cpu'
	} else {
		console.log('pareggio')
		winner = 'pareggio'
	}

	if (winner == 'user') {
		addPoint()
	}
}

const resultContainer = document.querySelector('.result-container')
const result = document.getElementById('result')
const playAgainBtn = document.getElementById('play-again')

playAgainBtn.addEventListener('click', () => {
	location.reload()
})

function getWinnerOutline() {
	setTimeout(() => {
		playAgainBtn.style.visibility = 'visible'
		if (winner == 'cpu') {
			result.textContent = 'you lose'
		} else if (winner == 'user') {
			result.textContent = 'you win'
		} else {
			result.textContent = 'tie'
		}
	}, 1000)
}

//points managing
let savedPoints = localStorage.getItem('points')
const pointsCounter = document.getElementById('points')
let points = savedPoints || 0
pointsCounter.textContent = points

function addPoint() {
	points++
	pointsCounter.textContent = points
	localStorage.setItem('points', points)
}

const resetScoreBtn = document.querySelector('.reset')

resetScoreBtn.addEventListener('click', () => {
	localStorage.clear()
	pointsCounter.textContent = 0
})
