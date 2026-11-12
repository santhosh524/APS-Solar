import { solarConfig as c } from "./config";
export function subsidy(k: number) {
  return Math.min(k, 2) * 30000 + Math.min(Math.max(k - 2, 0), 1) * 18000;
}
export function estimate(bill: number, tariff: number) {
  const units = bill / Math.max(tariff, 0.01);
  const kw = Math.min(
    Math.max(Math.ceil(units / c.yieldPerKW / 0.6) * 0.6, 0.6),
    10,
  );
  const panels = Math.ceil((kw * 1000) / c.panelWattage);
  const generation = kw * c.yieldPerKW;
  const cost = kw * c.costPerKW;
  const self = Math.min(generation * c.selfUse, units);
  const exportUnits = Math.max(generation - self, 0);
  const monthly = self * tariff + exportUnits * c.exportTariff;
  const annual = monthly * 12;
  let savings25 = 0;
  for (let y = 0; y < 25; y++)
    savings25 += annual * Math.pow(1 - c.degradation, y);
  const sub = subsidy(kw);
  return {
    units,
    kw,
    panels,
    generation,
    cost,
    sub,
    net: Math.max(cost - sub, 0),
    monthly,
    annual,
    payback: annual ? Math.max(cost - sub, 0) / annual : null,
    net25: savings25 - 25 * c.maintenancePerYear - Math.max(cost - sub, 0),
  };
}
