// For all button click handlers, ensure they're not submitting
document.querySelectorAll('button').forEach(button => {
    if (button.type !== 'submit') {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Your button's functionality
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    // Back button functionality
    const backButton = document.getElementById('backButton');
    if (backButton) {
        // Example for your back button
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.back();
        });
    }
});
// Mobile toggle functionality
const editorToggle = document.getElementById('editorToggle');
const previewToggle = document.getElementById('previewToggle');
const editorSection = document.getElementById('editorSection');
const previewSection = document.getElementById('previewSection');

// Function to toggle sections
function toggleSections(showEditor) {
    if (window.innerWidth <= 959) { // Only for mobile view
        if (showEditor) {
            editorSection.classList.add('active');
            previewSection.classList.remove('active');
            editorToggle.classList.add('border-b-2','border-[--add-btn]');
            previewToggle.classList.remove('border-b-2','border-[--add-btn]');
        } else {
            previewSection.classList.add('active');
            editorSection.classList.remove('active');
            previewToggle.classList.add('border-b-2','border-[--add-btn]');
            editorToggle.classList.remove('border-b-2','border-[--add-btn]');
        }
    } else {
        // For desktop, always show both sections
        editorSection.classList.add('active');
        previewSection.classList.add('active');
    }
}

// Initialize based on screen size
function initializeSections() {
    if (window.innerWidth <= 959) {
        // Mobile view - start with editor visible
        toggleSections(true);
    } else {
        // Desktop view - show both sections
        editorSection.classList.add('active');
        previewSection.classList.add('active');
    }
}

// Only add event listeners if the toggle buttons exist (mobile view)
if (editorToggle && previewToggle) {
    document.addEventListener('click', (e) => {
        // Handle all button clicks in one place
        if (e.target.closest('#editorToggle')) {
            e.preventDefault();
            toggleSections(true);
        }
        else if (e.target.closest('#previewToggle')) {
            e.preventDefault();
            toggleSections(false);
        }
        // Add other button handlers here
    });
}

// Handle window resize
window.addEventListener('resize', initializeSections);

// Initial setup
initializeSections();

// Rest of your existing JavaScript...
const gemTitle = document.getElementById('gemTitle');
const saveButton = document.getElementById('saveButton');
const input = document.getElementById("nameInput");
const wrapper = document.getElementById("inputWrapper");
const errorText = document.getElementById("errorText");
const errorIcon = document.getElementById("errorIcon");
const previewSectionChat = document.getElementById("previewSectionChat");

// Function to update Save button state
function updateSaveButtonState() {
    if (input.value.trim() !== "") {
        saveButton.disabled = false;
        previewSectionChat.style.display = "none"
    } else {
        saveButton.disabled = true;
        previewSectionChat.style.display = "block"
        previewSectionChat.style.backgroundColor = "var(--bg-previewSectionChat)"
    }
}

updateSaveButtonState();

input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
        wrapper.classList.remove("border-blue-800", "border-transparent");
        wrapper.classList.add("border-[#B3261E]");
        errorText.classList.remove("hidden");
        errorIcon.classList.remove("hidden");
        previewSectionChat.style.display = "block"
        previewSectionChat.style.backgroundColor = "var(--bg-previewSectionChat)"

    } else {
        wrapper.classList.remove("border-[#B3261E]");
        wrapper.classList.add("border-transparent");
        errorText.classList.add("hidden");
        errorIcon.classList.add("hidden");
        previewSectionChat.style.display = "none"
    }
});

const gemIcon = document.getElementById('gem-preview-Name');
input.addEventListener("input", () => {
    const trimmedValue = input.value.trim();
    gemTitle.textContent = trimmedValue || 'New Gem';

    // Update icon
    if (gemIcon) {
        if (!trimmedValue) {
            // Show diamond icon if empty
            gemIcon.textContent = 'diamond';
            gemIcon.classList.add('material-symbols-outlined');
        } else {
            // Show first character (number or letter)
            gemIcon.textContent = trimmedValue[0].toUpperCase();
            gemIcon.classList.remove('material-symbols-outlined');
        }
    }

    // Rest of your existing code...
    if (trimmedValue) {
        previewText.textContent = trimmedValue;
        previewText.style.color = "var(--text-main)";
    } else {
        previewText.textContent = 'To preview your Gem start by giving it a name';
        previewText.style.color = "var(--text-muted)";
    }

    if (trimmedValue) {
        wrapper.classList.remove("border-[#B3261E]");
        wrapper.classList.add("border-transparent");
        errorText.classList.add("hidden");
        errorIcon.classList.add("hidden");
    }

    updateSaveButtonState();
});


const plusButton = document.getElementById('plus-button');
const plusDropdown = document.getElementById('plus-dropdown');
const triggerUpload = document.getElementById('trigger-upload');
const uploadInput = document.getElementById('upload-preview-input');
const imagePreviewContainer = document.getElementById('image-preview-container');
const imagePreview = document.getElementById('image-preview');
const removePreview = document.getElementById('remove-preview');
const userInput = document.getElementById('user-input');
const previewText = document.getElementById('previewText');
const micIcon = document.getElementById('mic-icon');
const sendIcon = document.getElementById('send-icon');

if (plusButton) {
    plusButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents default button behavior
        plusDropdown.classList.toggle('hidden'); // Toggles the plus menu
    });
}
triggerUpload.addEventListener('click', () => {
    uploadInput.click();
});

uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            imagePreview.src = reader.result;
            imagePreviewContainer.classList.remove('hidden');
            plusDropdown.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
});

document.addEventListener('click', (e) => {
    if (!plusButton.contains(e.target) && !plusDropdown.contains(e.target)) {
        plusDropdown.classList.add('hidden');
    }
});

removePreview.addEventListener('click', () => {
    imagePreview.src = '';
    imagePreviewContainer.classList.add('hidden');
    uploadInput.value = '';
});

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    if (textarea.value.trim()) {
        micIcon.classList.add('opacity-0', 'scale-75', 'translate-x-2');
        micIcon.classList.remove('opacity-100', 'scale-100', 'translate-x-0');
        sendIcon.classList.remove('opacity-0', 'scale-75', 'translate-x-2');
        sendIcon.classList.add('opacity-100', 'scale-100', 'translate-x-0');
    } else {
        micIcon.classList.remove('opacity-0', 'scale-75', 'translate-x-2');
        micIcon.classList.add('opacity-100', 'scale-100', 'translate-x-0');
        sendIcon.classList.add('opacity-0', 'scale-75', 'translate-x-2');
        sendIcon.classList.remove('opacity-100', 'scale-100', 'translate-x-0');
    }
}

// document.getElementById('send-button').addEventListener('click', () => {
//     const value = userInput.value.trim();
//     if (value) {
//         previewText.textContent = `Previewing "${value}" Gem`;
//     } else {
//         previewText.textContent = 'To preview your Gem start by giving it a name';
//     }
// });

const textarea = document.getElementById('nameTextarea');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');

const undoStack = [];
const redoStack = [];

textarea.addEventListener('input', () => {
    undoStack.push(textarea.value);
    redoStack.length = 0;
});

undoBtn.addEventListener('click', () => {
    if (undoStack.length > 1) {
        redoStack.push(undoStack.pop());
        textarea.value = undoStack[undoStack.length - 1] || '';
    }
});

redoBtn.addEventListener('click', () => {
    if (redoStack.length > 0) {
        const value = redoStack.pop();
        textarea.value = value;
        undoStack.push(value);
    }
});

const toggleBtnNewgems = document.getElementById('toggleDropdown');
const dropdownMenu = document.getElementById('dropdownMenuknowlage');
const uploadOption = document.getElementById('uploadOption');
const fileInput = document.getElementById('fileInput');
const fileText = document.getElementById('fileText');
const previewImage = document.getElementById('previewImage');
const imageWrapper = document.getElementById('imageWrapper');
const removeImage = document.getElementById('removeImage');

uploadOption.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            imageWrapper.classList.remove('hidden');
            fileText.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
});

removeImage.addEventListener('click', () => {
    previewImage.src = '';
    imageWrapper.classList.add('hidden');
    fileText.classList.remove('hidden');
    fileInput.value = '';
});

if (toggleBtnNewgems) {
    toggleBtnNewgems.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents default button behavior (like form submission)
        dropdownMenu.classList.toggle('hidden'); // Toggles visibility of dropdown
    });
}

document.addEventListener('click', (e) => {
    if (!dropdownMenu.contains(e.target) && !toggleBtnNewgems.contains(e.target)) {
        dropdownMenu.classList.add('hidden');
    }
});

const icon = document.getElementById('infoIcon');
const tooltip = document.getElementById('tooltip');

icon.addEventListener('click', (e) => {
    e.stopPropagation();
    tooltip.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
    if (!icon.contains(e.target)) {
        tooltip.classList.add('hidden');
    }
});

const knowledgeIcon = document.getElementById('knowledgeIcon');
const knowledgeTooltip = document.getElementById('knowledgeTooltip');

knowledgeIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    knowledgeTooltip.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
    if (!knowledgeIcon.contains(e.target)) {
        knowledgeTooltip.classList.add('hidden');
    }
});

window.addEventListener('beforeunload', () => {
    localStorage.removeItem('editingGem');
});


const myGemsForm = document.getElementById('myGemsForm');
const nameInput = document.getElementById('nameInput');
const nameTextarea = document.getElementById('nameTextarea');



const editingGem = JSON.parse(localStorage.getItem('editingGem'));
const isCopy = localStorage.getItem('copiedGem') === 'true';




const handleGemsStore = async (event) => {
    event.preventDefault(); // <-- prevents page refresh by default


    const gemsName = nameInput.value.trim();
    const gemsDescription = nameTextarea.value.trim();
    const gemsData = { gemsName, gemsDescription };

    try {
        let response;

        if (editingGem && !isCopy) {
            // ✅ Edit mode → PUT
            response = await fetch(`http://localhost:8080/newGems/${editingGem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gemsData),
            });
        } else {
            // ✅ New or copied → POST
            response = await fetch('http://localhost:8080/newGems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gemsData),
            });
        }

        if (response.ok) {
            console.log("Gems data submitted successfully.");
            console.log("Submitted", gemsData);

            localStorage.removeItem('editingGem');
            localStorage.removeItem('copiedGem');


            // ✅ Only now refresh the page after successful save
            location.reload();
        } else {
            console.error("Failed to submit gems data.");
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Existing code...

    if (editingGem) {
        const nameInputEl = document.getElementById('nameInput');
        const nameTextareaEl = document.getElementById('nameTextarea');
        const gemTitleEl = document.getElementById('gemTitle');
        const saveBtn = document.getElementById('saveButton');

        nameInputEl.value = isCopy
            ? `Copy of ${editingGem.gemsName || ''}`.trim()
            : editingGem.gemsName || '';

        nameTextareaEl.value = editingGem.message || editingGem.gemsDescription || '';
        gemTitleEl.textContent = nameInputEl.value;
        saveBtn.disabled = false;
        previewSectionChat.style.display = "none"

         const trimmedValue = input.value.trim();
    gemTitle.textContent = trimmedValue || 'New Gem';

    // Update icon
    if (gemIcon) {
        if (!trimmedValue) {
            // Show diamond icon if empty
            gemIcon.textContent = 'diamond';
            gemIcon.classList.add('material-symbols-outlined');
        } else {
            // Show first character (number or letter)
            gemIcon.textContent = trimmedValue[0].toUpperCase();
            gemIcon.classList.remove('material-symbols-outlined');
        }
    }

    // Rest of your existing code...
    if (trimmedValue) {
        previewText.textContent = trimmedValue;
        previewText.style.color = "var(--text-main)";
    } else {
        previewText.textContent = 'To preview your Gem start by giving it a name';
        previewText.style.color = "var(--text-muted)";
    }

      
    } else {
        previewSectionChat.style.display = "block"
        previewSectionChat.style.backgroundColor = "var(--bg-previewSectionChat)"
    }

    // ✅ ✅ ✅ Add form event listener here
    const form = document.getElementById("myGemsForm");
    if (form) {
        form.addEventListener("submit", handleGemsStore);
    }
});


