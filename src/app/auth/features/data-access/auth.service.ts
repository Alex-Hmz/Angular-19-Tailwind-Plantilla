import { computed, inject, Injectable, signal } from "@angular/core";
import { createClient, Session, SignUpWithPasswordCredentials, SupabaseClient } from "@supabase/supabase-js";
import { SupabaseService } from "../../../shared/data-acces/supabase.service";

@Injectable({providedIn: 'root'})
export class AuthService {
    
    private _supabaseClient = inject(SupabaseService).supabaseClient;
    private _session = signal<Session | null>(null);

    session = this._session.asReadonly();

    constructor() {
        // Obtener sesión actual al iniciar
        this._supabaseClient.auth.getSession().then(({ data }) => {
        this._session.set(data.session ?? null);
        });

        // Suscribirse a cambios en la sesión
        this._supabaseClient.auth.onAuthStateChange((_event, session) => {
        this._session.set(session);
        });
    }

    isAuthenticated = computed(() => this._session() !== null);


    signUp(credentials: SignUpWithPasswordCredentials){
        return this._supabaseClient.auth.signUp(credentials);
    }

    logIn(credentials: SignUpWithPasswordCredentials){
        return this._supabaseClient.auth.signInWithPassword(credentials);
    }

    signOut(){
        return this._supabaseClient.auth.signOut();

    }

}