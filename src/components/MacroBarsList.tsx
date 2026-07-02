"use client";

import { Macros } from "@/lib/types";
import MacroBar from "./MacroBar";

type Props = {
  consumed: Macros;
  target: Macros;
  periodLabel: string;
};

export default function MacroBarsList({ consumed, target, periodLabel }: Props) {
  return (
    <>
      <MacroBar
        label="Calorías"
        current={consumed.kcal}
        target={target.kcal}
        unit="kcal"
        color="kcal"
        tip={`Suma de las calorías de todas las comidas que marcaste como comidas ${periodLabel}, comparada contra tu objetivo.`}
      />
      <MacroBar
        label="Proteína"
        current={consumed.protein}
        target={target.protein}
        unit="g"
        color="protein"
        tip={`Gramos de proteína acumulados ${periodLabel}. Mantenerla alta es lo que más ayuda a preservar músculo mientras estás en déficit.`}
      />
      <MacroBar
        label="Carbohidratos"
        current={consumed.carbs}
        target={target.carbs}
        unit="g"
        color="carbs"
        tip="Combustible principal para tus entrenamientos de alta intensidad (kettlebell, Muay Thai)."
      />
      <MacroBar
        label="Grasas"
        current={consumed.fat}
        target={target.fat}
        unit="g"
        color="fat"
        tip="Grasas saludables necesarias para la producción hormonal — no conviene bajarlas demasiado."
      />
    </>
  );
}
