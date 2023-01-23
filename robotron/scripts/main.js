const parts_stats = {
  "bracos": {
      "forca": 29,
      "poder": 35,
      "energia": -21,
      "velocidade": -5
  },
  "blindagem": {
      "forca": 41,
      "poder": 20,
      "energia": 0,
      "velocidade": -20
  },
  "nucleos":{
      "forca": 0,
      "poder": 7,
      "energia": 48,
      "velocidade": -24
  },
  "pernas":{
      "forca": 27,
      "poder": 21,
      "energia": -32,
      "velocidade": 42
  },
  "foguetes":{
      "forca": 0,
      "poder": 28,
      "energia": 0,
      "velocidade": -2
  }
}

document.querySelectorAll(".estatistica-numero").forEach((element) => {
  element.innerHTML = 0
});
document.querySelectorAll(".controle-contador").forEach((element) => {
  element.value = 0
});

const parts = document.querySelectorAll(".controle-contador");
const controls = document.querySelectorAll(".controle-ajuste");
const stats = document.querySelectorAll(".estatistica-numero");

for (let i=0; i<controls.length; i++) {
  const control = controls[i];
  const partId = Math.floor(i/2);
  let part = parts[partId];
  let part_stats = Object.values(parts_stats)[partId];
  if (i%2 === 0) {
    control.addEventListener("click", (e) => {
      if (parseInt(part.value) > 0){
        part.value = parseInt(part.value) - 1;
        for(let i=0; i<stats.length; i++){
          let stat = stats[i];
          stat.innerHTML = parseInt(stat.innerHTML) - Object.values(part_stats)[i];
        }
      }
      else{
        part.value = 0;
      }
    });
  }
  else{
    control.addEventListener("click", (e) => {
      part.value = parseInt(part.value) + 1;
      for(let i=0; i<stats.length; i++){
        let stat = stats[i];
        stat.innerHTML = parseInt(stat.innerHTML) + Object.values(part_stats)[i];
      }
    });
  }
}

document.querySelector("#producao").addEventListener("click", (e) => {
  stats.forEach((stat)=>{
    if (parseInt(stat.innerHTML) <= 0){
      alert("ERRO: Alguma estatística do robo é nula ou negativa.\tAumente a quantidade de peças para produzir o robô\n\nProdução reiniciada");
      return;
    };
  })	
});