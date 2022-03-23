'use strict';

let itp = document.getElementById('itp');
let ine = document.getElementById('ine');
let iee = document.getElementById('iee');
let inegi = document.getElementById('inegi');
let getic = document.getElementById('getic');
let ineNav = document.getElementById('ine-nav');
let ieeNav = document.getElementById('iee-nav');
let inegiNav = document.getElementById('inegi-nav');
let geticNav = document.getElementById('getic-nav');

/*----------------------------------------------------------------
                            Eventos click
------------------------------------------------------------------*/
ine.addEventListener("click", e => {     
  printJobs('ine');  
});

iee.addEventListener("click", e => {  
  printJobs('iee');  
});

inegi.addEventListener("click", e => {  
  printJobs('inegi');  
});

getic.addEventListener("click", e => {  
  printJobs('getic');
});

ineNav.addEventListener("click", e => {     
  printJobs('ine');  
});

ieeNav.addEventListener("click", e => {     
  printJobs('iee');  
});

inegiNav.addEventListener("click", e => {     
  printJobs('inegi');  
});
geticNav.addEventListener("click", e => {     
  printJobs('getic');  
});
//Usando e.target
document.addEventListener('click', e =>{
  let isNavLink = e.target.classList.contains('nav-link');

  if(isNavLink){
    let currentNavLink = e.target;
    let activeNavLink = document.querySelector('.active');
    activeNavLink.classList.remove('active');
    currentNavLink.classList.add('active');

  }
});


const printJobs = business => {
  //Primero se limpia el contenido para cuando se seleccione otra empresa, no se empalmen con los de la anterior
  clearJobs();
  // Se llama a la funcion getJobs para obtener los contenedores con cada trabajo
  getJobs(business); 

} // Fin printJobs


//Limpiar los puestos desempeñados
const clearJobs = () => {
  let jobsContainer = document.querySelector('.jobs-container');
  let businessTitle = document.querySelector('#business-title');
  jobsContainer.textContent = '';
  console.log(businessTitle);
  jobsContainer.appendChild(businessTitle);
  
}

//Obtener los puestos desempeñados
const getJobs = async (business) => {

  //Se hace la peticion por medio de promesas con el metodo get por defecto
  // const peticion = await fetch('../MiCV/documents/jobs.json'); //Produccion
  const peticion = await fetch('../documents/jobs.json'); //Desarrollo
  const resultado = await peticion.json();

  let jobsContainer = document.querySelector('.jobs-container');
  let businessTitle = document.querySelector('#business-title');      
  let fragment = document.createDocumentFragment();     
  businessTitle.textContent = resultado[business].businessName; 
     
  if(jobsContainer.firstElementChild == businessTitle){   
    for (const job in resultado[business].jobs) {
      let jobContainerRow = document.createElement('DIV');
      let jobTitleCol = document.createElement('DIV');
      let jobDescCol = document.createElement('DIV');
      let jobTitle = document.createElement('H5');
      let jobDate = document.createElement('P');
      let jobProject = document.createElement('P');
      let jobDesc = document.createElement('P');

      //jobsContainer.appendChild(businessTitle);
      

      //Asignar Atributos
      jobContainerRow.setAttribute('class', 'row job');
      jobTitleCol.setAttribute('class', 'col-lg-4');
      jobDescCol.setAttribute('class', 'col-lg-8');
      jobDate.setAttribute('class', 'job-date');
      jobDesc.setAttribute('class', 'job-functions align-middle')

      //Asignar texto      
      jobTitle.textContent = resultado[business].jobs[job].jobName;
      jobDate.textContent = `${resultado[business].jobs[job].startDate} - ${resultado[business].jobs[job].endDate}`;
      jobProject.innerHTML += `<b>Proyecto: </b>`+ `Nombre del Proyecto`;
      jobDesc.innerHTML = `<b>Funciones: </b>${resultado[business].jobs[job].functions}`;

      //Agregar Divs
      jobTitleCol.appendChild(jobTitle);
      jobTitleCol.appendChild(jobDate);
      jobDescCol.appendChild(jobProject);
      jobDescCol.appendChild(jobDesc);
      jobContainerRow.appendChild(jobTitleCol);
      jobContainerRow.appendChild(jobDescCol);
      fragment.appendChild(jobContainerRow);
    }    
  }

  jobsContainer.appendChild(fragment);

}





