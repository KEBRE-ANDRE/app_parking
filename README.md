:root {
  --chart-height: 320px;
}

.controls-row {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

/* wrapper qui force une hauteur afin que le chart soit correctement dessiné */
.chart-wrapper {
  height: var(--chart-height);
  margin-bottom: 12px;
}

/* style pour la liste */
.muted {
  color: var(--ion-color-medium-contrast);
  font-size: 0.85rem;
  margin-top: 4px;
}

/* adaptivité */
@media (min-width: 768px) {
  :root {
    --chart-height: 420px;
  }
}
