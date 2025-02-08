// Function to load the saved entries from localStorage
function loadEntries() {
    const storedData = JSON.parse(localStorage.getItem('entries')) || [];
    storedData.forEach((entry, index) => {
        createCard(entry.name, entry.department, entry.batch, entry.quote, index);
    });
}
function createCard(name, department, batch, quote, index) {
    const card = document.createElement('div');
    card.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-xl', 'space-y-2');
    card.innerHTML = `
        <h3 class="font-semibold text-lg text-gray-800">${name}</h3>
        <p class="text-gray-600"><strong>Department:</strong> ${department}</p>
        <p class="text-gray-600"><strong>Batch:</strong> ${batch}</p>
        <p class="text-gray-600"><strong>Quote:</strong> "${quote}"</p>
        <button class="mt-2 text-red-500 hover:text-red-700" onclick="deleteEntry(${index})">Delete</button>
    `;

    document.getElementById('cardsContainer').appendChild(card);
}
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const batch = document.getElementById('batch').value;
    const quote = document.getElementById('quote').value;
    const newEntry = { name, department, batch, quote };
    const storedData = JSON.parse(localStorage.getItem('entries')) || [];
    storedData.push(newEntry);
    localStorage.setItem('entries', JSON.stringify(storedData));
    createCard(name, department, batch, quote, storedData.length - 1);
    document.getElementById('dataForm').reset();
});
function deleteEntry(index) {
    const storedData = JSON.parse(localStorage.getItem('entries')) || [];
    storedData.splice(index, 1);
    localStorage.setItem('entries', JSON.stringify(storedData));
    document.getElementById('cardsContainer').innerHTML = ''; 
    loadEntries();
}
loadEntries();
