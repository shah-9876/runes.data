async function fetchRuneData() {
    const runeId = document.getElementById('runeIdInput').value.trim();

    if (!runeId) {
        alert('Please enter a Rune ID.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/runes/${runeId}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.code === 0 && data.data) {
            const runeData = data.data;

            document.getElementById('runeid').textContent = runeData.runeid;
            document.getElementById('rune').textContent = runeData.rune;
            document.getElementById('spacedRune').textContent = runeData.spacedRune;
            document.getElementById('number').textContent = runeData.number;
            document.getElementById('height').textContent = runeData.height;
            document.getElementById('symbol').textContent = runeData.symbol;
            document.getElementById('premine').textContent = runeData.premine;
            document.getElementById('supply').textContent = runeData.supply;
            document.getElementById('holders').textContent = runeData.holders;
            document.getElementById('burned').textContent = runeData.burned;
            document.getElementById('mints').textContent = runeData.mints;
            document.getElementById('mintable').textContent = runeData.mintable ? 'Yes' : 'No';
            document.getElementById('remaining').textContent = runeData.remaining;
            document.getElementById('divisibility').textContent = runeData.divisibility;
            document.getElementById('start').textContent = runeData.start !== null ? runeData.start : 'N/A';
            document.getElementById('end').textContent = runeData.end;
        } else {
            alert('Rune does not exist or data format is incorrect.');
        }
    } catch (error) {
        console.error('Error fetching rune data:', error);
        alert('Error fetching data. Please try again.');
    }
}
