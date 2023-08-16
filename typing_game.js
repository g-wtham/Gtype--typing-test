//array of quotes//

const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
    ]

//empty array variable to store a quote//

let words = [];
let wordIndex = 0;

//getting a quote from an array of quotes randomly, then splitting the individual words and resetting the index of each word to 0. //

const quoteEle = document.getElementById('quote');
const messageEle = document.getElementById('message');
const typedEle = document.getElementById('typed-value');
const startBtn = document.getElementById('start');

startBtn.addEventListener('click', ()=>{

    const infoPara = document.getElementById('info-para')
    infoPara.remove();
    
    const quotesIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quotesIndex];

    const words = quote.split(' ');

    for(const word of words){
        const spanWords = document.createElement('span');
        spanWords.textContent = word + ' ';
        quoteEle.appendChild(spanWords);
    }

    quoteEle.childNodes[0].className = 'highlight-currentWord';

    messageEle.innerHTML = '';

    typedEle.innerHTML = ''; //setting the typing value to empty and focusing//

    typedEle.focus();

    startTime = new Date().getTime();

    //typing tracking part//

    typedEle.addEventListener('input', ()=> {
        const currentWord = words[wordIndex];
        const typedValue = typedEle.value;

        if (typedValue === currentWord && wordIndex === words.length-1){
            const elapsedTime = new Date().getTime() - startTime;
            const message = `Congrats! You finished in ${elapsedTime/1000} seconds!`;
            messageEle.innerText = message;
            quoteEle.remove();
            typedEle.remove();

            const endImg = document.getElementById('endImg')
            endImg.style.display = 'block';
        }

        else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord){
            
            wordIndex++;
            typedEle.value = '';

            for(const wordEle of quoteEle.childNodes){
                wordEle.className = ''; 
            }

            quoteEle.childNodes[wordIndex].className = 'highlight-currentWord';
        }

        else if (currentWord.startsWith(typedValue)){
            typedEle.className = '';
        } 

        else {
            typedEle.className = 'error';
        }
    });
});