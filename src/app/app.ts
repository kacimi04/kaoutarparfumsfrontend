import { Component, inject, signal } from '@angular/core';
import { PerfumeApiService } from './services/perfume-api.service';
import { PerfumeResponseDto } from './dto/perfume.dto';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly perfumeApi = inject(PerfumeApiService);

  protected readonly countryCode = signal('');
  protected readonly perfumes = signal<PerfumeResponseDto[]>([]);
  protected readonly selectedPerfume = signal<PerfumeResponseDto | null>(null);
  protected readonly listLoading = signal(false);
  protected readonly detailLoading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected onCountryCodeChange(value: string): void {
    this.countryCode.set(value.trim().toUpperCase());
  }

  protected loadPerfumes(): void {
    this.listLoading.set(true);
    this.errorMessage.set(null);

    this.perfumeApi.getAll(this.countryCode()).subscribe({
      next: (data) => {
        this.perfumes.set(data);
        this.listLoading.set(false);

        if (data.length === 0) {
          this.selectedPerfume.set(null);
        }
      },
      error: () => {
        this.errorMessage.set('Impossible de charger la liste des parfums.');
        this.listLoading.set(false);
      },
    });
  }

  protected selectPerfume(id: string): void {
    this.detailLoading.set(true);
    this.errorMessage.set(null);

    this.perfumeApi.getById(id, this.countryCode()).subscribe({
      next: (data) => {
        this.selectedPerfume.set(data);
        this.detailLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger le detail du parfum.');
        this.detailLoading.set(false);
      },
    });
  }
}
