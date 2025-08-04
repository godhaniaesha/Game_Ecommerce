const textareaMessage = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const addInfo = document.getElementById('add-info');
const saveinfoForm = document.getElementById('saveinfo-form');
const saveformcancle = document.getElementById('saveform-cancle');
const exampleInfo = document.getElementById('example-info');
const exampleForm = document.getElementById('example-form');
const examplecloseicon = document.getElementById('example-close-icon');
const exampleclose = document.getElementById('example-close');
const switchbox = document.getElementById('switch-box');
const infoP = document.getElementById('info-p');
const geminitool = document.getElementById('gemini-tool');
const geminitoolShow = document.getElementById('gemini-tool-show');
let updateID = null;

textareaMessage.addEventListener('input', function () {
    submitBtn.disabled = textareaMessage.value.trim() === '';
});

geminitool.addEventListener('click', function () {
    geminitoolShow.classList.toggle('hidden');
})

switchbox.addEventListener('click', function () {
    addInfo.disabled = !switchbox.checked;
    infoP.classList.toggle('text-[#7C7C7C]') = !switchbox.checked;

})

addInfo.addEventListener('click', function () {
    saveinfoForm.classList.remove('hidden')
})

saveformcancle.addEventListener('click', function () {
    saveinfoForm.classList.add('hidden')

})

exampleInfo.addEventListener('click', function () {
    exampleForm.classList.remove('hidden')
})

examplecloseicon.addEventListener('click', function () {
    exampleForm.classList.add('hidden')
})

exampleclose.addEventListener('click', function () {
    exampleForm.classList.add('hidden')
})




document.addEventListener('DOMContentLoaded', () => {
    if (saveinfoForm) {
        saveinfoForm.addEventListener('submit', handleSaveInfo);
    }


    const deleteModal = document.getElementById('deleteModal');
    const deleteAllModal = document.getElementById('deleteAllModal');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const confirmDeleteAll = document.getElementById('confirm-delete-all');
    const cancelDeleteAll = document.getElementById('cancel-delete-all');

    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => {
            deleteModal.classList.add('hidden');
        });
    }


    if (cancelDeleteAll) {
        cancelDeleteAll.addEventListener('click', () => {
            deleteAllModal.classList.add('hidden');
        });
    }

    if (confirmDeleteAll) {
        confirmDeleteAll.addEventListener('click', () => {

        });
    }

     


    Display();
});


const handleSaveInfo = async (event) => {
    event.preventDefault();

    const message = textareaMessage.value.trim();

    if (!message) {
        console.warn("Message is empty, not saving.");
        return;
    }

    const data = { message };
    const url = "http://localhost:8080/savedInfo";

    try {
        let response;
        if (updateID) {

            response = await fetch(`${url}/${updateID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data, id: updateID }),
            });
        } else {

            response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        textareaMessage.value = '';
        updateID = null;
        await Display();
        saveinfoForm.classList.add('hidden');

    } catch (error) {
        console.error("Error saving/updating info:", error);

    }
};

const Display = async (event) => {
    if (event) event.preventDefault();

    try {
        const response = await fetch("http://localhost:8080/savedInfo");
        const data = await response.json();

        const savedInfoData = data.reverse();
        let deleteAllButtonHtml = savedInfoData.length > 0 ?
            `<button id="deleteall-info" onclick="handleDeleteall()"
                class="text-[--input-border-focus] border flex justify-center gap-2 text-md hover:bg-[--examples-btn-hover] py-2 items-center px-5 rounded-3xl font-semibold">
                <span class="material-symbols-outlined">delete</span>
                Delete all
            </button>` : '';

        let print = savedInfoData.length > 0 ? '<p class="font-semibold mb-2">Saved today</p>' : `<p id="info-p" class="text-[--sidebar-text] text-center">You haven't asked YOYO to save anything about you yet</p>`

        savedInfoData.map((v, index) => {
            const onlyOne = savedInfoData.length === 1;
            const firstDiv = index === 0;
            const lastDiv = index === savedInfoData.length - 1;

            let borderRadius = ' ';
            if (onlyOne) {
                borderRadius = 'rounded-t-xl rounded-b-xl';
            } else if (firstDiv) {
                borderRadius = 'rounded-t-xl rounded-b-sm';
            } else if (lastDiv) {
                borderRadius = 'rounded-t-sm rounded-b-xl';
            } else {
                borderRadius = 'rounded-t-sm rounded-b-sm';
            }

            print += `
                <div class="saveshowdata bg-[--sidebar-bg] w-full py-3 px-4 mb-1 flex items-center justify-between ${borderRadius}">
                    <p class="break-words text-md text-[--sidebar-text]">${v.message}</p>
                    <div class="relative">
                        <span id="action-ED-${index}" onClick="handleActionBtn(${index})"
                            class="action material-symbols-outlined rounded-full hover:bg-[--bg-hover] w-[40px] h-[40px] items-center justify-center flex cursor-pointer">more_vert</span>
                        <div id="action-data-${index}" class="absolute bg-[--dropDown] top-[100%] left-[0%] rounded py-2 shadow-lg hidden z-10">
                            <ul>
                                <li onclick="handleEdit('${v.id}')" class="tooltip-custom text-md flex items-center hover:bg-[--bg-hover] px-3 py-2 cursor-pointer" data-tooltip="Edit this info">
                                    <span class="material-symbols-outlined text-2xl mr-3">edit</span>Edit
                                </li>
                                <li onclick="handleDelete('${v.id}')" class="tooltip-custom text-md flex items-center hover:bg-[--bg-hover] px-3 py-2 cursor-pointer" data-tooltip="Delete this info">
                                    <span class="material-symbols-outlined text-2xl mr-3">delete</span>Delete
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        });

        document.getElementById('all-delete').innerHTML = deleteAllButtonHtml;
        document.getElementById('savedData').innerHTML = print;

    } catch (error) {
        console.error(error);

    }
};

function handleActionBtn(index) {
    const currentDropdown = document.getElementById(`action-data-${index}`);
    
    // Close all other dropdowns first
    document.querySelectorAll('[id^="action-data-"]').forEach(drop => {
      if (drop !== currentDropdown) {
        drop.classList.add("hidden");
      }
    });
    
    // Toggle current dropdown
    currentDropdown.classList.toggle("hidden");
    
    // Position the dropdown properly on mobile
    if (window.innerWidth <= 768) {
      const btnRect = document.getElementById(`action-ED-${index}`).getBoundingClientRect();
      currentDropdown.style.left = 'auto';
      currentDropdown.style.right = '0';
    }
  }


document.addEventListener('click', (event) => {
    document.querySelectorAll('[id^="action-data-"]').forEach(drop => {
        const parentDiv = drop.parentElement;
        if (parentDiv && !parentDiv.contains(event.target)) {
            drop.classList.add("hidden");
        }
    });
});


const handleDeleteall = () => {
    const deleteAllModal = document.getElementById('deleteAllModal');
    if (deleteAllModal) {
        deleteAllModal.classList.remove('hidden');

        const confirmDeleteAll = document.getElementById('confirm-delete-all');
        if (confirmDeleteAll) {

            confirmDeleteAll.replaceWith(confirmDeleteAll.cloneNode(true));
            document.getElementById('confirm-delete-all').addEventListener('click', async () => {
                await handleDeleteAllinfo();
            });
        }
    }
};

const handleDeleteAllinfo = async () => {

    try {
        const response = await fetch('http://localhost:8080/savedInfo')
        const data = await response.json()

        for (const item of data) {
            if (item.id) {
                await fetch('http://localhost:8080/savedInfo/' + item.id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            }
        }
        await Display();
    } catch (error) {
        console.error(error);
    }
}

const handleEdit = async (id) => {
    try {

        document.querySelectorAll('[id^="action-data-"]').forEach(drop => {
            drop.classList.add("hidden");
        });

        const response = await fetch('http://localhost:8080/savedInfo');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const obj = data.find((v) => v.id === id);

        if (obj) {
            textareaMessage.value = obj.message;
            updateID = obj.id;
            saveinfoForm.classList.remove('hidden');
            textareaMessage.focus();
        } else {
            console.warn(`No item found with ID: ${id}`);
        }
    } catch (error) {
        console.error("Error fetching info for edit:", error);

    }
};

let currentDeleteId = null;

const handleDelete = (id) => {
    currentDeleteId = id;
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
        deleteModal.classList.remove('hidden');

        const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
        if (confirmDeleteBtn) {

            confirmDeleteBtn.replaceWith(confirmDeleteBtn.cloneNode(true));
            document.getElementById('confirm-delete-btn').addEventListener('click', async () => {
                await handleDeleteConfirmed();
            });
        }
    }
};


const handleDeleteConfirmed = async () => {
    if (!currentDeleteId) return;

    try {
        const response = await fetch('http://localhost:8080/savedInfo/' + currentDeleteId, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const deleteModal = document.getElementById('deleteModal');
        if (deleteModal) {
            deleteModal.classList.add('hidden');
        }
        currentDeleteId = null;
        await Display();
    } catch (error) {
        console.error("Error deleting info:", error);

    }
}

saveinfoForm.addEventListener('submit', handleSaveInfo)
Display()




