export interface Note{
    id: string;
    title: string;
    description: string | null;
    created_at: Date ;
}

export interface NoteForm{
    title: string;
    description: string | null;
}