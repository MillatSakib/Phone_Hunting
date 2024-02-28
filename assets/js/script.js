


const loadPhone = async (searchPhone) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones);
    console.log(searchPhone);
}

const displayPhone = phones => {
    console.log(phones)
    const phoneContainer = document.getElementById('phoneContainer')
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

}

function handleSearch() {
    const searchField = document.getElementById('searchFeild');
    const searchText = searchField.value;
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.innerHTML = ''
    // console.log(searchText);
    loadPhone(searchText);
}








document.getElementById('search').addEventListener('click', handleSearch);

loadPhone('samsung');