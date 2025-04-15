import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER, MatDatepickerModule, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { MtxProgressModule } from '@ng-matero/extensions/progress';
import { init } from 'echarts/core';
import { Subscription } from 'rxjs';

import { AppSettings, SettingsService } from '@core';
import { BreadcrumbComponent } from '@shared';
import { DashboardService } from './dashboard.service';


import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
// import echarts core
import { LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, MarkAreaComponent, MarkLineComponent, ToolboxComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { EChartsCoreOption } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([ToolboxComponent, LegendComponent, TooltipComponent, GridComponent, CanvasRenderer, LineChart, MarkLineComponent, MarkAreaComponent]);
const data: DataItem[] = [
  { fecha: '26/09/24', S01: 180000, S02: 170000, S03: 160000, S04: 150000, S05: 140000 },
  { fecha: '27/09/24', S01: 179500, S02: 169800, S03: 159900, S04: 149900, S05: 139800 },
  { fecha: '28/09/24', S01: 179000, S02: 169600, S03: 159800, S04: 149800, S05: 139600 },
  { fecha: '29/09/24', S01: 178500, S02: 169400, S03: 159700, S04: 149700, S05: 139400 },
  { fecha: '30/09/24', S01: 178000, S02: 169200, S03: 159600, S04: 149600, S05: 139200 },
  { fecha: '01/10/24', S01: 177500, S02: 169000, S03: 159500, S04: 149500, S05: 139000 },
  { fecha: '02/10/24', S01: 177000, S02: 168800, S03: 159400, S04: 149400, S05: 138800 },
  { fecha: '03/10/24', S01: 176500, S02: 168600, S03: 159300, S04: 149300, S05: 138600 },
  { fecha: '04/10/24', S01: 176000, S02: 168400, S03: 159200, S04: 149200, S05: 138400 },
  { fecha: '05/10/24', S01: 175500, S02: 168200, S03: 159100, S04: 149100, S05: 138200 },
  { fecha: '06/10/24', S01: 175000, S02: 168000, S03: 159000, S04: 149000, S05: 138000 },
  { fecha: '07/10/24', S01: 174500, S02: 167800, S03: 158900, S04: 148900, S05: 137800 },
  { fecha: '08/10/24', S01: 174000, S02: 167600, S03: 158800, S04: 148800, S05: 137600 },
  { fecha: '09/10/24', S01: 173500, S02: 167400, S03: 158700, S04: 148700, S05: 137400 },
  { fecha: '10/10/24', S01: 173000, S02: 167200, S03: 158600, S04: 148600, S05: 137200 },
  { fecha: '11/10/24', S01: 172500, S02: 167000, S03: 158500, S04: 148500, S05: 137000 },
  { fecha: '12/10/24', S01: 172000, S02: 166800, S03: 158400, S04: 148400, S05: 136800 },
  { fecha: '13/10/24', S01: 171500, S02: 166600, S03: 158300, S04: 148300, S05: 136600 },
  { fecha: '14/10/24', S01: 171000, S02: 166400, S03: 158200, S04: 148200, S05: 136400 },
  { fecha: '15/10/24', S01: 170500, S02: 166200, S03: 158100, S04: 148100, S05: 136200 },
];
const fechas = data.map((item) => item.fecha); // Extraer fechas
const seriesNames = Object.keys(data[0]).filter((key) => key !== 'fecha'); // Extraer nombres de series (e.g., S01, S02, ...)
type DataItem = {
  fecha: string;
  [key: string]: number | string; // Permite acceder a las claves dinámicas como `S01`, `S02`, etc.
};
// Crear series para el gráfico
const series = seriesNames.map((name) => ({
  name,
  type: 'line',
  data: data.map((item) => item[name]),
  ...(name === 'S05' && {
    markLine: {
      data: [
        { yAxis: 160000, name: 'Umbral Superior' },
        { yAxis: 140000, name: 'Umbral Inferior' },
      ],
      lineStyle: {
        type: 'dashed',
        color: 'green',
        width: 2,
      },
      label: {
        formatter: '{b}',
        position: 'end',
      },
    },
    markArea: {
      data: [
        [
          { yAxis: 160000 },
          { yAxis: 140000 },
        ],
      ],
      itemStyle: {
        color: 'rgba(0, 255, 0, 0.1)', // Color semitransparente para el área
      },
    },
  }),
}));
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardService,
    provideEchartsCore({ echarts }),
    MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER, // Asegura la correcta estrategia de scroll
    {
      provide: MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
      useValue: {
        hasBackdrop: true,
        positionStrategy: 'below', // Posiciona siempre debajo
      }
    }
  ],
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatTabsModule,
    MtxProgressModule,
    BreadcrumbComponent,
    MatProgressBarModule,
    MatButtonToggleModule,
    NgxEchartsDirective,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly settings = inject(SettingsService);
  private readonly dashboardSrv = inject(DashboardService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.dashboardSrv.getData();

  messages = this.dashboardSrv.getMessages();

  charts = this.dashboardSrv.getCharts();
  chart1?: ApexCharts;
  chart2?: ApexCharts;
  selectedRange: string = 'default';
  @ViewChild('picker') datePicker!: MatDateRangePicker<any>;

  stats = this.dashboardSrv.getStats();

  notifySubscription = Subscription.EMPTY;
  echartsInstance!: any;
  isLoading = false;

  chartOption: EChartsCoreOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: seriesNames
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: fechas
    },
    yAxis: {
      type: 'value'
    },
    series: series
  };

  range: FormGroup = this.fb.group({
    start: [null], // Fecha de inicio
    end: [null]
  });
  events = signal<string[]>([]);

  ngOnInit() {
    this.notifySubscription = this.settings.notify.subscribe(opts => {
      this.updateCharts(opts);
    });
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => this.initCharts());
  }

  ngOnDestroy() {
    // this.chart1?.destroy();
    // this.chart2?.destroy();

    //this.notifySubscription.unsubscribe();
  }

  initCharts() {
    // this.chart1 = new ApexCharts(document.querySelector('#chart1'), this.charts[0]);
    // this.chart1?.render();
    // this.chart2 = new ApexCharts(document.querySelector('#chart2'), this.charts[1]);
    // this.chart2?.render();
    this.onChartInit(this.echartsInstance);
    //this.updateCharts(this.settings.options);
  }

  updateCharts(opts: Partial<AppSettings>) {
    // const theme = opts.theme === 'dark' ? 'dark' : null;
    // Actualiza el tema dinámicamente en ECharts
    //const theme = opts.theme === 'dark' ? 'dark' : null; // 'dark' para modo oscuro, null para tema claro

    if (this.echartsInstance) {
      this.echartsInstance.dispose();
      this.echartsInstance = init(document.querySelector('.demo-chart') as HTMLElement, opts.theme);
      this.echartsInstance.setOption({
        ...this.chartOption,

      });
      this.echartsInstance.resize();
    }

  }
  onChartInit(ec: any) {
    this.echartsInstance = ec;
    // this.updateChartTheme('dark');
  }
  updateChartTheme(theme: 'dark' | 'light') {
    const backgroundColor = theme === 'dark' ? '#333' : '#fff';

    this.echartsInstance.setOption({
      backgroundColor,
    });
  }

  resizeChart() {
    if (this.echartsInstance) {
      this.echartsInstance.resize();
    }
  }

  onTimeRangeChange(event: any): void {
    console.log(this.chartOption);
    const range = event.value;
    this.selectedRange = range;
    if (range === 'CUSTOM') {
      this.openDatePicker();
    } else {
      this.loadChartData(range);
    }
  }

  loadChartData(range: string): void {
    this.isLoading = true;
    this.echartsInstance.showLoading('default', { text: 'Cargando...' });
    setTimeout(() => {
      this.echartsInstance.hideLoading();
      this.isLoading = false;
      this.cdr.detectChanges();
    }
      , 2000);
  }

  openDatePicker(): void {
    if (this.datePicker) {
      this.datePicker.open();
    }
  }
  onDateRangeSelected(event: any): void {
    if (event.value) {
      this.loadChartData('CUSTOM');
    }
  }
}
