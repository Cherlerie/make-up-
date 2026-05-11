const searchInput = document.querySelector('.search-box input');
const categoryFilter = document.querySelector('.form-select');
const tableRows = document.querySelectorAll('.inventory-table tbody tr');

if(searchInput){

    searchInput.addEventListener('keyup', () => {

        const searchValue = searchInput.value.toLowerCase();

        tableRows.forEach(row => {

            const text = row.textContent.toLowerCase();

            row.style.display = text.includes(searchValue)
            ? ''
            : 'none';

        });

    });

}

if(categoryFilter){

    categoryFilter.addEventListener('change', () => {

        const filterValue = categoryFilter.value.toLowerCase();

        tableRows.forEach(row => {

            const category = row.querySelector('.badge-category')
            .textContent
            .toLowerCase();

            if(filterValue.includes('todas')){

                row.style.display = '';

            }else{

                row.style.display = category.includes(filterValue)
                ? ''
                : 'none';

            }

        });

    });

}

const deleteButtons = document.querySelectorAll('.delete');

deleteButtons.forEach(button => {

    button.addEventListener('click', () => {

        const confirmDelete = confirm(
            '¿Deseas eliminar este producto?'
        );

        if(confirmDelete){

            const row = button.closest('tr');

            row.style.opacity = '0';

            row.style.transform = 'translateX(20px)';

            row.style.transition = '0.3s';

            setTimeout(() => {

                row.remove();

            },300);

        }

    });

});

const statNumbers = document.querySelectorAll('.info-card h2');

statNumbers.forEach(stat => {

    const finalValue = parseInt(stat.textContent);

    let startValue = 0;

    const speed = 20;

    const counter = setInterval(() => {

        startValue++;

        stat.textContent = startValue;

        if(startValue >= finalValue){

            clearInterval(counter);

        }

    },speed);

});

const menuLinks = document.querySelectorAll('.menu-link');

menuLinks.forEach(link => {

    link.addEventListener('click', () => {

        menuLinks.forEach(item => {

            item.classList.remove('active');

        });

        link.classList.add('active');

    });

});

const table = document.querySelector('.table-box');

if(table){

    window.addEventListener('scroll', () => {

        if(window.scrollY > 20){

            table.style.boxShadow =
            '0 20px 45px rgba(0,0,0,0.06)';

        }else{

            table.style.boxShadow = 'none';

        }

    });

}

const rows = document.querySelectorAll('.inventory-table tbody tr');

rows.forEach((row,index) => {

    row.style.opacity = '0';

    row.style.transform = 'translateY(20px)';

    row.style.transition = '0.5s';

    setTimeout(() => {

        row.style.opacity = '1';

        row.style.transform = 'translateY(0)';

    },index * 120);

});

const cards = document.querySelectorAll('.info-card');

cards.forEach(card => {

    card.addEventListener('mouseenter', () => {

        card.style.transform = 'translateY(-6px)';

        card.style.transition = '0.3s';

    });

    card.addEventListener('mouseleave', () => {

        card.style.transform = 'translateY(0)';

    });

});