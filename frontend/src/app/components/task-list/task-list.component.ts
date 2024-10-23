import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data; // Agora data será o array de tarefas
        console.log(this.tasks); // Verificar os dados
      },
      (error) => {
        console.error('Erro ao buscar tarefas:', error);
      }
    );
  }
}
