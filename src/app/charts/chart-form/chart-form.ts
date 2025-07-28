import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { ChartDisplayComponent } from '../chart-display/chart-display';

@Component({
  selector: 'app-chart-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartDisplayComponent
  ],
  templateUrl: './chart-form.html',
  styleUrls: ['./chart-form.scss']
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
      const data = {
        ...this.form.value,
        width: 500, 
        height: 400  
      };
      if (this.editIndex !== null) {
        this.charts[this.editIndex] = { ...this.charts[this.editIndex], ...data };
        this.editIndex = null;
      } else {
        this.charts.push(data);
      }
      this.saveChartsToStorage();
      this.form.reset();
    }
    console.log('Charts:', this.charts);
  }

  editChart(i: number) {
    this.form.setValue({
      name: this.charts[i].name,
      type: this.charts[i].type
    });
    this.editIndex = i;
  }

  deleteChart(i: number) {
    this.charts.splice(i, 1);
    this.saveChartsToStorage();
  }

  logout() {
    this.auth.logout();
  }

  // resize handlers
  increaseWidth(index: number) {
    this.charts[index].width = (this.charts[index].width || 500) + 50;
    this.saveChartsToStorage();
  }

  decreaseWidth(index: number) {
    const currentWidth = this.charts[index].width || 500;
    this.charts[index].width = Math.max(200, currentWidth - 50);
    this.saveChartsToStorage();
  }

  increaseHeight(index: number) {
    this.charts[index].height = (this.charts[index].height || 400) + 50;
    this.saveChartsToStorage();
  }

  decreaseHeight(index: number) {
    const currentHeight = this.charts[index].height || 400;
    this.charts[index].height = Math.max(200, currentHeight - 50);
    this.saveChartsToStorage();
  }
}