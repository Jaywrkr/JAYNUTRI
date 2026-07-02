# JayNutri

Planificador nutricional semanal personalizado para Jay: calcula calorías y macros
(déficit moderado para perder grasa preservando músculo), arma un plan de comidas
de batch cooking con ingredientes disponibles en Cuenca, Ecuador, y genera la lista
de compras de la semana.

## Funcionalidades

- **Calculadora de perfil**: BMR/TDEE y objetivo de macros según peso, altura,
  edad y días de entrenamiento (kettlebell, Muay Thai, yoga).
- **Plan semanal**: desayuno en casa (con proteína en polvo), almuerzo entre
  semana en casa de mamá, cenas de batch cooking, y porciones extra los martes
  y viernes cuando come con Luca. Sin melón, sin azúcar, sin procesados.
- **"Comí en casa de mi mamá"**: registro rápido (liviano/normal/abundante) que
  reajusta automáticamente las calorías y macros restantes del día.
- **Progreso semanal**: barras animadas de calorías y macros vs. el objetivo.
- **Carrito inteligente**: lista de compras agrupada por sección del
  supermercado con estimación de costo total para la compra única del domingo.
- **Recordatorio dominical**: resumen del plan de la semana entrante + lista de
  compras, con opción de notificación del navegador.

Todo el estado (perfil, comidas marcadas, registro de mamá, presupuesto) se
guarda localmente en el navegador (`localStorage`) — no hay backend.

## Correr localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS. Listo para desplegar en
Vercel conectando el repositorio directamente.
