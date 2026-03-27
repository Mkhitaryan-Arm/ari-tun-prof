// 1. Տուրերի տվյալների բազա (Array of Objects)
const tours = [
    { id: 1, title: "Հին Գյումրի", marz: "shirak", price: "12,000֏", img: "https://images.unsplash.com/photo-1621253457224-11885b549320?w=400" },
    { id: 2, title: "Լոռվա հրաշքներ", marz: "lori", price: "15,000֏", img: "https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?w=400" },
    { id: 3, title: "Դիլիջան և Պարզ Լիճ", marz: "tavush", price: "10,000֏", img: "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?w=400" },
    { id: 4, title: "Տաթևի Վերածնունդ", marz: "syunik", price: "20,000֏", img: "https://images.unsplash.com/photo-1580665494432-8df7d9834220?w=400" },
    { id: 5, title: "Լաստիվեր Էքստրիմ", marz: "tavush", price: "13,000֏", img: "https://images.unsplash.com/photo-1544923246-77307dd654ca?w=400" }
];

// 2. Ֆունկցիա՝ Տուրերը էջում ցուցադրելու համար
function displayTours(filteredTours) {
    const container = document.querySelector('.tour-container');
    container.innerHTML = ''; // Մաքրել հինը

    filteredTours.forEach(tour => {
        const card = `
            <div class="tour-card" onclick="openBooking('${tour.title}')">
                <img src="${tour.img}" alt="${tour.title}">
                <div class="card-info">
                    <h3>${tour.title}</h3>
                    <p>Արժեքը: <strong>${tour.price}</strong></p>
                    <button class="btn-book">Ամրագրել</button>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// 3. Ֆիլտրացիայի տրամաբանություն
function filterTours(category) {
    if (category === 'all') {
        displayTours(tours);
    } else {
        const filtered = tours.filter(t => t.marz === category);
        displayTours(filtered);
    }
}

// 4. Ամրագրման Modal (Պատուհան)
function openBooking(tourName) {
    const modal = document.createElement('div');
    modal.id = 'bookingModal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>Ամրագրում: ${tourName}</h2>
            <form id="bookForm">
                <input type="text" id="userName" placeholder="Ձեր անունը" required>
                <input type="tel" id="userPhone" placeholder="Հեռախոսահամար" required>
                <button type="submit">Ուղարկել հայտը</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // Form submission
    document.getElementById('bookForm').onsubmit = function(e) {
        e.preventDefault();
        const name = document.getElementById('userName').value;
        alert(`Շնորհակալություն, ${name}։ Մենք կկապնվենք Ձեզ հետ շուտով!`);
        modal.remove();
    };
}

// Ինիցիալիզացիա (երբ էջը բացվում է)
document.addEventListener('DOMContentLoaded', () => {
    displayTours(tours);
});

// Մարզերի մանրամասն տվյալները
const marzDetails = {
    lori: {
        title: "Բացահայտիր Լոռին",
        description: "Լոռին Հայաստանի ամենականաչ մարզն է: Այստեղ են գտնվում ՅՈՒՆԵՍԿՕ-ի ժառանգություն հանդիսացող Հաղպատի և Սանահինի վանքերը:",
        places: ["Հաղպատ", "Սանահին", "Դսեղ (Թումանյանի տուն-թանգարան)", "Օձուն"],
        image: "https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?w=800"
    },
    shirak: {
        title: "Գյումրի՝ Արհեստների և Արվեստների քաղաք",
        description: "Շիրակի մարզը հայտնի է իր սև տուֆով կառուցված յուրահատուկ ճարտարապետությամբ և հումորով:",
        places: ["Վարդանանց հրապարակ", "Յոթ Վերք եկեղեցի", "Սև Բերդ", "Մհեր Մկրտչյանի թանգարան"],
        image: "https://images.unsplash.com/photo-1621253457224-11885b549320?w=800"
    }
    // Կարող ես ավելացնել Տավուշը և Սյունիքը նույն ձևով
};

function showMarzDetails(marzKey) {
    const data = marzDetails[marzKey];
    if (!data) return;

    // Թաքցնել գլխավոր էջը և տուրերը
    document.getElementById('home').classList.add('hidden');
    document.getElementById('tours').classList.add('hidden');
    document.querySelector('.filter-buttons').classList.add('hidden');

    // Ցուցադրել մանրամասն էջը
    const detailsPage = document.getElementById('details-page');
    const content = document.getElementById('details-content');
    
    detailsPage.classList.remove('hidden');
    
    content.innerHTML = `
        <div class="marz-info">
            <img src="${data.image}" alt="${data.title}" class="full-img">
            <h1>${data.title}</h1>
            <p class="desc">${data.description}</p>
            <h3>Տեսարժան վայրեր՝</h3>
            <ul>
                ${data.places.map(place => `<li>📍 ${place}</li>`).join('')}
            </ul>
            <button class="btn-book-now" onclick="openBooking('${data.title}')">Ամրագրել հիմա</button>
        </div>
    `;
    window.scrollTo(0, 0);
}

function goBack() {
    document.getElementById('details-page').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
    document.getElementById('tours').classList.remove('hidden');
    document.querySelector('.filter-buttons').classList.remove('hidden');
}

// Փոխիր նախորդ displayTours ֆունկցիայի մեջ card-ի onclick-ը
// card.onclick = () => showMarzDetails(tour.marz);