function distributeElectrons(atomicNumber) {
  const sublevels = ["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p", "5s", "4d", "5p", "6s", "4f", "5d", "6p", "7s", "5f", "6d", "7p"];
  const sublevelCapacity = {
    s: 2,
    p: 6,
    d: 10,
    f: 14,
  };

  let distribution = [];
  let valenceShell = 0;
  let valenceElectrons = 0;
  let mostEnergeticSublevel = 0;
  let electronsInMostEnergeticSublevel = 0;
  let remainingElectrons = atomicNumber;

  for (let i = 0; i < sublevels.length && remainingElectrons > 0; i++) {
    const sublevel = sublevels[i];
    const n = parseInt(sublevel[0]);
    const l = sublevel[1];
    const capacity = sublevelCapacity[l];
    const electronsInSublevel = Math.min(capacity, remainingElectrons);

    distribution.push(`${sublevel}${electronsInSublevel}`);
    remainingElectrons -= electronsInSublevel;

    mostEnergeticSublevel = sublevel;
    electronsInMostEnergeticSublevel = electronsInSublevel;

    if (n > valenceShell) {
      valenceShell = n;
      valenceElectrons = electronsInSublevel;
    } else if (n === valenceShell) {
      valenceElectrons += electronsInSublevel;
    }
  }

  return {
    electronDistribution: distribution.join(" "),
    valenceShell: valenceShell,
    valenceElectrons: valenceElectrons,
    mostEnergeticSublevel: mostEnergeticSublevel,
    electronsInMostEnergeticSublevel: electronsInMostEnergeticSublevel,
  };
}

document.querySelector("#btnCalculate").addEventListener("click", () => {
  const atomicNumber = parseInt(document.getElementById("atomicNumber").value);

  if (isNaN(atomicNumber) || atomicNumber <= 0 || atomicNumber > 118) {
    alert("Insira um número válido (1 - 118)");
    return;
  }

  const result = distributeElectrons(atomicNumber);

  document.getElementById("distribution").innerHTML = result.electronDistribution;
  document.getElementById("valenceShell").innerHTML = result.valenceShell;
  document.getElementById("valenceElectrons").innerHTML = result.valenceElectrons;
  document.getElementById("mostEnergeticSublevel").innerHTML = result.mostEnergeticSublevel;
  document.getElementById("electronsInSublevel").innerHTML = result.electronsInMostEnergeticSublevel;
});
