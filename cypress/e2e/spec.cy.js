describe('My first Test', () => {
  it('Visitando la web de moi', () => {
    cy.visit('http://localhost:5173') // Visita http://localhost:5173
    cy.contains('super BALANCE', { matchCase: false }) // Encuentra el elemento con contenido: SUPER BALANCE
    cy.get('input[name="loginEmail"]').type('moisic.mo@gmail.com') // Escriba moisic.mo@gmail.com en la entrada
    cy.get('input[name="loginPassword"]').type('moisic1.mo@gmail.com') // Escriba moisic.mo@gmail.com en la entrada
    cy.contains('Ingresar', { matchCase: false }).as('buttonLogin') // Obtenemos el elemento y los renombramos
    cy.get('@buttonLogin').click() // Apretamos el boton: INGRESAR, haz click en eso
    cy.contains('Contraseña incorrecto', { matchCase: false })
    //cy.url().should('include', '/dashboardView') // Obtener la URL, Afirma que incluye /dashboardView

    // DADA la url de la web http://localhost:5173
    // CUANDO encuentres el elemento SUPER BALANCE
    // ENTONCES escribeme fake@gmail.com en la entrada con id "action-email"
    // ENTONCES la URL debe incluir /dashboardView
      //const { email, password } = this.currentUser
      //cy.login(email, password)
  })
})
