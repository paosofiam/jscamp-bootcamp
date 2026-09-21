/* En este ejercicio deberás tipar las tuplas con los tipos ya creados, y usando `number` para la tupla de `SalaryRange` y `Coordinates` */

import type { Job } from './objects.ts'

// Tupla para coordenadas de ubicación
export type Coordinates = [number, number] // [latitud, longitud]

// Tupla para rango de salario
export type SalaryRange = [number, number] // [mínimo, máximo]

// Función que devuelve el rango de salarios
export function getSalaryRange(jobs: Job[]): SalaryRange {
  const salaries = jobs
    // Aquí podemos aplicar algo llamado Type guard: le dice a TS que tras el filtro salary ya no es undefined
    .filter((job): job is Job & { salary: number } => job.salary !== undefined)
    // El type guard acorta salary a number, asi evitamos el `as number` que solo fuerza al compilador
    // .map((job) => job.salary as number)
    .map((job) => job.salary)

  if (salaries.length === 0) {
    return [0, 0]
  }

  const min = Math.min(...salaries)
  const max = Math.max(...salaries)

  return [min, max]
}
