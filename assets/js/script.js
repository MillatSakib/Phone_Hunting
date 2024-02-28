let allPhones;
const loadPhone = async (searchPhone, showAllState) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
    const data = await res.json();
    allPhones = data.data;
    displayPhone(allPhones, showAllState);
    console.log(searchPhone);
}

const displayPhone = (phones, showAllState) => {
    console.log(phones)
    const phoneContainer = document.getElementById('phoneContainer')
    phoneContainer.textContent = '';


    if (showAllState === 1) {

        document.getElementById('showMore').classList.remove("inline");
        document.getElementById('showMore').classList.add("hidden");

    }
    else if (phones.length < 13) {
        document.getElementById('showMore').classList.remove("inline");
        document.getElementById('showMore').classList.add("hidden");
    }
    else {
        phones = phones.slice(0, 12);
        document.getElementById('showMore').classList.remove("hidden");
        document.getElementById('showMore').classList.add("inline");
    }


    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card max-w-96 bg-gray-100 shadow-xl text-center my-2`;
        phoneCard.innerHTML = `<figure><img src="${phone.image}" alt="Shoes" class="mx-auto" /></figure>
        <div class="card-body">
            <h2 class="card-title mx-auto text-black font-bold">${phone.phone_name}</h2>
            <p class="text-black">There are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary text-white" onclick="details()">Buy Now</button>
            </div>
        </div>`

        phoneContainer.appendChild(phoneCard);
    });
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('bodySection').classList.remove('hidden');
}

function handleSearch() {
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('bodySection').classList.add('hidden');
    const searchField = document.getElementById('searchFeild');
    const searchText = searchField.value;
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.innerHTML = ''
    // console.log(searchText);
    loadPhone(searchText);
}

document.getElementById('showMore').addEventListener('click', () => {
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('bodySection').classList.add('hidden');
    displayPhone(allPhones, 1);
})
document.getElementById('search').addEventListener('click', handleSearch);

loadPhone('samsung');