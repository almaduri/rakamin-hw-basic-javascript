const submitButton = document.querySelector("button.submit-button")
const inputNama = document.getElementById("inputNama")
const inputUmur = document.getElementById("inputUmur")
const inputSangu = document.getElementById("inputSangu")
const tbody = document.querySelector("tbody.table-group-divider")

function resetAllInput() {
  inputNama.value = ""
  inputUmur.value = ""
  inputSangu.value = ""
}

class Pendaftar {
  constructor(nama, umur, uangSangu) {
    this.nama = nama
    this.umur = umur
    this.uangSangu = uangSangu
  }
}

function thousandSeparator(num) {
  return num.toLocaleString().replaceAll(",", ".")
}

const listPendaftar = []

submitButton.addEventListener("click", function(event) {
  event.preventDefault()
  const form = document.querySelector(".needs-validation")
  
  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
    form.classList.add("was-validated")
  } else {
    form.classList.remove("was-validated")
    listPendaftar.push(new Pendaftar(inputNama.value, parseInt(inputUmur.value), parseInt(inputSangu.value)))
    console.log(listPendaftar)
    resetAllInput()

    const averageUmur = listPendaftar.reduce((a, b) => a + b.umur, 0) / listPendaftar.length
    const averageUangSangu = listPendaftar.reduce((a, b) => a + b.uangSangu, 0) / listPendaftar.length
    
    const element = `
    ${listPendaftar.map((pendaftar, index) =>
      `<tr>
      <th scope="row">${index + 1}</td>
      <td>${pendaftar.nama}</td>
      <td>${pendaftar.umur}</td>
      <td>Rp${thousandSeparator(pendaftar.uangSangu)}</td>
      </tr>`
      ).join("")}
      
    <tr>
      <td colspan="4">Rata rata pendaftar memiliki uang sangu sebesar Rp${thousandSeparator(averageUangSangu)} dengan rata rata umur ${averageUmur} tahun</td>
    </tr>
    `
    tbody.innerHTML = element
  }
  
})
