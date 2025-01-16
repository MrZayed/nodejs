getAllData()
function getAllData(){
    fetch('http://localhost:5000/')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = "";
        data.Data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td>${item.name}</td>
                <td class="icn">
                    <i class="fa-solid fa-pen-to-square edit-icon " data-id="${item.id} "></i>

                    <i class="fa-solid fa-trash delete-icon" data-id="${item.id}"></i>
                </td>`;

            tableBody.appendChild(row);

            // Attach event listeners for edit and delete
            document.querySelectorAll('.edit-icon').forEach(icon => {
                icon.addEventListener('click', handleEdit);
            });

            document.querySelectorAll('.delete-icon').forEach(icon => {
                icon.addEventListener('click', handleDelete);
            });
        });
    })
    .catch(err => {
        console.error('Error fetching data:', err);
    });
}

document.getElementById('add-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const name = document.getElementById('name').value;
    fetch('http://localhost:5000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, name })
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                const tableBody = document.querySelector('#data-table tbody');
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${data.list.length}</td>
                    <td>${title}</td>
                    <td>${name}</td> `;
                tableBody.appendChild(row);

            }
           
        })
        
        .catch(err => {
            console.error('Error adding object:', err);
        });
        location.reload(true);
    document.getElementById('add-form').reset();
});
// fetch('http://localhost:5000/')
//     .then(response => response.json())
//     .then(data => {
//         const tableBody = document.querySelector('#data-table tbody');
//         data.Data.forEach(item => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${item.id}</td>
//                 <td>${item.title}</td>
//                 <td>${item.name}</td>
//                 <td class="icn">
//                     <i class="fa-solid fa-pen-to-square edit-icon " data-id="${item.id} "></i>

//                     <i class="fa-solid fa-trash delete-icon" data-id="${item.id}"></i>
//                 </td>`;

//             tableBody.appendChild(row);

//             // Attach event listeners for edit and delete
//             document.querySelectorAll('.edit-icon').forEach(icon => {
//                 icon.addEventListener('click', handleEdit);
//             });

//             document.querySelectorAll('.delete-icon').forEach(icon => {
//                 icon.addEventListener('click', handleDelete);
//             });

//         });
//     })
//     .catch(err => {
//         console.error('Error fetching data:', err);
//     });

// Handle edit operation
function handleEdit(event) {
    const id = event.target.dataset.id;
    const row = event.target.closest('tr'); // Get the row containing the edit icon
    const currentTitle = row.querySelector('td:nth-child(2)').textContent; // Get the title from the row
    const currentName = row.querySelector('td:nth-child(3)').textContent;
    const title = prompt('Enter new title:', currentTitle);
    const name = prompt('Enter new name:', currentName);

    if (title && name) {
        fetch(`http://localhost:5000/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, name })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to update. Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                getAllData()
                // console.log(data);
                // const row = document.querySelector(`tr[data-id="${id}"]`);
                // row.querySelector('td:nth-child(2)').textContent = title;
                // row.querySelector('td:nth-child(3)').textContent = name;
                location.reload();
            })
            .catch(err => {
                console.error('Error editing object:', err);
            });
    }
}

// Handle delete operation
function handleDelete(event) {
    const id = event.target.dataset.id;

    if (confirm('Are you sure you want to delete this item?')) {
        fetch(`http://localhost:5000/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                location.reload();
            })
            .catch(err => {
                console.error('Error deleting object:', err);
            });
    }
}
