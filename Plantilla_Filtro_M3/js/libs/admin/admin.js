import { URL_COMPANIES, URL_JOBS } from '../modules/urls.js'
import { addRegister ,deleteRegister , updateRegister } from '../modules/endpoints.js'

const d = document,
    formAdd = d.getElementById("formAdd"),
    titleJob = d.getElementById("titleJob"),
    experience = d.getElementById("experience"),
    salary = d.getElementById("salary"),
    location = d.getElementById("Location"),
    modality = d.getElementById("modality"),
    description = d.getElementById("description"),
    modif = d.getElementById("modif"),
logOut = document.getElementById("logOut");


document.addEventListener("click", async (event)=> {
  
  if (event.target.classList.contains("btn-delete")) { deleteRegister(`http://${URL_JOBS}`,event.target.getAttribute("data-id")) }

  if (event.target.classList.contains("btn-update")) {
    console.log("diste click");

    const id = event.target.getAttribute("data-id")

    const res = await fetch(`http://${URL_JOBS}`)
    const data = await res.json()


    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        console.log(data[i]);
        titleJob.value = data[i].title
        experience.value = data[i].experience
        salary.value = data[i].salary
        location.value = data[i].location
        modality.value = data[i].modality
        description.value = data[i].description

        modif.addEventListener("click", (e) => {
          e.preventDefault()

          const data = {
            title: titleJob.value,
            experience: experience.value,
            salary: salary.value,
            location: location.value,
            modality: modality.value,
            description: description.value,
            companyId: localStorage.getItem("id")
          }

          updateRegister(`http://${URL_JOBS}`, id, data)
        })

      }
    }

  }

})

const getAll = async () => {
  try {
      const userId = localStorage.getItem("id");

      const [jobsResponse, userResponse] = await Promise.all([
          fetch(`http://${URL_JOBS}`),
          fetch(`http://${URL_COMPANIES}`)
      ]);
      const jobsData = await jobsResponse.json();
      const userData = await userResponse.json();
      const currentUser = userData.find(user => user.id === userId);

      if (!currentUser) {
          console.error("No se encontró el usuario actual");
          return;
      }

      const tbody = document.getElementById("tbody");
      tbody.innerHTML = '';

      jobsData.forEach(job => {
          if (job.companyId === userId) {
              tbody.innerHTML += `
                  <tr>
                      <td>
                          <div class="d-middle">
                              <img
                                  src="${currentUser.imageCompany}"
                                  alt="logo de la empresa"
                                  width="60"
                                  height="60"
                                  class="img-fluid rounded-circle img-company"
                              />
                          </div>
                      </td>
                      <td>${currentUser.nameCompany}</td>
                      <td>${job.title}</td>
                      <td>${job.location}</td>
                      <td>${job.experience}</td>
                      <td>${job.modality}</td>
                      <td>$${job.salary}</td>
                      <td>
                          <button data-id="${job.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-primary btn-update">
                              <i class="bx bx-edit"></i>
                          </button>

                          <button data-id="${job.id}" class="btn btn-danger btn-delete">
                              <i class="bx bx-trash"></i>
                          </button>
                      </td>
                  </tr>`;
          }
      });
  } catch (error) {
      console.error("Ocurrió un error al obtener los datos:", error);
  }
};


logOut.addEventListener("click", ()=> {localStorage.removeItem("id")})

formAdd.addEventListener("submit", (e) => {
    e.preventDefault()

    const newJob = {
        title: titleJob.value,
        experience: experience.value,
        salary: salary.value,
        location: location.value,
        modality: modality.value,
        description: description.value,
        publicationDate: new Date().toLocaleString(),
        companyId: localStorage.getItem("id")
    }

    addRegister(`http://${URL_JOBS}`,newJob)
})

getAll()
