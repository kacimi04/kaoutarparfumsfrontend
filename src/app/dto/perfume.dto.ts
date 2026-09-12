export interface StoreAvailabilityResponseDto {
  storeId?: string;
  storeName?: string;
  countryCode?: string;
  country?: string;
  currency?: string;
  localPrice?: number;
}

export interface PerfumeResponseDto {
  id?: string;
  reference?: string;
  brand?: string;
  basePrice?: number;
  baseCurrency?: string;
  stores?: StoreAvailabilityResponseDto[];
}
