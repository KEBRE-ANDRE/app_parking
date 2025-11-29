import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartDataset } from 'chart.js';
import { Subscription } from 'rxjs';
import { HistoriqueService } from '../../core/services/historique.service';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonSegment,
  IonSegmentButton
} from '@ionic/angular/standalone';

import { registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonSegment,
    IonSegmentButton
  ]
})
export class HistoriquePage implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart<'bar', number[], string>;

  public view: 'jour' | 'mois' | 'annee' = 'jour';
  public recentList: any[] = [];
  private sub = new Subscription();

  constructor(
    private historiqueSrv: HistoriqueService,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.loadRecent();
  }

  ngAfterViewInit(): void {
    // Create empty chart once canvas is available
    this.initChart();
    this.updateChart();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.chart?.destroy();
  }

  goHome(): void {
    this.navCtrl.navigateBack('/home');
  }

  loadRecent(): void {
    const s = this.historiqueSrv.getAll().subscribe(list => {
      this.recentList = list || [];
    });
    this.sub.add(s);
  }

  switchView(v: 'jour' | 'mois' | 'annee'): void {
    this.view = v;
    this.updateChart();
  }

  private initChart(): void {
    const config: ChartConfiguration<'bar', number[], string> = {
      type: 'bar',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top' },
          tooltip: { enabled: true }
        }
      }
    };
    this.chart = new Chart(this.chartCanvas.nativeElement, config);
  }

  private updateChart(): void {
    let source$;
    if (this.view === 'jour') source$ = this.historiqueSrv.getByDay();
    else if (this.view === 'mois') source$ = this.historiqueSrv.getByMonth();
    else source$ = this.historiqueSrv.getByYear();

    const s = source$.subscribe((map: any) => {
      const pairs = Object.entries(map || {}).sort((a: any, b: any) => b[0].localeCompare(a[0]));
      const labels = pairs.map(p => String(p[0]));
      const values: number[] = pairs.map(p => {
        const v = p[1];
        return (typeof v === 'number') ? v : (Array.isArray(v) && typeof v[0] === 'number' ? v[0] : Number(v) || 0);
      });

      const datasets: ChartDataset<'bar', number[]>[] = [
        { label: this.getDatasetLabel(), data: values, backgroundColor: '#0abf53' }
      ];

      if (!this.chart) {
        this.initChart();
      }

      // apply data & options safely
      if (this.chart) {
        this.chart.data.labels = labels;
        this.chart.data.datasets = datasets;
        // set options (provide fallback)
        const opts = (this.chart.options as any) ?? {};
        this.chart.options = opts;
        this.chart.update();
      }
    });

    this.sub.add(s);
  }

  private getDatasetLabel(): string {
    if (this.view === 'jour') return 'Inscriptions par jour';
    if (this.view === 'mois') return 'Inscriptions par mois';
    return 'Inscriptions par année';
  }

  public formatDateReadable(iso: string): string {
    try { return new Date(iso).toLocaleString(); } catch { return iso; }
  }
}
