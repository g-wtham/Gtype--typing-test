//empty array variable to store a quote//
quote=[];
let words = [];
let wordIndex = 0;

//getting a quote from an array of quotes randomly, then splitting the individual words and resetting the index of each word to 0. //

const quoteEle = document.getElementById('quote');
const messageEle = document.getElementById('message');
const typedEle = document.getElementById('typed-value');
const startBtn = document.getElementById('start');
const infoPara = document.getElementById('info-para')

function startGame() {
    apiURL = 'https://type.fit/api/quotes';

    fetch(apiURL).then(response=>response.json()).then(data=>{

        const quotesIndex = Math.floor(Math.random() * data.length);
        const quote = data[quotesIndex].text;

        if (infoPara) {
            infoPara.remove();
        }

        words = quote.split(' ');

        for (const word of words) {
            const spanWords = document.createElement('span');
            spanWords.textContent = word + ' ';
            quoteEle.appendChild(spanWords);
        }

        quoteEle.childNodes[0].className = 'highlight-currentWord';

        messageEle.innerHTML = '';

        typedEle.innerHTML = '';
        //setting the typing value to empty and focusing//

        typedEle.focus();

        startTime = new Date().getTime();

    }
    )
    //typing tracking part//

    typedEle.addEventListener('input', ()=>{
        const currentWord = words[wordIndex];
        const typedValue = typedEle.value;

        if (typedValue === currentWord && wordIndex === words.length - 1) {
            const elapsedTime = new Date().getTime() - startTime;
            const message = `Congrats! You finished in ${elapsedTime / 1000} seconds!`;
            messageEle.innerText = message;
            quoteEle.remove();
            typedEle.blur();
            typedEle.remove();

            const endImg = document.getElementById('endImg');
            endImg.style.display = 'block';

            const newLine = document.createElement('br');
            messageEle.appendChild(newLine);

            const tryAgainBtn = document.createElement('button');
            tryAgainBtn.textContent = 'Try Again!?';
            messageEle.appendChild(tryAgainBtn);
            tryAgainBtn.addEventListener('click', ()=>{
                location.reload();
            }
            );

        } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {

            wordIndex++;
            typedEle.value = '';

            for (const wordEle of quoteEle.childNodes) {
                wordEle.className = '';
            }

            quoteEle.childNodes[wordIndex].className = 'highlight-currentWord';
        } else if (currentWord.startsWith(typedValue)) {
            typedEle.className = '';
        } else {
            typedEle.className = 'error';
        }
    }
    );
}

startBtn.addEventListener('click', startGame)
