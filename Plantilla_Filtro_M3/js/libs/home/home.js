import { URL_JOBS, URL_COMPANIES } from '../modules/urls.js'

const containerCards = document.getElementById("containerCards");
const modalityFilter = document.getElementById("modalityFilter");
const search = document.getElementById("search");
const btnSearch = document.getElementById("btnSearch");

const getAll = async () => {
    const res = await fetch(`http://${URL_JOBS}`)
    const data = await res.json()
    
    data.forEach(async e => {
      const companyRes = await fetch(`http://${URL_COMPANIES}/${e.companyId}`);
      const companyData = await companyRes.json();

      const elemento = document.createRange().createContextualFragment(`
          <div class="card-job">
              <h2>${e.title}</h2>
              <p>${e.description}</p>
              <div class="row">
                  <div class="col-6">
                      <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                          <i class="bx bx-current-location"></i>
                          <span class="fw-semibold">${e.location}</span>
                      </div>
                      <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                          <i class="bx bx-time"></i>
                          <span class="fw-semibold">${e.publicationDate}</span>
                      </div>
                  </div>
                  <div class="col-6 d-flex justify-content-end">
                      <img
                          src="${companyData.imageCompany}"
                          alt="logo"
                          height="80"
                          width="80"
                          class="object-fit-contain rounded-circle img-company"
                      />
                  </div>
              </div>
          </div>
      `)

      containerCards.append(elemento)
    });

}

getAll()


btnSearch.addEventListener("click", async (e) => {
  e.preventDefault();
  const res = await fetch(`http://${URL_JOBS}`);
  const data = await res.json();
  containerCards.textContent = "";

  const searchTerm = search.value.toLowerCase(); 

  for (let i = 0; i < data.length; i++) {
      if (data[i].title.toLowerCase().includes(searchTerm)) {
          const companyRes = await fetch(`http://${URL_COMPANIES}/${data[i].companyId}`);
          const companyData = await companyRes.json();
          const elemento = document.createRange().createContextualFragment(`
              <div class="card-job">
                  <h2>${data[i].title}</h2>
                  <p>${data[i].description}</p>
                  <div class="row">
                      <div class="col-6">
                          <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                              <i class="bx bx-current-location"></i>
                              <span class="fw-semibold">${data[i].location}</span>
                          </div>
                          <div class="d-flex gap-2 align-items-center fs-5 text-muted">
                              <i class="bx bx-time"></i>
                              <span class="fw-semibold">${data[i].publicationDate}</span>
                          </div>
                      </div>
                      <div class="col-6 d-flex justify-content-end">
                          <img src="${companyData.imageCompany}" alt="logo" height="80" width="80" class="object-fit-contain rounded-circle img-company"/>
                      </div>
                  </div>
              </div>
          `);
          containerCards.append(elemento);
      }
  }
});

modalityFilter.addEventListener("change", async () => {
    const res = await fetch(`http://${URL_JOBS}`)
    const data = await res.json()
    containerCards.textContent = ""

    for (let i = 0; i < data.length; i++) {
        if (data[i].modality == modalityFilter.value) {
            const companyRes = await fetch(`http://${URL_COMPANIES}/${data[i].companyId}`);
            const companyData = await companyRes.json();
            const elemento = document.createRange().createContextualFragment(`
        <div class="card-job">
        <h2>${data[i].title}</h2>

        <p>${data[i].description}</p>

        <div class="row">
          <div class="col-6">
            <div class="d-flex gap-2 align-items-center fs-5 text-muted">
              <i class="bx bx-current-location"></i>
              <span class="fw-semibold">${data[i].location}</span>
            </div>

            <div class="d-flex gap-2 align-items-center fs-5 text-muted">
              <i class="bx bx-time"></i>
              <span class="fw-semibold">${data[i].publicationDate}</span>
            </div>
          </div>

          <div class="col-6 d-flex justify-content-end">
            <img
              src="${companyData.imageCompany}"
              alt="logo"
              height="80"
              width="80"
              class="object-fit-contain rounded-circle img-company"
            />
          </div>
        </div>
      </div>
      `)

      containerCards.append(elemento)
        }
    }
})
