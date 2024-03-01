let trackShowAll = 0;
let currentPageProduct = 'a';
let allPhones;
let noItems;
const loadPhone = async (searchPhone, showAllState) => {
    trackShowAll = 0;
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


    // if (showAllState === 1) {

    //     document.getElementById('showMore').classList.remove("inline");
    //     document.getElementById('showMore').classList.add("hidden");

    // }
    document.getElementById('no_items').classList.add('hidden');


    if (phones.length === 0) {
        document.getElementById('no_items').classList.remove('hidden');
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('bodySection').classList.add('hidden');
        noItems = document.getElementById('no_items')
        noItems.innerHTML = `<div><img src="./assets/img/no_data_found.png" class="w-[70%] mx-auto mb-10"></div>
            <div class="font-extrabold text-3xl text-red-600 mb-6"> OOPS!!! No  items found!</div> `
        return;

    }
    else if (phones.length < 13) {
        document.getElementById('showMore').classList.remove("inline");
        document.getElementById('showMore').classList.add("hidden");

    }
    else {
        trackShowAll += 12;
        phones = phones.slice(0, trackShowAll);
        if (trackShowAll > phones.length) {
            document.getElementById('showMore').classList.add("hidden");
        } else {
            document.getElementById('showMore').classList.remove("hidden");
            document.getElementById('showMore').classList.add("inline");

        }
    }


    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card max-w-96 bg-gray-100 shadow-xl text-center my-2`;
        phoneCard.innerHTML = `<figure><img src="${phone.image}" alt="Shoes" class="mx-auto my-4" /></figure>
        <div class="card-body">
            <h2 class="card-title mx-auto text-black font-bold">${phone.phone_name}</h2>
            <p class="text-black">There are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions justify-end">
            <div><button class="btn btn-secondary text-white"
        onclick="my_modal_5.showModal()" id="next_btn">Buy Now</button></div>
                <div><button class="btn btn-primary text-white" onclick="handleShowDetail('${phone.slug}')">Show Details</button></div>
            </div>
        </div>`

        phoneContainer.appendChild(phoneCard);
    });
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('bodySection').classList.remove('hidden');
    }, 100)


}

function handleSearch() {
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('bodySection').classList.add('hidden');
    const searchField = document.getElementById('searchFeild');
    let searchText = searchField.value;
    if (searchText === '') {
        searchText = currentPageProduct;
        console.log(searchText)
    }
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.innerHTML = ''
    // console.log(searchText);
    loadPhone(searchText);
}

document.getElementById('showMore').addEventListener('click', () => {
    document.getElementById('loader').classList.remove('hidden');
    // document.getElementById('bodySection').classList.add('hidden');
    displayPhone(allPhones, 1);
})



document.getElementById('search').addEventListener('click', handleSearch);

// document.getElementById('searchFeild').addEventListener("keypress", function (e) {
//     // Check if the keycode is 13 (Enter key)
//     if (e.keyCode === 13) {
//         console.log("presed enter");
//         handleSearch();
//     }
// });


document.getElementById('searchFeild').addEventListener("keypress", function (e) {
    // Check if the keycode is 13 (Enter key)
    if (e.key === 'Enter') {
        console.log("presed enter");
        handleSearch();
    }
});


const handleShowDetail = async (id) => {
    console.log('Clicked show details', id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `<img src="${phone.image}" alt=""/>
    <p><sapn>Storage: </sapn>${phone.mainFeatures?.storage}</p>
    <p><sapn>GPS: </sapn>${phone.mainFeatures?.storage}</p>
    `
    show_details_modal.showModal();
}

loadPhone(currentPageProduct);

