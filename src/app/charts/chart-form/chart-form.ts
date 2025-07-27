import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResizeEvent } from 'angular-resizable-element';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-chart-form',
  standalone: true,
  imports: [],
  templateUrl: './chart-form.html',
  styleUrl: './chart-form.scss'
})
export class ChartFormComponent implements OnInit {
  form: FormGroup;
  charts: any[] = [];
  editIndex: number | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('charts');
    if (saved) this.charts = JSON.parse(saved);
  }

  saveChartsToStorage() {
    localStorage.setItem('charts', JSON.stringify(this.charts));
  }

  onSubmit() {
    if (this.form.valid) {
      const data = this.form.value;
      if (this.editIndex !== null) {
        this.charts[this.editIndex] = data;
        this.editIndex = null;
      } else {
        this.charts.push(data);
      }
      this.saveChartsToStorage();
      this.form.reset();
    }
  }

  editChart(i: number) {
    this.form.setValue(this.charts[i]);
    this.editIndex = i;
  }

  deleteChart(i: number) {
    this.charts.splice(i, 1);
    this.saveChartsToStorage();
  }

  logout() {
    this.auth.logout();
  }

  onResize(event: ResizeEvent, index: number) {
    this.charts[index].width = event.rectangle.width;
    this.charts[index].height = event.rectangle.height;
    this.saveChartsToStorage();
  }
}
