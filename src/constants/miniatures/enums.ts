export const BRANDS = ['HOTWHEELS', 'MAISTO'] as const

export const CONDITIONS = {
  EXCELLENT: 'Excelente',
  GOOD: 'Muito bom',
  FAIR: 'Bom',
  POOR: 'Ruim',
} as const

export const CONDITIONS_KEYS = Object.keys(CONDITIONS) as [
  keyof typeof CONDITIONS,
  ...Array<keyof typeof CONDITIONS>,
]

export const CONDITIONS_OPTIONS = Object.entries(CONDITIONS).map(
  ([key, label]) => ({
    value: key as keyof typeof CONDITIONS,
    label,
  }),
)
