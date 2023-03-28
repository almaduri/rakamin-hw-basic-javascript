const submitButton = document.querySelector("button.submit-button")
const inputNama = document.getElementById("inputNama")
const inputUmur = document.getElementById("inputUmur")
const inputSangu = document.getElementById("inputSangu")

class Pendaftar {
  constructor(nama, umur, uangSangu) {
    this.nama = nama
    this.umur = umur
    this.uangSangu = uangSangu
  }
}

submitButton.addEventListener("click", function(event) {
  event.preventDefault()
  const form = document.querySelector('.needs-validation')
  
  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
    form.classList.add("was-validated")
  } else {
    form.classList.remove("was-validated")
    
    inputNama.value = ""
    inputUmur.value = ""
    inputSangu.value = ""
  }
  
})
