import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importar o operador 'map'
import { Automation } from '../models/automation.model';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {

  private apiUrl = 'http://localhost:8080/automations'; // URL da sua API

  constructor(private http: HttpClient) { }

  // Método para obter todas as automações
  getAutomation(): Observable<Automation[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.content) // Extrair apenas a propriedade 'content'
    );
  }

  // Método para obter uma automação específica por ID
  getAutomationById(id: number): Observable<Automation> {
    return this.http.get<Automation>(`${this.apiUrl}/${id}`);
  }

  // Método para criar uma nova automação
  createAutomation(automation: Automation): Observable<Automation> {
    return this.http.post<Automation>(this.apiUrl, automation);
  }

  // Método para atualizar uma automação existente
  updateAutomation(id: number, automation: Automation): Observable<Automation> {
    return this.http.put<Automation>(`${this.apiUrl}/${id}`, automation);
  }

  // Método para deletar uma automação
  deleteAutomation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
