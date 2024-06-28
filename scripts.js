async function translateText() {
    const inputText = document.getElementById('translate-input').value;
    try {
        const response = await fetch('https://libretranslate.de/translate', {
            method: 'POST',
            body: JSON.stringify({
                q: inputText,
                source: 'en',
                target: 'bn',
                format: 'text'
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        document.getElementById('translate-output').innerText = data.translatedText;
    } catch (error) {
        document.getElementById('translate-output').innerText = 'Error translating text.';
    }
}

async function checkGrammar() {
    const inputText = document.getElementById('grammar-input').value;
    try {
        const response = await fetch('https://api.languagetool.org/v2/check', {
            method: 'POST',
            body: new URLSearchParams({
                text: inputText,
                language: 'en-US'
            })
        });
        const data = await response.json();
        let output = inputText;
        data.matches.forEach(match => {
            output = output.replace(match.context.text, match.replacements[0].value);
        });
        document.getElementById('grammar-output').innerText = output;
    } catch (error) {
        document.getElementById('grammar-output').innerText = 'Error checking grammar.';
    }
}

function makeParagraph() {
    const inputText = document.getElementById('paragraph-input').value;
    // Simple text processing example
    const professionalParagraph = inputText.replace(/\b\w/g, char => char.toUpperCase()).concat('.'); // Capitalizes the first letter of each word and adds a period.
    document.getElementById('paragraph-output').innerText = professionalParagraph;
}

// Populate the vocabulary chart with 100 words
const vocabularyWords = [
    {english: "apple", bangla: "আপেল"},
    {english: "book", bangla: "বই"},
    // Add more words here
];

const tbody = document.querySelector('#vocabulary-chart tbody');
vocabularyWords.forEach(word => {
    const row = document.createElement('tr');
    const englishCell = document.createElement('td');
    const banglaCell = document.createElement('td');
    englishCell.textContent = word.english;
    banglaCell.textContent = word.bangla;
    row.appendChild(englishCell);
    row.appendChild(banglaCell);
    tbody.appendChild(row);
});