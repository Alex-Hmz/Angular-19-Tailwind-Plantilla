import { computed, inject, Injectable, signal } from "@angular/core";
import { createClient, SignUpWithPasswordCredentials, SupabaseClient } from "@supabase/supabase-js";
import { SupabaseService } from "../../shared/data-acces/supabase.service";

interface Note{
    id: string;
    title: string;
    description: string;
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

        try{    
            const {data} = await this._supabaseClient.from('notes').select('*').returns<Note[]>();

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

}