---
title: 'Encontrar buenas ideas - De las necesidades de los usuarios a quienes estan dispuestos a pagar'
description: 'Aprende a descubrir oportunidades a partir de dolores cotidianos, evaluar si alguien pagara y convertir una idea en un concepto de producto ejecutable.'
---

<script setup>
const duration = 'Aprox. <strong>3 horas</strong>'
</script>

# Principiante 2: Encontrar buenas ideas

## Introduccion del capitulo

<ChapterIntroduction :duration="duration" :tags="['Descubrimiento de necesidades', 'Pensamiento de producto', 'Analisis de usuarios', 'Modelo de negocio']" coreOutput="3 conceptos de producto validados" expectedOutput="Una direccion de emprendimiento/producto ejecutable">

Ya aprendiste a construir con un AI IDE, pero la pregunta mas importante es: <strong>que construir?</strong>

Mucha gente empieza con "hagamos una herramienta de IA" o "montemos una plataforma social" y termina con algo que nadie usa. El motivo mas comun es simple: <strong>no habia una necesidad real</strong>.

Incluso si el producto resuelve algo, todavia queda la parte dificil: <strong>que el usuario pague</strong>.

En este capitulo, a traves de un caso y un conjunto de marcos practicos, aprenderas un metodo para encontrar ideas y convertirlas en conceptos validables.

</ChapterIntroduction>

<div style="margin: 50px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Step 1', description: 'Definir criterios' },
      { title: 'Step 2', description: 'Encontrar dolores cotidianos' },
      { title: 'Step 3', description: 'Segmentar audiencias' },
      { title: 'Step 4', description: 'Profundizar escenarios' },
      { title: 'Step 5', description: 'Validar si es real' },
      { title: 'Step 6', description: 'Pulir el concepto' }
    ]" />
  </ClientOnly>
</div>

## Step 1: Definir criterios (cuando paga la gente?)

Un error tipico es evaluar ideas por "me gusta" o "suena bien". Lo que buscamos es <strong>voluntad de pago</strong>.

Usa este checklist:

1. Dolor fuerte: frecuente, caro, riesgoso o estresante.
2. Usuario claro: puedes describir quien es en una frase.
3. Escenario concreto: cuando y donde ocurre el problema.
4. Alternativas malas: hoy se resuelve con friccion o con soluciones incompletas.
5. Beneficio medible: ahorra tiempo/dinero, reduce riesgo o aumenta ingresos.

::: warning Importante
No preguntes "Usarias esto?" Esa pregunta produce falsos positivos.
Pregunta por comportamiento real: "Como lo resuelves hoy?", "Cuantas veces te paso esta semana?", "Cuanto te costo en tiempo o dinero?"
:::

## Step 2: Encontrar dolores cotidianos

Las mejores ideas vienen de problemas repetidos.

Fuentes practicas:

- Tu trabajo: reportes, coordinacion, aprobaciones, QA, despliegues.
- Tu vida: salud, finanzas, estudio, viajes, familia.
- Nichos: industria con regulacion, facturacion, soporte, operaciones.

Ejercicio rapido:

1. Escribe 20 molestias reales que hayas visto en el ultimo mes.
2. Elige 5 que ocurran semanalmente.
3. Para cada una, anota quien lo sufre y que alternativa usa hoy.

## Step 3: Segmentar audiencias (horizontal)

Un mismo problema tiene distinta voluntad de pago segun la persona.

Ejemplo: "organizar archivos" no paga casi nadie; pero "organizar documentos para auditoria" lo paga una empresa.

Hazlo asi:

1. Lista 3-5 grupos posibles de usuarios.
2. Para cada grupo, define: objetivo, contexto, restricciones, presupuesto.
3. Elige 1 grupo donde el dolor sea mas caro o mas urgente.

## Step 4: Profundizar escenarios (vertical)

No disenes "una app". Disena <strong>un flujo</strong> que resuelva un escenario completo.

Plantilla:

- Disparador: que pasa para que el usuario necesite la solucion?
- Pasos actuales: que hace hoy (y que le molesta)?
- Momento de valor: en que minuto entiende que le ahorraste algo?
- Resultado: que cambia al final?

## Step 5: Validar si es real (antes de construir)

Objetivo: validar 2 cosas.

1. Existe el problema (frecuencia e impacto).
2. Existe voluntad de pago o al menos una accion fuerte (dejar email, reservar, prepagar).

Metodos de bajo costo:

- 10 entrevistas con usuarios objetivo (30 min cada una).
- Landing simple con propuesta de valor y CTA (lista de espera / reserva).
- Demo clickable o prototipo y medir conversion.
- Pre-venta o deposito (la validacion mas honesta).

## Step 6: Pulir el concepto con IA

Aqui la IA ayuda a convertir una intuicion en un concepto ejecutable.

Prompt para copiar:

```text
Actua como consultor de producto. Quiero refinar una idea.
1) Usuario objetivo:
2) Dolor principal:
3) Escenario concreto (cuando/donde):
4) Solucion actual y por que es mala:
5) Propuesta de valor en una frase:
6) MVP en 7 dias:
7) Riesgos/objeciones:
8) Plan de validacion y metricas:
Devuelveme: (a) concepto pulido, (b) alcance del MVP, (c) plan de validacion en 7 dias.
```

## Salida esperada: 3 conceptos de producto

Al final, deberias tener 3 conceptos, cada uno con:

- Usuario objetivo claro
- Problema concreto
- Propuesta de valor en una frase
- MVP (1-2 semanas)
- Experimento de validacion y metricas

<RelatedArticlesSection />

