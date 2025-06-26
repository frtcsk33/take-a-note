async function renderNotes() {
  const notes = await window.api.getNotes();
  const noteList = document.getElementById('noteList');
  noteList.innerHTML = '';
  const showDeleted = document.getElementById('showDeleted').checked;

  notes.forEach((note, index) => {
    if (showDeleted && note.deleted) {
      const li = document.createElement('li');
      li.className = 'noteItem';

      const textDiv = document.createElement('div');
      textDiv.className = 'noteContent';
      textDiv.textContent = note.text;

      const getBackBtn = document.createElement('button');
      getBackBtn.textContent = 'Geri Al';
      getBackBtn.className = 'getBackNoteBtn';

      getBackBtn.onclick = async () => {
        notes[index].deleted = false;
        await window.api.saveNotes(notes);
        renderNotes();
      };

      const buttonGroup = document.createElement('div');
      buttonGroup.className = 'buttonGroup';
      buttonGroup.appendChild(getBackBtn);

      li.appendChild(textDiv);
      li.appendChild(buttonGroup);
      noteList.appendChild(li);
    } else if (!showDeleted && !note.deleted) {
      const li = document.createElement('li');
      li.className = 'noteItem';

      const textDiv = document.createElement('div');
      textDiv.className = 'noteContent';
      textDiv.textContent = note.text;

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Düzenle';
      editBtn.className = 'editNoteBtn';
      editBtn.onclick = () => openEditModal(index);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Sil';
      deleteBtn.className = 'deleteNoteBtn';
      deleteBtn.onclick = async () => {
        notes[index].deleted = true;
        await window.api.saveNotes(notes);
        renderNotes();
      };

      const buttonGroup = document.createElement('div');
      buttonGroup.className = 'buttonGroup';
      buttonGroup.appendChild(editBtn);
      buttonGroup.appendChild(deleteBtn);

      li.appendChild(textDiv);
      li.appendChild(buttonGroup);
      noteList.appendChild(li);
    }
  });
}


let editingIndex = null;

async function openEditModal(index) {
  editingIndex = index;
  const notes = await window.api.getNotes();
  const note = notes[index];

  document.getElementById('editTextArea').value = note.text;
  document.getElementById('editModal').style.display = 'block';
  // document.getElementById('modalBackdrop').style.display = 'block';



}

async function saveEdit() {

  const editedText = document.getElementById('editTextArea').value.trim();
  if(!editedText) return alert('Not boş olamaz!');

  
  const notes = await window.api.getNotes();
  notes[editingIndex].text = editedText;

  await window.api.saveNotes(notes);

  closeEditModal();
  renderNotes();
  
}

function closeEditModal(){
  document.getElementById('editModal').style.display = 'none';
  document.getElementById('modalBackdrop').style.display = 'none';
  editingIndex = null;
}


async function addNote() {
  const input = document.getElementById('noteInput');
  const text = input.value.trim();
  if (!text) return;

  const notes = await window.api.getNotes();
  notes.push({ text, deleted: false });
  await window.api.saveNotes(notes);

  input.value = '';
  renderNotes();
}

document.addEventListener('DOMContentLoaded', ()=> {

  renderNotes();
  document.getElementById('showDeleted').addEventListener('change', renderNotes);
 
  document.getElementsByClassName("saveEditBtn")[0].addEventListener('click', saveEdit);
  document.getElementsByClassName("cancelEditBtn")[0].addEventListener('click', closeEditModal);
  
});
