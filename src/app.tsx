import { ChangeEvent, useState } from "react";
import { NewNoteCart } from "./Components/new-note-cart";
import { NoteCard } from "./Components/note-cart";
import logo from "./assets/logo.svg";

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState("");

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearch(query);
  }

 
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");
    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }
    return [];
  });

  function onNoteDeleted(id:string){
    const notesArray = notes.filter(note => {
      return note.id != id
    })

    setNotes(notesArray)

    localStorage.setItem("notes", JSON.stringify(notesArray));

  }

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  const filteredNotes =
    search != ""
      ? notes.filter((note) =>
          note.content.toLowerCase().includes(search.toLowerCase())
        )
      : notes;

  return (
    <div className="text-slate-50 bg-slate-900 antialiased px-5 md:px-3 ">
      <div className="mx-auto max-w-6xl my-12 space-y-6">
        <img src={logo} alt="NLW Expert" />

        <form className="w-full ">
          <input
            className="w-full bg-transparent text-3xl tracking-tighter outline-none placeholder:text-slate-500"
            type="text"
            placeholder="Busque suas notas..."
            onChange={handleSearch}
          />
        </form>

        <div className="h-px bg-slate-700" />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 auto-rows-[250px]">
          <NewNoteCart onNoteCreated={onNoteCreated} />

          {filteredNotes.map((note) => {
            return <NoteCard key={note.id} note={note}  onNoteDeleted={onNoteDeleted}/>;
          })}
        </div>
      </div>
    </div>
  );
}
