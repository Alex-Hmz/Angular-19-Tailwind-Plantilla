import { computed, inject, Injectable, signal } from "@angular/core";
import { createClient, SignUpWithPasswordCredentials, SupabaseClient } from "@supabase/supabase-js";
import { SupabaseService } from "../../shared/data-acces/supabase.service";
import { AuthService } from "../../auth/features/data-access/auth.service";

interface Note{
    id: string;
    title: string;
    description: string | null;
    created_at: Date;
}

interface NoteState{
    notes: Note[];
    loading: boolean;
    error: boolean;        
}

@Injectable({providedIn: 'root'})
export class NotesService {
    
    private _supabaseClient = inject(SupabaseService).supabaseClient
    private _authService = inject(AuthService);
    
    private _state = signal<NoteState>({
        notes: [],
        loading: false,
        error: false
    });
    
    notes = computed(() => this._state().notes);
    loading = computed(() => this._state().loading);
    error = computed(() => this._state().error);

    async getAllNotes() {

        this._state.update((state) => ({
            ...state,
            loading: true,
            error: false
        }));

        const session = this._authService.session();

        try{    

            const {data} = await this._supabaseClient.from('notes')
            .select('*')
            .eq('user_id', session?.user.id)
            .returns<Note[]>();

            if(data) {
                this._state.update((state) => ({
                    ...state,
                    notes: data,
                    error: false
                }));
            }
            
        }catch (error) {
            this._state.update((state) => ({
                ...state,
                error: true
            }));
        }finally {
            this._state.update((state) => ({
                ...state,
                loading: false
            }));
        }
        
    }

    async insertNote(note: {title:string, description:string | null}) {
        
        try {
            const session = this._authService.session();

            const response = await this._supabaseClient.from('notes').insert({
                user_id: session?.user.id,
                title: note.title,
                description: note.description
            })
            console.log('Insert response:', response);
            
        } catch (error) {
            console.error('Error inserting note:', error);
            
        }

    }

    async getNoteById(id: string) {
        return await this._supabaseClient
            .from('notes')
            .select('*')
            .eq('id', id)
            .single();
    }

    async updateNote(id: string, note: {title:string, description:string | null}) {
        return await this._supabaseClient
            .from('notes')
            .update({
                title: note.title,
                description: note.description
            })
            .eq('id', id);
    }
}