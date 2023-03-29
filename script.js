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
  return num.toLocaleString("id-ID")
}

function getAverageFromList(array, category) {
  return new Promise((resolve) => {
    resolve(array.reduce((a, b) => a + b[category], 0) / array.length)
  })
}

function alertSuccess() {
  Swal.fire({
    icon: "success",
    title: "Berhasil Menambahkan ke List"
    }
  )
}

const listPendaftar = []

submitButton.addEventListener("click", async function(event) {
  event.preventDefault()
  const form = document.querySelector(".needs-validation")
  
  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
    form.classList.add("was-validated")
  } else {
    form.classList.remove("was-validated")
    listPendaftar.push(new Pendaftar(inputNama.value, parseInt(inputUmur.value), parseInt(inputSangu.value)))
    resetAllInput()

    const averageUmur = await getAverageFromList(listPendaftar, "umur")
    const averageUangSangu = await getAverageFromList(listPendaftar, "uangSangu")

    const element = `
    ${listPendaftar.map((pendaftar, index) => `
      <tr>
        <th scope="row">${index + 1}</td>
        <td>${pendaftar.nama}</td>
        <td>${pendaftar.umur}</td>
        <td>Rp${thousandSeparator(pendaftar.uangSangu)}</td>
      </tr>`
      ).join("")}
      
    <tr>
      <td colspan="4">Rata rata pendaftar memiliki uang sangu sebesar Rp${thousandSeparator(averageUangSangu)} dengan rata rata umur ${thousandSeparator(averageUmur)} tahun</td>
    </tr>
    `
    tbody.innerHTML = element

    alertSuccess()
  }
  
})
