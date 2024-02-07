import { NewNoteCart } from "./Components/new-note-cart";
import { NoteCard } from "./Components/note-cart";
import logo from "./assets/logo.svg";

const note = {
  date: new Date(),
  content: 'Hello Wordl'
} 

export function App() {
  return (
    <div className="text-slate-50 bg-slate-900 antialiased ">
     
      <div className="mx-auto max-w-6xl my-12 space-y-6">
        <img src={logo} alt="NLW Expert" />

        <form className="w-full ">
          <input className="w-full bg-transparent text-3xl tracking-tighter outline-none placeholder:text-slate-500" type="text" placeholder="Busque suas notas..." />
        </form>
        
        <div className="h-px bg-slate-700"/>


        <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        
        
          <NewNoteCart/>
          <NoteCard note={note}/>
        
        </div>
      </div>
    </div>
  );
}
