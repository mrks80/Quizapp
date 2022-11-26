let questions = [{
    'question': 'Wie heißt der Bassist der Red Hot Chili Peppers?',
    'answer_1': 'Paul McCartney',
    'answer_2': 'Duff McKagan',
    'answer_3': 'Flea',
    'answer_4': 'Seal',
    'right_answer': 3,
},

{
    'question': "Wie heißt das legendäre Doppelalbum der kalifornischen Band Guns N' Roses?",
    'answer_1': 'Master of Puppets',
    'answer_2': 'Use your Illusion',
    'answer_3': 'Black Album',
    'answer_4': 'Appetite for Destruction',
    'right_answer': 2,
},

{
    'question': 'Welcher Sänger ersetzte Bon Scott bei AC/DC?',
    'answer_1': 'George Young',
    'answer_2': 'Axl Rose',
    'answer_3': 'James Hetfield',
    'answer_4': 'Brian Johnson',
    'right_answer': 4,
},

{
    'question': 'Wie heißt das Debütalbum der Grunge-Band Pearl Jam?',
    'answer_1': 'Nine',
    'answer_2': 'Ten',
    'answer_3': 'Eleven',
    'answer_4': 'Twelve',
    'right_answer': 2,
},

{
    'question': 'In welcher Band sang Jim Morrison?',
    'answer_1': 'The Doors',
    'answer_2': 'Nine Inch Nails',
    'answer_3': '3 Doors Down',
    'answer_4': 'The Cult',
    'right_answer': 1,
},

{
    'question': 'Bei welcher Band sprang Axl Rose vorübergehend als Sänger ein?',
    'answer_1': 'Metallica',
    'answer_2': 'Nirvana',
    'answer_3': 'AC/DC',
    'answer_4': 'Iron Maiden',
    'right_answer': 3,
},

{
    'question': 'Wer heißt mit bürgerlichem Namen Gordon Matthew Thomas Sumner?',
    'answer_1': 'Gene Simmons',
    'answer_2': 'Sting',
    'answer_3': 'Bruce Dickinson',
    'answer_4': 'Slash',
    'right_answer': 2,
}

];

let rightQuestions = 0;
let currentQuestion = 0;

let audio_success = new Audio('./audio/applause.mp3');
let audio_fail = new Audio('./audio/fail_horn.mp3');
let audio_endscreen = new Audio('./audio/endscreen_sound.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length; 
    showQuestion();
}

function showQuestion() {
    if (gameIsOver()) { 
        showEndscreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;  
}

function showEndscreen() {
    document.getElementById('end_screen').style = ``;
    document.getElementById('question_body').style = `display: none;`;
    document.getElementById('amount-of-questions').innerHTML = questions.length; 
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = './img/medal.png';
    audio_endscreen.play();
}

function musicOff() {
    audio_endscreen.currentTime = 0;
    audio_endscreen.pause();
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
}

function updateToNextQuestion() {

    let question = questions[currentQuestion];

    document.getElementById('question_number').innerHTML = currentQuestion + 1;
    document.getElementById('question_text').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) { 
        

        document.getElementById(selection).parentNode.classList.add('bg-success');

        audio_success.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audio_fail.play();
    }

    document.getElementById('next-button').disabled = false;
    document.getElementById('overlay').classList.remove('d-none');
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
    document.getElementById('next-button').disabled = true;
    resetButtons();
    document.getElementById('overlay').classList.add('d-none');
}

function resetButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-image').src = './img/background_card.jpg';
    document.getElementById('question_body').style = ``;
    document.getElementById('end_screen').style = `display: none;`;
    rightQuestions = 0;
    currentQuestion = 0;
    init();

    audio_endscreen.currentTime = 0;
    audio_endscreen.pause();
}