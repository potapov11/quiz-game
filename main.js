const questions = [
	{
		question: "в каком году был основан Санкт-Петербург",
		answers: ["1991", "1365", "1887", "1703"],
		correct: 4,
	},
	{
		question: "в каком году был основан Тамбов?",
		answers: [
			"1345",
			"1636",
			"1887",
			"1911",
		],
		correct: 2,
	},
	{
		question: "в каком году был основан Москва?",
		answers: [
			"1147",
			"1376",
			"1478",
			"1765",
		],
		correct: 1,
	},
	{
		question: "У кого самые красивые глаза, приятный взгляд и модельная походка?",
		answers: ["У Нины"],
		correct: 1,
	},
];

//Переменные игры
let score = 0; //Кол-во правильных ответов
let questionIndex = 0; //Текущий вопрос


const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');


clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

//----------------------------------//
//Очищаем HTML

function clearPage() {
	headerContainer.innerHTML = '';
  listContainer.innerHTML = '';
}

//---------------------------------//
//Отобразить вопрос

function showQuestion() {
	console.log('showQuestion');

	//Вопрос

	const headerTemplate = `<h2 class="title">%title%</h2>`;

	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	//! Метод replace меняет одну подстроку на другую - в моем случае title на вопрос из массива
	//! Метод Replace не меняет исходную строчку - он возвращает новую строку, при необходимости ее надо записать в переменную

	headerContainer.innerHTML = title;	

	//Варианты ответов

	let answerNumber = 1;

	for (let answerText of questions[questionIndex]['answers']) {
		// console.log(answerNumber, answerText);
		const questionTemplate = 
		`<li>
			<label>
				<input value = "%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`;

		let answerHTML = questionTemplate
			.replace('%answer%', answerText)
			.replace("%number%", answerNumber);

		// console.log(answerHTML);


		listContainer.innerHTML += answerHTML;
		answerNumber++;
	}
}

function checkAnswer() {
	console.log('checkAnswer started');

	//Находим выбранную радиокнопку
	const checkedRadio = listContainer.querySelector("input[type = 'radio']:checked");

	//Если ответ не выбран - ничего не делаем, выходим из функции
		if (!checkedRadio) {
			submitBtn.blur();
			return;
	}

	//находим и прерреводим в число(parseInt) номер ответа пользователя
	const userAnswer = parseInt(checkedRadio.value);

	//Если ответил верно увеличиваем счет
	console.log(userAnswer, questions[questionIndex]['correct']);
	if(userAnswer == questions[questionIndex]['correct']) {
		score++;
	}

	if(questionIndex !== questions.length - 1) {
		console.log('Это не последний вопрос');
		questionIndex++;
		clearPage();
		showQuestion();
	} else {
		console.log('Это последний вопрос');
		clearPage();
		showResult();
	}

}

function showResult() {
	console.log('showresult started');
	console.log('score');

	const resultTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
	`;

	let title;
	let message;

	if(score === questions.length) {
		title = 'Поздравляем 💰💰💰';
		message = 'Вы ответили верно на все вопросы 👑👑👑';
	} else if ((score * 100) / questions.length) {
		title = 'Неплохой результат 🚀🚀🚀';
		message = 'Вы ответили верно на половину вопросов 👑👑👑';
	} else {
		title = 'Стоит постараться 🚀🚀🚀';
	}


	//Результат

	let result = `${score} из ${questions.length}`;

	//Финальный ответ подставляем данные в шаблон
	const finalMessage = resultTemplate
					.replace('%title%', title)
					.replace('%message%', message)
					.replace('%result%', result);

	headerContainer.innerHTML = finalMessage;

	submitBtn.innerText = 'Начать заново';
	submitBtn.onclick = ()=>{history.go()};

}
